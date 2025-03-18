import React from "react";
import eyeview from "../assets/eyeview.jpg";

const Fellowship = () => {
  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative px-4 md:px-0"
      style={{ backgroundImage: `url(${eyeview})` }}
    >
      <div className="bg-white/80 p-6 md:p-10 rounded-3xl shadow-2xl text-center backdrop-blur-md border border-gray-300 max-w-lg md:max-w-2xl w-full">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-wide">Fellowship</h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700 font-medium">Coming Soon...</p>
        <div className="mt-6">
          <button className="px-5 py-3 md:px-6 md:py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg md:text-xl font-semibold rounded-full shadow-md hover:scale-105 transition-transform duration-300">
            Stay Tuned
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fellowship;