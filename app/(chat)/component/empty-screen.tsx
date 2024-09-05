export function ExternalLink({
	                             href,
	                             children
                             }: {
	href: string
	children: React.ReactNode
}) {
	return (
		<a
			href={href}
			target="_blank"
			className="inline-flex flex-1 justify-center gap-1 leading-4 hover:underline"
		>
			<span>{children}</span>
			<svg
				aria-hidden="true"
				height="7"
				viewBox="0 0 6 6"
				width="7"
				className="opacity-70"
			>
				<path
					d="M1.25215 5.54731L0.622742 4.9179L3.78169 1.75597H1.3834L1.38936 0.890915H5.27615V4.78069H4.40513L4.41109 2.38538L1.25215 5.54731Z"
					fill="currentColor"
				></path>
			</svg>
		</a>
	)
}

export function EmptyScreen() {
	return (
		<div className="mx-auto max-w-2xl px-4">
			<div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
				<h1 className="text-lg font-semibold">
					Welcome to Next.js AI Chatbot!
				</h1>
				<p className="leading-normal text-muted-foreground text-justify">
					This AI chatbot application is built using Next.js, incorporates real-time AI responses from OpenAI's GPT API, ensuring seamless conversations. The application is deployed on the free tier of Vercel.
				</p>
				<p className="leading-normal text-muted-foreground mt-1 mb-1">
					Key features of application:
				</p>
					
				<p className="leading-normal text-muted-foreground mt-1">
					<li className="mb-2">
						Enter prompt to get answer like ChatGPT
					</li>

					<li className="mb-2">
						Streams responses in real-time, creating a smooth and engaging chat experience for users.
					</li>
				</p>
				

			</div>
		</div>
	)
}
