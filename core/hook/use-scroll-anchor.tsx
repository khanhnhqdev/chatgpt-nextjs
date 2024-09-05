import {useCallback, useEffect, useRef, useState} from 'react'

export const useScrollAnchor = () => {

	const messagesRef = useRef<HTMLDivElement>(null);
	const scrollRef = useRef<HTMLDivElement>(null);
	const visibilityRef = useRef<HTMLDivElement>(null);
	
	const [isAtBottom, setIsAtBottom] = useState(true);
	const [isVisible, setIsVisible] = useState(false);

	const scrollToBottom = useCallback(() => {
		if (messagesRef.current) {
			messagesRef.current.scrollIntoView({
				block: 'end',
				behavior: 'smooth'
			});
		}
	}, [])
	

	// scroll each time new message come
	useEffect(() => {
		if (messagesRef.current) {
			if (!isVisible) {
				messagesRef.current.scrollIntoView({
					block: 'end'
				});
			}
		}
	}, [isAtBottom, isVisible])
	
	
	useEffect(() => {
		if (visibilityRef.current) {
			let observer = new IntersectionObserver(
				entries => {
					entries.forEach(entry => {
						if (entry.isIntersecting) {
							setIsVisible(true)
						} else {
							setIsVisible(false)
						}
					})
				},
				{
					rootMargin: '0px 0px -150px 0px'
				}
			)
			
			observer.observe(visibilityRef.current);
			
			return () => {
				observer.disconnect();
			}
		}
	}, [visibilityRef])
	
	return {
		messagesRef,
		scrollRef,
		visibilityRef,
		scrollToBottom,
		isAtBottom,
		isVisible
	}
}
