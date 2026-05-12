// import dotenv from "dotenv";
// dotenv.config();

// import  {initChatModel} from "langchain";

// process.env.GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// const model = await initChatModel("google-genai:gemini-2.5-flash-lite");



// // ======================================================
// // // hindi translation
// // ======================================================



// const conversation = [
//   { role: "system", content: "You are a translater and translate input in hindi ?" },
//     { role: "user", content: "good " },
// ];

 
// const response = await model.invoke(conversation);


// console.log(response.content);


// // hinglish translation
// const conversation = [
//   { role: "system", content: "You are a translater and translate input in hinglish ?" },
//     { role: "user", content: "good " },
// ];

 
// const response = await model.invoke(conversation);


// console.log(response.content);
    




// // ======================================================
// // // prompt chaining   
// // ======================================================

// const conversation = [
//   { role: "system", content: "You are a translater and translate input in {language} ?" },
//     { role: "user", content: "{query} " },
// ];


// let finalResponse = conversation.map((item) => {
//   if (item.content.includes("{language}")) {
//     item.content = item.content.replace("{language}", "hinglish");
//   }
//   if (item.content.includes("{query}")) {
//     item.content = item.content.replace("{query}", "i am too good na bro");
//   }
//   return item;
// });

// // const response = await model.invoke(finalResponse);

// const response2 = await model.invoke({"language": "hindi", "query": "i am too good na bro "});    
// // console.log(response.content);
// console.log(response2.content);


// // reduces promt chainig input directly 




// ======================================================
// // with chat template is easy to do prompt chaining  in langchain
// ======================================================
// 

import dotenv from "dotenv";
dotenv.config();

import { initChatModel } from "langchain";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const model = await initChatModel("google-genai:gemini-2.5-flash-lite");

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a translator and translate input into {language}",
  ],
  ["user", "{query}"],
]);

// connect prompt + model
const chain = prompt.pipe(model);

// dynamic values
const response = await chain.invoke({
  language: "hinglish",
  query: "i am too good na bro",
});

console.log(response.content);