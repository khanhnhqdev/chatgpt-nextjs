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
// import {useScrollAnchor} from '@/lib/hooks/use-scroll-anchor'
import {toast} from 'sonner'

export function Chat({id, session, missingKeys}) {
	const router = useRouter();
	const path = usePathname();
	const [input, setInput] = useState('');
	const [messages] = useUIState();
	const [aiState] = useAIState();
	
	// const [_, setNewChatId] = useLocalStorage('newChatId', id)
	
	// useEffect(() => {
	// 	if (session?.user) {
	// 		if (!path.includes('chat') && messages.length === 1) {
	// 			window.history.replaceState({}, '', `/chat/${id}`)
	// 		}
	// 	}
	// }, [id, path, session?.user, messages])
	
	// useEffect(() => {
	// 	const messagesLength = aiState.messages?.length
	// 	if (messagesLength === 2) {
	// 		router.refresh()
	// 	}
	// }, [aiState.messages, router]);
	
	// useEffect(() => {
	// 	setNewChatId(id)
	// })
	
	// useEffect(() => {
	// 	missingKeys.map(key => {
	// 		toast.error(`Missing ${key} environment variable!`)
	// 	})
	// }, [missingKeys]);
	
	// const {messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom} = useScrollAnchor();
	
	return (
		<div
			className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
			// ref={scrollRef}
		>
			<div
				className={cn('pb-[200px] pt-4 md:pt-10')}
				// ref={messagesRef}
			>
				{messages.length ? (
					<ChatList messages={messages}/>
				) : (
					<EmptyScreen/>
				)}
				{/* <div className="w-full h-px" ref={visibilityRef}/> */}
			</div>
			<ChatPanel
				id={id}
				input={input}
				setInput={setInput}
				// isAtBottom={isAtBottom}
				// scrollToBottom={scrollToBottom}
			/>
		</div>
	)
}
