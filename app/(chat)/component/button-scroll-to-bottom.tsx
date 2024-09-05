'use client'

import * as React from 'react'

import {cn} from '@/core/utils'
import {IconArrowDown} from '@/components/icons'
import {Button, type ButtonProps} from '@/components/button'
import {useEffect, useState} from 'react'

interface ButtonScrollToBottomProps extends ButtonProps {
	isAtBottom: boolean
	scrollToBottom: () => void
}

export function ButtonScrollToBottom({
	                                     className,
	                                     isAtBottom,
	                                     scrollToBottom,
	                                     ...props
                                     }: ButtonScrollToBottomProps) {

	return (
		<Button
			variant="outline"
			size="icon"
			className={cn(
				'absolute right-4 top-1 z-10 bg-background transition-opacity duration-300 sm:right-8 md:top-2',
				'opacity-100',
				className
			)}
			onClick={() => scrollToBottom()}
			{...props}
		>
			<IconArrowDown/>
			<span className="sr-only">Scroll to bottom</span>
		</Button>
	)
}
