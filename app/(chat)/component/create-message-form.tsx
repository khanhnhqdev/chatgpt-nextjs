'use client'

import React, { useEffect, useRef } from 'react';
import Textarea from 'react-textarea-autosize'
import { useState } from 'react';
import {useActions, useUIState} from 'ai/rsc'
import {UserMessage} from './message'
import {Button} from '@/components/button'
import {IconMessage, IconPlus, IconAttachment, IconArrowUp} from '@/components/icons'
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/tooltip'
import {nanoid} from 'nanoid'
import {type AI} from '@/api/chat/actions'

export function CreateMessageForm({input, setInput, scrollToBottom}: {
	input: string
	setInput: (value: string) => void
	scrollToBottom: () => void
}) {

	const formRef = useRef(null);
	const inputRef = React.useRef<HTMLTextAreaElement>(null);
	const {continueConversation} = useActions();
	const [messages, setMessages] = useUIState<typeof AI>();

	React.useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}, [])


	// handle submit-message
	const handleSubmitMessage = async (event) => {
		event.preventDefault();

		const value = input.trim();
		setInput('');
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
		setMessages(currentMessages => [...currentMessages, responseMessage]);
    }	
	

	useEffect(() => {
		// scroll to bottom after render message
		scrollToBottom();
	}, [messages]);

	
	// handle key enter in text-area
	const onKeyDown = (event) => {
		if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
			if(formRef.current) {
				handleSubmitMessage(event);
			}
		}
	}
	
	return <>
		<form
			ref={formRef}
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
							<IconAttachment/>
							<span className="sr-only">New Chat</span>
						</Button>
					</TooltipTrigger>
					<TooltipContent>New Chat</TooltipContent>
				</Tooltip>
				<Textarea
					ref={inputRef}
					tabIndex={0}
					onKeyDown={(event) => onKeyDown(event)}
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
							<Button className='rounded-full size-8' type="submit" size="icon" disabled={input === ''}>
								<IconArrowUp/>
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
