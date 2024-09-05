import Image from "next/image";
import {nanoid} from '@/core/utils'
import {ChatContainer} from "./component/chat-container";
import { AI } from "@/api/chat/actions";

export default function IndexPage() {

	// new chat for each time reload page
	const id = nanoid();

	return <>
		<AI 
			initialAIState={{chatId: id, messages: []}} 
			initialUIState={[]}
		>
			<ChatContainer id={id}/>
		</AI>

	</>;
}
