import React, { useState } from "react";
import { Send } from "lucide-react";
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

  const handleImageUpload = (updatedFiles) => {
    // Ensure updatedFiles is an array of File objects
    if (!Array.isArray(updatedFiles)) {
      console.error('Expected updatedFiles to be an array, but got:', updatedFiles);
      return;
    }
  
    const base64Images = updatedFiles.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
      });
    });
  
    // Once all files are read as base64, update the images state
    Promise.all(base64Images).then((base64Images) => {
      setImages(base64Images); // Set base64 images in state
    });
  };
  
  
  const handleStartChat = async (selectedFiles, initialMessage) => {
    setChatStarted(true);
    const newMessages = [];
  
    if (selectedFiles.length > 0) {
      // Convert files to base64 before adding to images state
      const base64Images = await Promise.all(
        selectedFiles.map((file) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
          });
        })
      );
  
      // Only update images if it's a new set of base64-encoded images
      setImages((prevImages) => {
        const uniqueBase64Images = base64Images.filter((img) => !prevImages.includes(img));
        return [...prevImages, ...uniqueBase64Images];
      });
    }
  
    if (initialMessage.trim()) {
      newMessages.push({ text: initialMessage, role: "user" });
    }
  
    const updatedMessages = [...messages, ...newMessages];
  
    if (newMessages.length > 0) {
      setMessages(updatedMessages); // Update chat history
      try {
        console.log("Sending conversation to API:", updatedMessages);
  
        // Call API to get LLM response
        const response = await fetch("http://127.0.0.1:8000/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            conversation: updatedMessages,
            images: images
          }),
        });
  
        const data = await response.json();
        if (!response.ok) throw new Error(data.detail || "Failed to get response");
  
        setMessages((prev) => [...prev, { text: data.response, role: "assistant" }]);
  
      } catch (error) {
        console.error("Error:", error);
        setMessages((prev) => [...prev, { text: "Error: Unable to get response.", role: "assistant" }]);
      }
    }
  };
  

  const sendMessage = async () => {
    if (!input.trim() && images.length === 0) return; // Ensure we have either text or images

    const userMessage = { text: input, role: "user" };

    // Update chat history before making API call
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput(""); // Clear input field

    try {
        const response = await fetch("http://127.0.0.1:8000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                conversation: updatedMessages,
                images: images
            }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.detail || "Failed to get response");

        // Add assistant response to chat
        const botResponse = { text: data.response, role: "assistant" };
        setMessages((prev) => [...prev, botResponse]);
        //setImages([]); // Clear images after sending

    } catch (error) {
        console.error("Error:", error);
        setMessages((prev) => [...prev, { text: "Error: Unable to get response.", role: "assistant" }]);
    }
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
      <div className="h-full w-full flex flex-col justify-between dark:bg-gray-900 overflow-hidden">
        <Header />
        
        {!chatStarted ? (
          <UploadBox 
            onImageUpload={handleImageUpload} 
            onStartChat={handleStartChat} 
            setMessages={setMessages} 
          />
        ) : (
          <div className="flex flex-col grow shadow-lg overflow-hidden">

            {/* Main content area */}
            <div className="flex flex-col content-center grow p-4 space-y-4 h-[500px] overflow-y-auto scrollbar-none">
              
              {/* Uploaded Images Section */}
              {images.length > 0 && (
                <div className="px-[10vw] space-y-6 grid grid-cols-2 md:grid-cols-3 gap-4 mb-2">
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
              <div className="px-[10vw] space-y-6">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`text-left p-3 rounded-lg w-fit max-w-2xl text-white ${
                      msg.role === "user"
                        ? "bg-gray-800 text-white self-end ml-auto"
                        : "bg-gray-800 text-black self-start"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
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
                className="text-gray-100 border-gray-300 flex-1 border p-2 rounded"
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
