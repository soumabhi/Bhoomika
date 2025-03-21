import React,{useEffect} from 'react';
import ScrollReveal from 'scrollreveal';
import { FaStethoscope, FaSyringe, FaChild, FaGlasses, FaHeartbeat, FaEye, FaUsers, FaClinicMedical } from 'react-icons/fa';
import bgimage from '../assets/man.jpeg';

const services = [
  {
    name: "Advanced Eye Diagnostics",
    description: "State-of-the-art diagnostic tools for precise vision assessment and early detection of eye conditions.",
    icon: <FaEye className="text-cyan-800 text-4xl mr-4" />,
    bgColor: "bg-green-100"
  },
  {
    name: "Cataract & IOL Surgery",
    description: "Restoring clarity with cutting-edge surgical solutions for cataracts, refractive errors, and vision correction.",
    icon: <FaSyringe className="text-cyan-800 text-4xl mr-4" />,
    bgColor: "bg-yellow-100"
  },
  {
    name: "Retina & UVEA Care",
    description: "Comprehensive care for retinal disorders and uveitis, ensuring optimal vision preservation with advanced treatment options.",
    icon: <FaStethoscope className="text-cyan-800 text-4xl mr-4" />,
    bgColor: "bg-blue-100"
  },
  {
    name: "Glaucoma Care",
    description: "Expert diagnosis and management of glaucoma to prevent vision loss and maintain eye health with cutting-edge treatments.",
    icon: <FaClinicMedical className="text-cyan-800 text-4xl mr-4" />,
    bgColor: "bg-orange-100"
  },
  {
    name: "Cornea & Dry Eye Treatment",
    description: "Specialized care for corneal diseases, dry eyes, and other ocular surface conditions.",
    icon: <FaClinicMedical className="text-cyan-800 text-4xl mr-4" />,
    bgColor: "bg-purple-100"
  },
  {
    name: "Oculoplasty",
    description: "Advanced reconstructive and cosmetic surgeries to restore and enhance eye appearance and function.",
    icon: <FaChild className="text-cyan-800 text-4xl mr-4" />,
    bgColor: "bg-red-100"
  },
  {
    name: "Community Ophthalmology",
    description: "Bringing quality eye care to communities through outreach programs and preventive measures.",
    icon: <FaUsers className="text-cyan-800 text-4xl mr-4" />,
    bgColor: "bg-teal-100"
  },
  {
    name: "Pediatric Eye Care & Facilities",
    description: "Gentle and expert eye care for children, ensuring healthy vision development from an early age.",
    icon: <FaChild className="text-cyan-800 text-4xl mr-4" />,
    bgColor: "bg-pink-100"
  },
  {
    name: "Vision Therapy & Low Vision Aids",
    description: "Personalized treatments and assistive solutions to enhance visual function and quality of life.",
    icon: <FaGlasses className="text-cyan-800 text-4xl mr-4" />,
    bgColor: "bg-indigo-100"
  },
];

const Services = () => {

  const handleMouseMoveText = (e) => {
      const text = e.currentTarget;
      const rect = text.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      text.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, #00FFFF, #04637B)`;
      text.style.backgroundClip = "text";
      text.style.webkitBackgroundClip = "text";
      text.style.color = "transparent";
  };

  const handleMouseLeaveText = (e) => {
      const text = e.currentTarget;
      text.style.backgroundImage = "linear-gradient(to right, #164E63, #00CED1, #164E63)";
      text.style.backgroundClip = "text";
      text.style.webkitBackgroundClip = "text";
      text.style.color = "transparent";
  };

  useEffect(() => {
    ScrollReveal().reveal(".reveal", {
      distance: "30px",
      origin: "bottom",
      opacity: 0,
      duration: 1000,  
      delay: 200,      
      easing: "ease-in-out",
      reset: true,   
    });
  }, []);

  return (
   <>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:pb-20 bg-white">
      <h2 
        onMouseMove={handleMouseMoveText}
        onMouseLeave={handleMouseLeaveText} 
        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[#04637B] via-cyan-500 to-cyan-900 uppercase"
      >
        Our Services
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 p-5 md:p-0">
        {services.map((service, index) => (
          <div
            key={index}
            className={`${service.bgColor} reveal p-6 sm:p-8 rounded-xl shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out h-64 flex flex-col cursor-pointer`}
          >
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="text-3xl sm:text-4xl">{service.icon}</div>
              <h3 className="text-xl sm:text-2xl font-bold text-cyan-900 ml-4 sm:ml-6">{service.name}</h3>
            </div>
            <p className="text-black text-lg leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="reveal relative w-full h-[300px] sm:h-[400px] lg:h-[500px] bg-cover bg-center" style={{ backgroundImage: `url(${bgimage})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 lg:items-start lg:text-start text-white lg:w-2/3">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
          Our <span className="text-lime-400">goal</span> is to help you achieve <br></br><span className="text-lime-400">long-term healthy vision</span><br></br> with expert care.
          </h2>
          <a href="/service">
          <button
            type="button"
            className="bg-cyan-700 hover:bg-lime-500 text-white hover:text-black font-medium rounded-lg text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 text-center transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-md hover:shadow-xl cursor-pointer"
          >
          Book an Appointment
          </button>
          </a>
        </div>
        
      </div>
    </>
  );
};

export default Services;