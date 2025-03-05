// src/components/Header.jsx
import React from "react";
import { Settings, User, Image } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      className="w-full h-sm text-white p-4 text-2xl font-bold flex justify-between items-center dark:bg-gray-900"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2">
        <Image className="w-7 h-7" />
        <span>Image Chat</span>
      </div>
      <div className="flex gap-4">
        <button className="p-2 rounded-full hover:dark:bg-gray-800 transition duration-300 cursor-pointer">
          <Settings className="w-4 h-4 md:w-6 md:h-6" />
        </button>
        <button className="p-2 rounded-full hover:dark:bg-gray-800 transition duration-300 cursor-pointer">
          <User className="w-4 h-4 md:w-6 md:h-6" />
        </button>
      </div>
    </motion.header>
  );
};

export default Header;
