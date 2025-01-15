import {
  GoogleGenerativeAI,

} from "@google/generative-ai";
import { useState } from "react";

const apiKey: string | undefined = "AIzaSyBHIfoxqNUrtEiu9gFirDHZWDXw27Y6Iy8";
if (!apiKey) {
  throw new Error("API key is not defined");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});



interface Chats {
  role: "model" | "user";
  parts: [
    {
      text: string;
    }
  ];
}

export default function useChatbot(prompt: string) {
  const [chats, setChats] = useState<Chats[]>([
    {
      role: "user",
      parts: [{ text: "Hello"}],
    },
  ]);
  async function StartChat() {
    const chatSession = model.startChat({
      history: chats,
    });
    const result = await chatSession.sendMessage(prompt);

    setChats((prevChats) => [
      ...prevChats,
      {
        role: "user",
        parts: [{ text: prompt }],
      },
      {
        role: "model",
        parts: [{ text: result.response.text() }],
      },
    ]);

    console.log(result.response.text());
  }
  return { StartChat };
}
