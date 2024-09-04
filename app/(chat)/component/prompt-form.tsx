'use client'

import React, { useRef } from 'react';
import Textarea from 'react-textarea-autosize'
import { useState } from 'react';
import {useActions, useUIState} from 'ai/rsc'
import {UserMessage} from './message'
import {Button} from '@/components/button'
import {IconArrowElbow, IconPlus} from '@/components/icons'
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/tooltip'
// import {useEnterSubmit} from '@/lib/hooks/use-enter-submit'
import {nanoid} from 'nanoid'
import {useRouter} from 'next/navigation'
import { getAnswer, continueConversation } from '@/api/chat/actions';
import {type AI} from '@/api/chat/actions'
import { readStreamableValue } from 'ai/rsc';

export function PromptForm({input,setInput}: {
	input: string
	setInput: (value: string) => void
}) {

	const [generation, setGeneration] = useState('');
	const router = useRouter();
	// const {formRef, onKeyDown} = handleSubmitMessage();

	const inputRef = React.useRef<HTMLTextAreaElement>(null);
	const {continueConversation} = useActions();
	const [_, setMessages] = useUIState<typeof AI>();
	
	React.useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}, [])


	const handleSubmitMessage = async (event) => {
		event.preventDefault();

		const value = input.trim();
		setInput('')
		if (!value) {
			return;
		}

		// add message of user
		setMessages(currentMessages => [
			...currentMessages,
			{
				id: nanoid(),
				display: <UserMessage>{value}</UserMessage>
			}
		]);
		

		// call api to open-ai gpt chat to get response, update UI state based-on response
		const responseMessage = await continueConversation(value);
		setMessages(currentMessages => [...currentMessages, responseMessage])
    }	
	
	return <>
		<div>{generation}</div>
		<form
			// ref={formRef}
			onSubmit={(event) => handleSubmitMessage(event)}
		>
			<div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="outline"
							size="icon"
							className="absolute left-0 top-[14px] size-8 rounded-full bg-background p-0 sm:left-4"
							onClick={(event) => {handleSubmitMessage(event)}}
						>
							<IconPlus/>
							<span className="sr-only">New Chat</span>
						</Button>
					</TooltipTrigger>
					<TooltipContent>New Chat</TooltipContent>
				</Tooltip>
				<Textarea
					ref={inputRef}
					tabIndex={0}
					// onKeyDown={onKeyDown}
					placeholder="Enter prompt"
					className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
					autoFocus
					spellCheck={false}
					autoComplete="off"
					autoCorrect="off"
					name="message"
					rows={1}
					value={input}
					onChange={e => setInput(e.target.value)}
				/>
				<div className="absolute right-0 top-[13px] sm:right-4">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button type="submit" size="icon" disabled={input === ''}>
								<IconArrowElbow/>
								<span className="sr-only">Send message</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent>Send message</TooltipContent>
					</Tooltip>
				</div>
			</div>
		</form>
	</>
}
