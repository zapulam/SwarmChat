// src/components/Header.jsx
import React from "react";
import { Settings, User, Image } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full h-sm text-white p-4 text-2xl font-bold flex justify-between items-center dark:bg-gray-900">
      <div className="flex items-center gap-2">
        <Image className="w-7 h-7" />
        <span>Image Chat</span>
      </div>
      <div className="flex gap-4">
        <button className="p-2 rounded-full hover:dark:bg-gray-800 transition cursor-pointer">
          <Settings className="w-4 h-4 md:w-6 md:h-6" />
        </button>
        <button className="p-2 rounded-full hover:dark:bg-gray-800 transition cursor-pointer">
          <User className="w-4 h-4 md:w-6 md:h-6" />
        </button>

      </div>
    </header>
  );
};

export default Header;
