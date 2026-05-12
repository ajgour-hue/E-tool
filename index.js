import "dotenv/config";
import readline from "readline/promises";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage } from "@langchain/core/messages";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const model = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

const message = [];

while (true) {
  const userInput = await rl.question("You: ");

  message.push(new HumanMessage(userInput));

  const response = await model.invoke(message);

  message.push(response);

  console.log("AI:", response.content);
}

rl.close();