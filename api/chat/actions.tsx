'use server';

import {CoreMessage} from 'ai'
import {generateText} from 'ai';
import {openai} from '@ai-sdk/openai';
import {streamText} from 'ai';
import {formatNumber, nanoid, runAsyncFnWithoutBlocking, sleep} from '@/core/utils'
import {createAI, createStreamableUI, createStreamableValue, getAIState, getMutableAIState, streamUI} from 'ai/rsc';
import {BotMessage} from '@/app/(chat)/component/message';

/**
 * @desc simple function to check for model, for test only
 * @param question 
 * @returns answer
 */
export async function getAnswer(question: string) {

	const { text, finishReason, usage } = await generateText({
		model: openai('gpt-3.5-turbo'),
		prompt: question,
	});

	return { text, finishReason, usage };
}


// Message object
export type Message = CoreMessage & {
	id: string
}

export type AIState = {
	chatId: string,
	messages: Message[]
}

export type UIState = {
	id: string,
	display: React.ReactNode
}[]


/**
 * @desc submit input string question of user and return stream response to UI
 * @param input 
 */
export async function continueConversation(input: string) {
	'use server';
	
	const SYSTEM_PROMPT = ''; // update system prompt for context if needed
	const MODEL = 'gpt-3.5-turbo'; // model name

	// current state
	const aiState = getMutableAIState<typeof AI>();
  
	aiState.update({
		...aiState.get(),
		messages: [
			...aiState.get().messages,
			{
				id: nanoid(),
				role: 'user',
				content: input
			}
		]
	})

	let textStream: undefined | ReturnType<typeof createStreamableValue<string>>;
	let textNode: undefined | React.ReactNode;

	const result = await streamUI({
		model: openai(MODEL),
		messages: [...aiState.get().messages.map((message: any) => ({
			role: message.role,
			content: message.content,
			name: message.name
		}))],
		system: `${SYSTEM_PROMPT}`,
		text: ({ content, done, delta }) => {
			if (!textStream) {
				textStream = createStreamableValue('');
				textNode = <BotMessage content={textStream.value}/>
			}
			
			if (done) {
				textStream.done();
				aiState.done({
					...aiState.get(),
					messages: [
						...aiState.get().messages,
						{
							id: nanoid(),
							role: 'assistant',
							content
						}
					]
				})
			} else {
				textStream.update(delta);
			}
			
			return textNode;
		}
	});

	return {
		id: nanoid(),
		display: result.value
	}
}

// AI context for sync state between backend and frontend, built-in of AI sdk
export const AI = createAI<AIState, UIState>({
	actions: {
		continueConversation,
	},
	initialUIState: [],
	initialAIState: {chatId: nanoid(), messages: []},
	onGetUIState: async () => {
		'use server';

		// based-on chat id or  user session to return init UI state
		return [];
	}
});