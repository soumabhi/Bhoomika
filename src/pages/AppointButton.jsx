import React from 'react';
import { FaCalendarCheck } from 'react-icons/fa'; // Example icon
import { motion } from 'framer-motion';

const Appointment = () => {
  const handleClick = () => {
    window.open("/appointment"); // Replace with your link
  };

  return (
    <motion.div
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full shadow-lg cursor-pointer z-50 md:hidden overflow-hidden" // Gradient background
      animate={{
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 3,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
      }}
    >
      {/* Icon with Gradient Background */}
      <FaCalendarCheck size={40} className="text-white p-2" />
    </motion.div>
  );
};

export default Appointment;