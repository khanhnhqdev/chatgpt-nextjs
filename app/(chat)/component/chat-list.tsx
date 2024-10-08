import {Separator} from '@/components/separator'
import {UIState} from '@/api/chat/actions'
import Link from 'next/link'
import {ExclamationTriangleIcon} from '@radix-ui/react-icons'


export function ChatList({messages}) {
	
	if (!messages.length) {
		return null;
	}
	
	return (
		<div className="relative mx-auto max-w-2xl px-4">
			<>
				<div className="group relative mb-4 flex items-start md:-ml-12">
					<div
						className="bg-background flex size-[25px] shrink-0 select-none items-center justify-center rounded-md border shadow-sm">
						<ExclamationTriangleIcon/>
					</div>
					<div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
						<p className="text-muted-foreground leading-normal">
							<b>Upcomming feature:</b> login/signup to save chat session !
						</p>
					</div>
				</div>
				<Separator className="my-4"/>
			</>
			
			{messages.map((message, index) => (
				<div key={message.id} className='mb-7'>
					{message.display}
				</div>
			))}
		</div>
	)
}
