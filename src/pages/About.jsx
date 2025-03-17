import React from 'react';
import { FaAward, FaClinicMedical, FaEye, FaRegCalendarCheck, FaUserMd } from 'react-icons/fa';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const About = () => {
  const stats = [
    { icon: <FaUserMd className="text-4xl"/>, number: '25+', label: 'Specialist Doctors' },
    { icon: <FaAward className="text-4xl"/>, number: '150k+', label: 'Successful Procedures' },
    { icon: <FaEye className="text-4xl"/>, number: '50+', label: 'Advanced Diagnostics' },
    { icon: <FaRegCalendarCheck className="text-4xl"/>, number: '98%', label: 'Patient Satisfaction' },
  ];

  const doctors = [
    { name: "Dr. Rajesh Verma", specialty: "Cataract Surgery", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d" },
    { name: "Dr. Anjali Sharma", specialty: "Retina Specialist", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2" },
    { name: "Dr. Amit Mehta", specialty: "Glaucoma Expert", image: "https://images.unsplash.com/photo-1622253692010-333f2da60319" }
  ];

  const partners = [
    "https://www.freeiconspng.com/uploads/eye-care-logo-png-5.png",
    "https://www.freeiconspng.com/uploads/eye-logo-png-5.png",
    "https://www.freeiconspng.com/uploads/eye-care-logo-design-15.png",
    "https://www.freeiconspng.com/uploads/eye-logo-png-3.png"
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }
      }
    ]
  };

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-r from-cyan-800 to-cyan-900 flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584438784894-089d6a62b8fa')] bg-cover bg-center opacity-20"></div>
        <div className="text-center text-white z-10 px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-cyan-500">
              Bhoomika Eye Institute
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-cyan-100 mb-8">
            Pioneering excellence in eye care since 1995, we combine cutting-edge technology 
            with compassionate care to deliver world-class ophthalmic solutions.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-cyan-800 to-cyan-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="p-8 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
            >
              <div className="text-cyan-300 mb-4">{stat.icon}</div>
              <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-cyan-200 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-800 text-center mb-12">
            Our Expert Ophthalmologists
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{doctor.name}</h3>
                  <p className="text-cyan-800 font-medium">{doctor.specialty}</p>
                  <div className="mt-4">
                    <button className="text-cyan-800 hover:text-cyan-900 font-semibold flex items-center justify-center w-full">
                      <span>View Profile</span>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-800 text-center mb-12">
            Trusted Partnerships
          </h2>
          <Slider {...settings} className="px-8">
            {partners.map((logo, index) => (
              <div key={index} className="px-4 focus:outline-none">
                <div className="bg-gray-50 p-6 rounded-lg h-32 flex items-center justify-center hover:bg-cyan-50 transition-colors">
                  <img 
                    src={logo} 
                    alt={`Partner ${index + 1}`} 
                    className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </div>
  );
};

export default About;