import React, { useState } from "react";
import { Home, Files, PlusCircle, ChevronLeft, ChevronRight } from "lucide-react";

const SideNav = ({ onResetChat }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showText, setShowText] = useState(true);

  const handleToggle = () => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setTimeout(() => setShowText(true), 300); // Delay text appearance
    } else {
      setShowText(false);
      setIsCollapsed(true);
    }
  };

  return (
    <aside className={`h-full p-4 text-left dark:bg-gray-800 transition-all duration-300 ${isCollapsed ? "w-16" : "w-72"}`}>
      <div className="flex items-center justify-between mb-6 mt-2 h-8">
        {!isCollapsed && <h2 className="text-xl font-bold text-white">Navigation</h2>}
        <button 
          onClick={handleToggle} 
          className="text-white p-1 rounded hover:bg-gray-700">
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>
      <ul className={`space-y-2 ${isCollapsed ? "items-center" : ""}`}>
        <li className="hover:bg-gray-700 rounded w-full">
          <button 
            onClick={onResetChat} 
            className="flex items-center gap-2 text-left text-white py-2 rounded cursor-pointer w-full h-8 p-1">
            <PlusCircle className="w-5 h-5" />
            {showText && !isCollapsed && "New Chat"}
          </button>
        </li>
        <li className="hover:bg-gray-700 rounded w-full">
          <button 
            onClick={onResetChat} 
            className="flex items-center gap-2 text-left text-white py-2 rounded cursor-pointer w-full h-8 p-1">
            <Home className="w-5 h-5" />
            {showText && !isCollapsed && "Home"}
          </button>
        </li>
        <li className="hover:bg-gray-700 rounded w-full">
          <button 
            onClick={onResetChat} 
            className="flex items-center gap-2 text-left text-white py-2 rounded cursor-pointer w-full h-8 p-1">
            <Files className="w-5 h-5" />
            {showText && !isCollapsed && "Documents"}
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default SideNav;