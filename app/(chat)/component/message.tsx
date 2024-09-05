'use client'

import {IconOpenAI, IconUser} from '@/components/icons'
import {cn} from '@/core/utils'
// import {spinner} from './spinner'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
// import {useStreamableText} from '@/lib/hooks/use-streamable-text'
import {readStreamableValue, StreamableValue} from 'ai/rsc'
import {useEffect, useState} from 'react'

export function UserMessage({children}: { children: React.ReactNode }) { 
	return (
		<div className="group relative flex flex-end items-end md:-ml-12">
			<div
				className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-md border bg-background shadow-sm">
				<IconUser/>
			</div>
			<div className="ml-4 flex-1 space-y-2 overflow-hidden pl-2">
				{children}
			</div>
		</div>
	)
}

export function BotMessage({content}) {
	
	const [rawContent, setRawContent] = useState('');

	useEffect(() => {
		const readDataResponse = async () => {
			if (typeof content === 'object') {
				let value = ''
				for await (const delta of readStreamableValue(content)) {
					if (typeof delta === 'string') {
						setRawContent((value = value + delta))
					}
				}
			}
		}

		readDataResponse();
	}, [content])

	return (
		<div className={cn('group relative flex items-start md:-ml-12')}>
			<div
				className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
				<IconOpenAI/>
			</div>
			<div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
				{rawContent}
			</div>
		</div>
	)
}

export function SpinnerMessage() {
	return (
		<div className="group relative flex items-start md:-ml-12">
			<div
				className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
				<IconOpenAI/>
			</div>
			<div className="ml-4 h-[24px] flex flex-row items-center flex-1 space-y-2 overflow-hidden px-1">
				{/* {spinner} */}
			</div>
		</div>
	)
}
