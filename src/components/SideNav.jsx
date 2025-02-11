// src/components/SideNav.jsx
import React, { useState } from "react";

const SideNav = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      alert(`File uploaded: ${selectedFile.name}`);
      // Here, you would typically send the file to a backend or storage service
    } else {
      alert("Please select a file first.");
    }
  };

  return (
    <aside className="w-sm hg-full max-w-lg bg-gray-800 text-white h-full p-4">
      <h2 className="text-xl font-bold mb-4">Navigation</h2>
      <ul className="space-y-2">
        <li className="p-2 hover:bg-gray-700 rounded">Home</li>
        <li className="p-2 hover:bg-gray-700 rounded">Documents</li>
        <li className="p-2 hover:bg-gray-700 rounded">Settings</li>
      </ul>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Upload Document</h3>
        <input type="file" onChange={handleFileChange} className="mb-2 text-black" />
        <button
          onClick={handleUpload}
          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded mt-2 w-full"
        >
          Upload
        </button>
      </div>
    </aside>
  );
};

export default SideNav;
