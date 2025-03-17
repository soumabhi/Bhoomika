import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import bgimage from '../assets/man.jpeg';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="bg-gradient-to-br from-cyan-50 to-white min-h-screen">
      {/* Hero Section with Background */}
      <div className="relative overflow-hidden bg-cyan-800 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-700 to-cyan-900 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0')] bg-cover bg-center opacity-20"></div>
        
        <div className="container mx-auto px-4 py-28 relative z-10 text-center">
          <h2 className="inline-block text-sm font-bold uppercase tracking-wider text-cyan-200 mb-4 px-3 py-1 border border-cyan-400 rounded-full">CONTACT US</h2>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">Get In Touch</h1>
          <p className="text-xl md:text-2xl text-cyan-100 mb-8 max-w-2xl mx-auto">We'd love to hear from you. Reach out to us with any questions or inquiries.</p>
        </div>
      </div>

      {/* Main Content with Cards */}
      <div className="container mx-auto px-4 -mt-16 relative z-20">
        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {/* Call Us Card */}
          <div className="flex flex-col items-center justify-center bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border-b-4 border-cyan-500">
            <div className="text-3xl text-cyan-600 mb-4 bg-cyan-100 p-4 rounded-full">
              <FaPhoneAlt />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Call Us</h3>
            <p className="text-gray-600 text-lg">+91 9777050048</p>
          </div>

          {/* Email Us Card */}
          <div className="flex flex-col items-center justify-center bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border-b-4 border-cyan-500">
            <div className="text-3xl text-cyan-600 mb-4 bg-cyan-100 p-4 rounded-full">
              <FaEnvelope />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Email Us</h3>
            <p className="text-gray-600 text-lg">info@bhoomikeinstitute.com</p>
          </div>

          {/* Location Card */}
          <a href="https://maps.app.goo.gl/R5sbRQBZgn2u5QH68" className="block">
            <div className="flex flex-col items-center justify-center bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border-b-4 border-cyan-500 h-full">
              <div className="text-3xl text-cyan-600 mb-4 bg-cyan-100 p-4 rounded-full">
                <FaMapMarkerAlt />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Location</h3>
              <p className="text-gray-600 text-lg text-center">
                Pramod Heights, Near Kesura, Bhubaneswar
              </p>
            </div>
          </a>
        </div>
        
        {/* Form Section */}
        <div className="max-w-5xl mx-auto mb-24">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Left Side: Form */}
              <div className="md:w-3/5 p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-6 text-cyan-800">Send Us a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-200 transition-all duration-200">
                      <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                        className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-gray-700"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-200 transition-all duration-200">
                      <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Your Email"
                        className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-gray-700"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-200 transition-all duration-200">
                      <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Your Phone"
                        className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-gray-700"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                    <div className="border border-gray-300 rounded-lg px-4 py-3 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-200 transition-all duration-200">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="How can we help you?"
                        rows="5"
                        className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-gray-700"
                        required
                      ></textarea>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-lg hover:from-cyan-700 hover:to-cyan-800 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Send Message
                  </button>
                </form>
              </div>
              
              {/* Right Side Image */}
              <div 
                className="md:w-2/5 bg-cover bg-center hidden md:block"
                style={{
                  backgroundImage: `linear-gradient(rgba(8, 145, 178, 0.8), rgba(8, 145, 178, 0.8)), url(${bgimage})`,
                }}
              >
                <div className="h-full flex flex-col justify-center items-start p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6">Our Office</h3>
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-4 text-cyan-300" />
                      <span>Pramod Heights, Near Kesura, Bhubaneswar</span>
                    </div>
                    <div className="flex items-center">
                      <FaPhoneAlt className="mr-4 text-cyan-300" />
                      <span>+91 9777050048</span>
                    </div>
                    <div className="flex items-center">
                      <FaEnvelope className="mr-4 text-cyan-300" />
                      <span>info@bhoomikeinstitute.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;