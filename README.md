# Welcome to Next.js AI Chatbot!

### Summary

This AI chatbot application is built using Next.js, incorporates real-time AI responses from OpenAI's GPT API, ensuring seamless conversations. The application is deployed on the free tier of Vercel.

Key features of application:

* Enter prompt to get answer like ChatGPT

* Streams responses in real-time, creating a smooth and engaging chat experience for users

### Code structure

* The project uses Next.js and the OpenAI SDK to call the ChatGPT-4.0 API and retrieve responses based on user prompts

* To stream responses from GPT chat, the Vercel AI SDK is used. This SDK simplifies managing AI and UI state, ensuring robust synchronization between server and client

<br>
<br>
 

```
Folder code structure

- app/: UI code for chat application, include pages and styles

- api/: backend code for API route and server-side logic (call to gpt to get answer)

- components/: basic components for master layout and UI-Kit for all project

- core/: core hooks and utils to reuse in all project

```


### How to run code

Local run 

```
npm install
npm run dev 
```