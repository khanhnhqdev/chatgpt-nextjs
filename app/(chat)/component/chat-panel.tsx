import * as React from 'react'

import {Button} from '@/components/button'
import {PromptForm} from './prompt-form'
// import {ButtonScrollToBottom} from '@/components/button-scroll-to-bottom'
import {IconShare} from '@/components/icons'
// import {useActions, useAIState, useUIState} from 'ai/rsc'
// import {AI} from '@/lib/chat/actions'
import {nanoid} from 'nanoid'
// import {UserMessage} from './stocks/message'

export interface ChatPanelProps {
	id?: string
	title?: string
	input: string
	setInput: (value: string) => void
	// isAtBottom: boolean
	// scrollToBottom: () => void
}

export function ChatPanel({
	                          id,
	                          title,
	                          input,
	                          setInput,
	                        //   isAtBottom,
	                        //   scrollToBottom
                          }: ChatPanelProps) {
	// const [aiState] = useAIState()
	// const [messages, setMessages] = useUIState<typeof AI>()
	// const {submitUserMessage} = useActions()
	
	return (
		<div
			className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
			{/* <ButtonScrollToBottom
				isAtBottom={isAtBottom}
				scrollToBottom={scrollToBottom}
			/> */}
			
			<div className="mx-auto sm:max-w-2xl sm:px-4">
				{/* <div className="mb-4 grid grid-cols-2 gap-2 px-4 sm:px-0">
					{messages.length === 0 && }
				</div> */}
				
				<div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
					<PromptForm input={input} setInput={setInput}/>
				</div>
			</div>
		</div>
	)
}
