import dotenv from "dotenv";
dotenv.config();

import readline from "readline/promises";
import { ChatMistralAI } from "@langchain/mistralai";
import { createAgent, tool } from "langchain";
import { HumanMessage } from "@langchain/core/messages";
import { sendEmail } from "./mail.service.js";
import { z } from "zod";

const emailTool = tool(sendEmail, {
  name: "send_email",
  description:
    "Use this tool to send an email. Provide the recipient's email address, subject, and message content.",

  schema: z.object({
    to: z.string().email().describe("The recipient's email address"),
    subject: z.string().describe("The subject of the email"),
    html: z.string().optional().describe("The HTML content of the email"),
    text: z.string().optional().describe("The plain text content of the email"),
  }),
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const model = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

const agent = createAgent({
  model,
  tools: [emailTool],
});

const messages = [];

while (true) {
  const userInput = await rl.question("You: ");

  messages.push(new HumanMessage(userInput));

  const response = await agent.invoke({
    messages,
  });

  // console.log("AI:", response.messages[0].content);
  console.log(
  "AI:",
  response.messages[response.messages.length - 1].content
);

  if (response.messages) {
    messages.push(...response.messages);
  }
}

rl.close();