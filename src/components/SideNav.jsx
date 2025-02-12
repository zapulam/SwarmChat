import React, { useState } from "react";
import { TrashIcon } from "@heroicons/react/20/solid";  // Ensure you're using the correct import path for v2

const SideNav = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      alert(`File uploaded: ${selectedFile.name}`);
      // Handle file upload logic here
    } else {
      alert("Please select a file first.");
    }
  };

  const handleDelete = () => {
    setSelectedFile(null); // Clear the file selection
    document.getElementById("file-input").value = null; // Reset the input field
  };

  return (
    <aside className="w-2xs hg-full max-w-lg bg-gray-800 text-white h-full p-4 text-left">
      <h2 className="text-xl font-bold mb-4">Navigation</h2>
      <ul className="space-y-2">
        <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">Home</li>
        <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">Documents</li>
        <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">Settings</li>
      </ul>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Upload Document</h3>

        {/* Custom File Upload Button */}
        <label className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer inline-block text-center">
          Choose File
          <input 
            id="file-input" // Added id to access the input field
            type="file" 
            onChange={handleFileChange} 
            className="hidden"
          />
        </label>

        {/* Display selected file name with Delete button */}
        {selectedFile && (
          <div className="mt-2 flex items-center">
            <p className="text-gray-300 flex-grow">{selectedFile.name}</p>
            <button 
              onClick={handleDelete} 
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded ml-2"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Show Upload Button only if a file is selected */}
        {selectedFile && (
          <button
            onClick={handleUpload}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded cursor-pointer mt-3 w-full"
          >
            Upload
          </button>
        )}
      </div>
    </aside>
  );
};

export default SideNav;
