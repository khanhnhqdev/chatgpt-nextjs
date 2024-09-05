'use client'

import {cn} from '@/core/utils'
import {ChatList} from './chat-list'
import {ChatPanel} from './chat-panel'
import {EmptyScreen} from './empty-screen'
// import {useLocalStorage} from '@/lib/hooks/use-local-storage'
import {useEffect, useState} from 'react'
import {useAIState, useUIState} from 'ai/rsc'
// import {Message, Session} from '@/lib/types'
import {usePathname, useRouter} from 'next/navigation'
import {useScrollAnchor} from '@/core/hook/use-scroll-anchor'
import {toast} from 'sonner'
import {ButtonScrollToBottom} from './button-scroll-to-bottom'

export function ChatContainer({id, session, missingKeys}) {
	
	const [input, setInput] = useState('');
	const [messages] = useUIState();
	const {messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom} = useScrollAnchor();
	
	return (
		<div
			className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
			ref={scrollRef}
		>
			<div
				className={cn('pb-[200px] pt-4 md:pt-10')}
				ref={messagesRef}
			>
				{messages.length ? (
					<ChatList messages={messages}/>
				) : (
					<EmptyScreen/>
				)}
				<div className="w-full h-px visibility-div" ref={visibilityRef}/>
			</div>
			
			<ButtonScrollToBottom
				isAtBottom={isAtBottom}
				scrollToBottom={scrollToBottom}
			/>

			<ChatPanel
				id={id}
				input={input}
				setInput={setInput}
				isAtBottom={isAtBottom}
				scrollToBottom={scrollToBottom}
			/>
		</div>
	)
}
