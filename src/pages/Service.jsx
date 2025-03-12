import React from 'react';
import { FaStethoscope, FaSyringe, FaChild, FaGlasses, FaHeartbeat, FaEye, FaUsers, FaClinicMedical } from 'react-icons/fa'; // Importing different icons
import bgimage from '../assets/man.jpeg'
// Dummy data for services
const services = [
  {
    name: "Advanced Eye Diagnostics",
    description: "State-of-the-art diagnostic tools for precise vision assessment and early detection of eye conditions.",
    icon: <FaEye className="text-green-400 text-4xl mr-4" />, // Larger green icon with margin-right for spacing
  },
  {
    name: "Cataract & IOL Surgery",
    description: "Restoring clarity with cutting-edge surgical solutions for cataracts, refractive errors, and vision correction.",
    icon: <FaSyringe className="text-green-400 text-4xl mr-4" />, // Larger green icon
  },
  {
    name: "Retina & Glaucoma Care",
    description: "Expert management of retinal disorders and glaucoma to preserve and protect your vision.",
    icon: <FaStethoscope className="text-green-400 text-4xl mr-4" />, // Larger green icon
  },
  {
    name: "Cornea & Dry Eye Treatment",
    description: "Specialized care for corneal diseases, dry eyes, and other ocular surface conditions.",
    icon: <FaClinicMedical className="text-green-400 text-4xl mr-4" />, // Larger green icon
  },
  {
    name: "Oculoplasty",
    description: "Gentle and expert eye care for children, ensuring healthy vision development from an early age.",
    icon: <FaChild className="text-green-400 text-4xl mr-4" />, // Larger green icon
  },
  {
    name: "UVEA",
    description: "Gentle and expert eye care for children, ensuring healthy vision development from an early age.",
    icon: <FaChild className="text-green-400 text-4xl mr-4" />, // Larger green icon
  },
  {
    name: "Community Ophthalmology",
    description: "Gentle and expert eye care for children, ensuring healthy vision development from an early age.",
    icon: <FaUsers className="text-green-400 text-4xl mr-4" />, // Larger green icon
  },
  {
    name: "Pediatric Eye Care & Facilities",
    description: "Gentle and expert eye care for children, ensuring healthy vision development from an early age.",
    icon: <FaChild className="text-green-400 text-4xl mr-4" />, // Larger green icon
  },
  {
    name: "Vision Therapy & Low Vision Aids",
    description: "Personalized treatments and assistive solutions to enhance visual function and quality of life.",
    icon: <FaGlasses className="text-green-400 text-4xl mr-4" />, // Larger green icon
  },
];

const Service = () => {
  return (
   <>
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-semibold text-center mb-12 text-gray-800">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-xl shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
          >
            {/* Header: Icon and Title */}
            <div className="flex items-center mb-6">
              <div className="text-4xl">{service.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-900 ml-6">{service.name}</h3>
            </div>
            {/* Description */}
            <p className="text-gray-600 text-base">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="relative w-full h-[500px] bg-cover bg-center mt-4 lg:mt-16" style={{ backgroundImage: `url(${bgimage})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center md:items-start text-center px-2 md:text-start text-white md:px-16 lg:w-2/3">
          <h2 className="lg:text-6xl md:text-5xl text-2xl font-bold mb-4">
            We are pleased to offer you the <span className="text-green-400">chance to have healthy</span> vision.
          </h2>
          <button
            type="button"
            className="text-gray-900 bg-[#F7BE38] hover:bg-cyan-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-md hover:shadow-xl cursor-pointer"
          >
            Book an Appointment
          </button>
        </div>
      </div>
    </>
  );
};

export default Service;
