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


export default function useChatbot(prompt: string) {
  const [response, setResponse] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  async function StartChat() {
    setIsTyping(true)
    try {
      const res = await model.generateContent(prompt);
    setResponse(res.response.text());
    } catch (error) {
      throw new Error("Something is wrong")
    } finally {
      setIsTyping(false)
    }
    

  }
  return { StartChat, response, isTyping};
}
