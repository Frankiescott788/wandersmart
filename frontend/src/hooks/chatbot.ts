import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
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

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

interface Chats {
  role: "model" | "user";
  parts: [
    {
      text: string;
    }
  ];
}

export default function useChatbot(prompt: string, data : any) {
  const [chats, setChats] = useState<Chats[]>([
    {
      role: "user",
      parts: [{ text: `
          Based on the following weather data, suggest appropriate activities for the day. The data includes the current weather, hourly weather forecast, and daily weather trends. Provide detailed recommendations for outdoor and indoor activities, and explain why they are suitable for the conditions.
          -the temprature is ${data.temp}
          - city ${data.city}
        
        ` }],
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
