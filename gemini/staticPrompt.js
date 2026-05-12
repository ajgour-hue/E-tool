import dotenv from "dotenv";
dotenv.config();

import  {initChatModel} from "langchain";

process.env.GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const model = await initChatModel("google-genai:gemini-2.5-flash-lite");

const conversation = [
  { role: "system", content: "You are a mern developer." },
    { role: "user", content: "give me code of a simple hello world program " },
];

 
const response = await model.invoke(conversation);


console.log(response.content);

