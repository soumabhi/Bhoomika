import React from 'react';
import { FaAward, FaEye, FaRegCalendarCheck, FaUserMd } from 'react-icons/fa';
import Services from '../components/Services';
import Doctors from '../components/Doctors';
import eyeview from "../assets/eyeview.jpg";

const About = () => {
  const stats = [
    { icon: <FaUserMd className="text-5xl"/>, number: '15+', label: 'Consultant Ophthalmologists' },
    { icon: <FaAward className="text-5xl"/>, number: '150k+', label: 'Successful Procedures' },
    { icon: <FaEye className="text-5xl"/>, number: '10 Lakh', label: 'In-Network OPD' },
    { icon: <FaRegCalendarCheck className="text-5xl"/>, number: '98%', label: 'Patient Satisfaction' },
  ];

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-r from-cyan-800 to-cyan-900 flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${eyeview})` }}></div>
        <div className="text-center text-white z-10 px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-cyan-500">
              Bhoomika Eye Institute
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-cyan-100 mb-8">
            Pioneering excellence in eye care since 1995, we combine cutting-edge technology 
            with compassionate care to deliver world-class ophthalmic solutions.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-gradient-to-br from-cyan-800 to-cyan-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-8 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
              <div className="text-cyan-300 mb-4">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-cyan-200 font-medium text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Doctors Component */}
      <Doctors />

      {/* Services Component */}
      <Services/>
    </div>
  );
};

export default About;
