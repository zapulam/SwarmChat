import React from 'react';

import { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

import Header from "./components/Header";
import SideNav from "./components/SideNav";

export default function ChatbotUI() {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");

    setTimeout(() => {
      const botResponse = {
        text: "I'm just a demo chatbot. I can't provide real answers yet!",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-screen h-screen items-center min-h-screen bg-gray-100">
      <Header />
      <div className="grow w-full flex flex-row justify-between">
        <SideNav />
        <div className="flex flex-col grow shadow-lg rounded-2xl overflow-hidden bg-white">
          <div className="grow p-4 space-y-4 h-[500px] overflow-y-auto">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`text-left p-3 rounded-lg w-fit max-w-md ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white self-end ml-auto"
                    : "bg-gray-300 text-black self-start"
                }`}
              >
                {msg.text}
              </motion.div>
            ))}
          </div>
          <div className="p-4 flex items-center gap-2 border-t">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border border-gray-500 p-2 rounded text-gray-500"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
