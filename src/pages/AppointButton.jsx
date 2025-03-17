import React from 'react';
import { FaCalendarCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Appointment = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/appointment'); // Redirect to the /appointment route
  };

  return (
    <motion.div
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full shadow-lg cursor-pointer z-50 md:hidden overflow-hidden"
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
      <FaCalendarCheck size={40} className="text-white p-2" />
    </motion.div>
  );
};

export default Appointment;
