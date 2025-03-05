import React, { useState } from "react";
import { Home, Files, PlusCircle, ChevronLeft, ChevronRight, MessageCircleQuestion  } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SideNav = ({ onResetChat }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleToggle = () => {
    setIsCollapsed((prev) => !prev);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <aside
      className={`h-full p-4 text-left dark:bg-gray-800 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-72"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 mt-2 h-8">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.h2
              className="text-xl font-bold text-white whitespace-nowrap overflow-hidden"
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 0 }}
            >
              Navigation
            </motion.h2>
          )}
        </AnimatePresence>
        <button
          onClick={handleToggle}
          className="text-white p-1 rounded hover:bg-gray-700 cursor-pointer"
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {/* Navigation List */}
      <ul className="space-y-2">
        {[ 
          { icon: <PlusCircle className="w-5 h-5" />, label: "New Chat", onClick: onResetChat },
          { icon: <Home className="w-5 h-5" />, label: "Home" },
          { icon: <Files className="w-5 h-5" />, label: "Documents" },
        ].map(({ icon, label, onClick }, index) => (
          <li key={index} className="hover:bg-gray-700 rounded w-full duration-300">
            <button
              onClick={onClick} // Only "New Chat" will have onResetChat
              className="flex items-center gap-2 text-left text-white py-4.5 px-1.5 rounded cursor-pointer w-full h-8 min-w-0"
            >
              <div className="w-5 min-w-5 flex-shrink-0">{icon}</div>
              <div className="overflow-hidden whitespace-nowrap min-w-0">
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {/* Question mark button at the bottom */}
      <div className="absolute bottom-4 left-4">
        <button
          onClick={togglePopup}
          className="text-white p-2 rounded-full hover:bg-gray-700 cursor-pointer"
        >
          <MessageCircleQuestion className="w-5 h-5" />
        </button>
      </div>

      {/* Popup with animation */}
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-gray-200 p-6 rounded-lg text-black w-1/3"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-4">Welcome to the LLM Image Chat Demo</h3>
              <p className="mb-4">
                This app is an internal demo tool designed to showcase how users can chat with a Large Language Model (LLM). 
                The purpose of this demonstration is to help you explore the capabilities of LLM-powered chat interfaces. 
                This app is used for internal purposes only and is not a final product.
              </p>
              <p className="mb-4">
                In this demo, you can interact with the LLM, ask questions, and get responses on a variety of topics. 
                We also included an image in the context to showcase how the app can handle multiple data types.
              </p>
              <button
                onClick={togglePopup}
                className="mt-4 bg-blue-500 text-white p-2 rounded cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};

export default SideNav;
