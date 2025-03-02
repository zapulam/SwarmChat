import React, { useState } from "react";
import { Send, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import UploadBox from "./components/UploadBox";

export default function ChatbotUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [images, setImages] = useState([]);
  const [chatStarted, setChatStarted] = useState(false);

  const handleImageUpload = (imageSrc) => {
    // Check for valid image data before updating the state
    if (imageSrc && typeof imageSrc === "string" && imageSrc.startsWith("data:image")) {
      setImages((prevImages) => [...prevImages, imageSrc]);
    } else {
      console.warn("Attempted to add an empty or invalid image.");
    }
  };  
  
  const handleStartChat = (imageSrc, initialMessage) => {
    setChatStarted(true);
    const newMessages = [];
  
    // Ensure imageSrc is valid before adding to the images array
    if (imageSrc && imageSrc !== "") {
      handleImageUpload(imageSrc);
      newMessages.push({ text: "*Uploaded Images*", sender: "bot" });
    }
  
    if (initialMessage.trim()) {
      newMessages.push({ text: initialMessage, sender: "user" });
  
      // Simulate bot response after 1 second
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "I'm just a demo chatbot. I can't provide real answers yet!", sender: "bot" }
        ]);
      }, 1000);
    }
  
    setMessages((prev) => [...prev, ...newMessages]);
  };  

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

  const resetChat = () => {
    setMessages([]);
    setImages([]);
    setInput("");
    setChatStarted(false);
  };

  return (
    <div className="flex flex-row w-screen h-screen items-center min-h-screen">
      <SideNav onResetChat={resetChat} />
      <div className="h-full w-full flex flex-col justify-between dark:bg-gray-900">
        <Header />
        
        {!chatStarted ? (
          <UploadBox onImageUpload={handleImageUpload} onStartChat={handleStartChat} />
        ) : (
          <div className="flex flex-col grow shadow-lg overflow-hidden">

            {/* Main content area */}
            <div className="flex flex-col content-center grow p-4 space-y-4 h-[500px] overflow-y-auto">
              
              {/* Uploaded Images Section */}
              {images.length > 0 && (
                <div className="px-[10vw] space-y-2 grid grid-cols-2 md:grid-cols-3 gap-4 mb-2">
                  {images.map((img, index) => (
                    <motion.div
                      key={index}
                      className="relative group"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={img}
                        alt={`Uploaded ${index}`}
                        className="w-full h-40 object-cover rounded-lg shadow-md"
                      />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Chat Messages */}
              <div className="px-[10vw] space-y-2">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`text-left p-3 rounded-lg w-fit max-w-md bg-gray-700 text-white ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white self-end ml-auto"
                        : "bg-gray-300 text-black self-start"
                    }`}
                  >
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Chat Input Box */}
            <div className="px-[10vw] py-4 flex justify-center gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border border-gray-500 p-2 rounded text-gray-500"
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button onClick={sendMessage} className="bg-green-600 hover:bg-green-400 transition duration-300 text-white px-3 py-2 rounded cursor-pointer">
                <Send className="w-4 h-4 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
