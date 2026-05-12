import dotenv from "dotenv";
dotenv.config();

import { initChatModel } from "langchain";

process.env.GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const model = await initChatModel("google-genai:gemini-2.5-flash-lite");

const response = await model.invoke("who is the prime minister of india?");

console.log(response.content);
