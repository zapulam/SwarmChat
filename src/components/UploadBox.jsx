import React, { useState } from "react";
import { Upload, Image, Send, Trash, ArrowBigUpDash, BotMessageSquare, MessageCircle } from "lucide-react";

const UploadBox = ({ onImageUpload, onStartChat }) => {
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
    if (selectedFiles.length + files.length <= 5) {
      const newFiles = files.filter((file) => file.type.startsWith("image/"));
      if (newFiles.length) {
        setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
        newFiles.forEach((file) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const fileData = reader.result;  // This should be a base64 string
            
            // Check if fileData is a valid base64 string (not [object File])
            if (fileData && typeof fileData === "string" && fileData.startsWith("data:image")) {
              onImageUpload(fileData);  // Send the base64 string to parent component
            } else {
              console.warn("Failed to load valid image file.");
            }
          };
          reader.readAsDataURL(file);  // Make sure this reads the file as base64
        });
      } else {
        alert("Please upload valid image files.");
      }
    } else {
      alert("You can upload a maximum of 5 images.");
    }
  };

  const handleStartChat = () => {
    if (selectedFiles.length) {
      onStartChat(selectedFiles, message);
      setMessage(""); // Clear message input
    } else {
      alert("Please upload at least one image.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleStartChat();
    }
  };

  const handleDeleteFile = (event, index) => {
    event.stopPropagation(); // Prevent the click from triggering the file input
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* Drag & Drop Area (Now also clickable) */}
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
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          multiple
        />
        {selectedFiles.length > 0 ? (
          <>
            <Image className="w-10 h-10 text-gray-500 mb-2" />
            <p className="text-gray-600">Images Uploaded</p>
            <ul className="text-left text-gray-600">
              {selectedFiles.map((file, index) => (
                <li key={index} className="flex items-center justify-between gap-2">
                    <span>{file.name}</span>
                    <button
                        onClick={(event) => handleDeleteFile(event, index)} // Pass the event to the handler
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
          onKeyPress={handleKeyPress} // Listen for Enter key press
          placeholder="Type a message..."
          className="text-gray-100 border-gray-300 border-1 p-2 rounded flex-1"
        />
        <button
          onClick={handleStartChat}
          className="h-full aspect-square bg-green-600 hover:bg-green-400 text-white p-2 rounded transition duration-300 cursor-pointer"
        >
          <Send className="w-4 h-4 md:w-6 md:h-6" />
        </button>
      </div>

        {/* Directions */}
        <div className="w-2xl grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-start">
                <div className="flex flex-row gap-2 text-white">
                    <ArrowBigUpDash className="w-6 h-6" />
                    <h3 className="text-xl font-semibold">Upload</h3>
                </div>
                <div className="text-white text-left">
                    <p className="text-sm mt-2">Start by uploading your image or images. Our AI will process your input.</p>
                </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-start">
                <div className="flex flex-row gap-2 text-white">
                    <BotMessageSquare className="w-6 h-6" />
                    <h3 className="text-xl font-semibold">Prompt</h3>
                </div>
                <div className="text-white text-left">
                    <p className="text-sm mt-2">Type your initial input message to get a response from the chatbot about the image.</p>
                </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-start">
                <div className="flex flex-row gap-2 text-white">
                    <MessageCircle className="w-6 h-6" />
                    <h3 className="text-xl font-semibold">Chat</h3>
                </div>
                <div className="text-white text-left">
                    <p className="text-sm mt-2">Continue your conversation as necessary with the bot.</p>
                </div>
            </div>
        </div>

    </div>
  );
};

export default UploadBox;
