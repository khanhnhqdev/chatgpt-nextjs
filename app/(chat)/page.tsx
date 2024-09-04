import Image from "next/image";
import { PromptForm } from "./component/prompt-form";
import {nanoid} from '@/core/utils'
import { Chat } from "./component/chat";
import { AI } from "@/api/chat/actions";

export default function IndexPage() {

	// new chat for each time reload page
	const id = nanoid();

	return <>
		<AI 
			initialAIState={{chatId: id, messages: []}} 
			initialUIState={[]}
		>
			<Chat id={id} session={null} missingKeys={null}/>
		</AI>

	</>;
}
