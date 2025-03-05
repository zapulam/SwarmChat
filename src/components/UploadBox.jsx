import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Image, Send, Trash, ArrowBigUpDash, BotMessageSquare, MessageCircle } from "lucide-react";

const UploadBox = ({ onImageUpload, onStartChat, setMessages }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    processFiles(files);
  };
  
  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const files = Array.from(event.dataTransfer.files);
    processFiles(files);
  };
  
  const processFiles = (files) => {
    if (selectedFiles.length + files.length <= 6) {
      const newFiles = files.filter((file) => file.type.startsWith("image/"));
      if (newFiles.length) {
        setSelectedFiles((prevFiles) => {
          const updatedFiles = [...prevFiles, ...newFiles];
          onImageUpload(updatedFiles); // Pass raw files, not base64
          return updatedFiles;
        });
      } else {
        alert("Please upload valid image files.");
      }
    } else {
      alert("You can upload a maximum of 6 images.");
    }
  };
  

  const handleStartChat = () => {
    if (selectedFiles.length > 0 || message.trim()) {
      onStartChat(selectedFiles, message);
      setMessage(""); // Clear message input
      setSelectedFiles([]); // Clear selected files after upload
    } else {
      alert("Please upload an image or enter a message to start the chat.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleStartChat();
    }
  };

  const handleDeleteFile = (event, index) => {
    event.stopPropagation(); // Prevent the click from triggering the file input
    const updatedFiles = selectedFiles.filter((_, i) => i !== index); // Remove the file from selectedFiles
    setSelectedFiles(updatedFiles); // Update local state in UploadBox
  
    // Notify the parent component (App.jsx) to update the images state
    onImageUpload(updatedFiles); // Pass the updated files (not base64) to parent component
  };
  

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full"
      initial={{ opacity: 0, y: 20 }} // Start faded and slightly below
      animate={{ opacity: 1, y: 0 }} // Fade in and slide up
      transition={{ duration: 0.5 }} // Smooth transition
    >
      {/* Drag & Drop Area */}
      <label
        className={`w-2xl h-50 border-2 border-dashed rounded-lg flex flex-col items-center justify-center dark:bg-gray-900 hover:dark:bg-gray-800 transition duration-300 cursor-pointer ${
          dragging ? "bg-green-900" : "border-gray-500"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" multiple />
        {selectedFiles.length > 0 ? (
          <>
            <Image className="w-10 h-10 text-gray-500 mb-2" />
            <p className="text-gray-600">Images Uploaded</p>
            <ul className="text-left text-gray-600">
              {selectedFiles.map((file, index) => (
                <li key={index} className="flex items-center justify-between gap-2">
                  <span>{file.name}</span>
                  <button
                    onClick={(event) => handleDeleteFile(event, index)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <Upload className="w-10 h-10 text-gray-500 mb-2" />
            <p className="text-gray-300">Click or Drag & Drop images here</p>
          </>
        )}
      </label>

      {/* Message Input & Send Button */}
      <div className="w-2xl mt-4 flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="text-gray-100 border-gray-300 border-1 p-2 rounded flex-1"
        />
        <button
          onClick={handleStartChat}
          className="h-full aspect-square bg-green-600 hover:bg-green-500 text-white p-2 rounded transition duration-300 cursor-pointer"
        >
          <Send className="w-4 h-4 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Directions */}
      <div className="w-2xl grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {[
          { icon: <ArrowBigUpDash className="w-6 h-6" />, title: "Upload", text: "Start by uploading your image or images. Our AI will process your input." },
          { icon: <BotMessageSquare className="w-6 h-6" />, title: "Prompt", text: "Type your initial input message to get a response from the bot about the image." },
          { icon: <MessageCircle className="w-6 h-6" />, title: "Chat", text: "Continue your conversation as necessary with the bot, asking follow up questions." },
        ].map(({ icon, title, text }, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 p-4 rounded-lg flex flex-col items-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.3 }} // Staggered effect
          >
            <div className="flex flex-row gap-2 text-white">
              {icon}
              <h3 className="text-xl font-semibold">{title}</h3>
            </div>
            <div className="text-white text-left">
              <p className="text-sm mt-2">{text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default UploadBox;
