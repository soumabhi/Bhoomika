import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"; // Importing necessary icons
import bgimage from '../assets/man.jpeg'; // Your background image

const Contact = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can send data to an API or process it
    console.log("Form Submitted:", formData);
    // Reset the form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <>
      {/* Contact Information Cards */}
      <div className="container mx-auto px-4 md:px-16 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Call Us Card */}
          <div className="flex flex-col items-center justify-center border-2 border-gray-300 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
            <div className="text-4xl text-green-500 mb-4">
              <FaPhoneAlt />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Call Us</h3>
            <p className="text-gray-600 text-lg">+91 9777050048</p>
          </div>

          {/* Email Us Card */}
          <div className="flex flex-col items-center justify-center border-2 border-gray-300 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
            <div className="text-4xl text-green-500 mb-4">
              <FaEnvelope />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Email Us</h3>
            <p className="text-gray-600 text-lg">info@bhoomikeinstitute.com</p>
          </div>

          {/* Location Card */}
          <a href="https://maps.app.goo.gl/R5sbRQBZgn2u5QH68"><div className="flex flex-col items-center justify-center border-2 border-gray-300 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
            <div className="text-4xl text-green-500 mb-4">
              <FaMapMarkerAlt />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Location</h3>
           <p className="text-gray-600 text-lg">Pramod Heights, Near Kesura, Bhubaneswar</p>
          </div></a>
          
        </div>
      </div>

      {/* Contact Form */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Contact Us</h2>
        <p className="text-center text-gray-400 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl shadow-xl overflow-hidden border border-gray-300 border-[.2px]">
          {/* Left side: Form */}
          <div className="flex justify-center items-center bg-white bg-opacity-80 p-8">
            <form className="space-y-6 w-full max-w-md" onSubmit={handleSubmit}>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Send Us a Message</h3>
              
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Your Phone"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="4"
                required
              ></textarea>

              <button
                type="submit"
                className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all duration-300"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Right side: Background image */}
          <div
            className="bg-cover bg-center"
            style={{
              backgroundImage: `url(${bgimage})`, // Replace with your actual image URL
            }}
          >
            {/* You can add text overlay or other content if needed */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
