import React from 'react';

const Ads = () => {
  return (
    <div className="w-full h-[4vh] bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 flex items-center shadow-lg">
      {/* Container */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="flex justify-between items-center text-white text-xs sm:text-sm">
          {/* Left Section - Email */}
          <div className="flex items-center space-x-2 group hover:text-cyan-200 transition-colors duration-300">
            <svg
              className="w-4 h-4 group-hover:scale-110 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <p className="font-medium truncate">info@bhoomikaeyeinstitute.com</p>
          </div>

          {/* Middle Section - Address */}
          <div className="flex items-center space-x-2 group hover:text-cyan-200 transition-colors duration-300">
            <svg
              className="w-4 h-4 group-hover:scale-110 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="font-medium truncate">123 Eye Care Street, Mumbai, India</p>
          </div>

          {/* Right Section - Phone */}
          <div className="flex items-center space-x-2 group hover:text-cyan-200 transition-colors duration-300">
            <svg
              className="w-4 h-4 group-hover:scale-110 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <p className="font-medium truncate">+91 9777050048</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ads;