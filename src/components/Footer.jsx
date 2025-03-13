import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPhoneAlt } from 'react-icons/fa';
import bhoomika from "../assets/bhoomika.png";

const Footer = () => {
  return (
    <>
      <div className="bg-gray-50 py-8 px-6 md:px-16">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-12">

          {/* Left Section: Logo, Address, and Social Icons */}
          <div className="flex flex-col items-center md:items-start gap-6">
            <img src={bhoomika} alt="Bhoomika Logo" className="h-24 md:h-30" />
            <p className="text-md text-center text-gray-700 md:text-left font-medium md:max-w-2/3">
             <a href="https://maps.app.goo.gl/ZzsX3KUHFFWfDfqH9">Pramod Heights, Near Kesura Chowk, Puri Bypass Road, Bhubaneswar - 752101</a> 
            </p>
            <div className="flex gap-6 text-gray-700">
              <a href="#" className="transition-transform transform hover:scale-110 hover:text-cyan-600 bg-gray-200 p-2 rounded-lg">
                <FaFacebookF size={24} />
              </a>
              <a href="#" className="transition-transform transform hover:scale-110 hover:text-pink-600 bg-gray-200 p-2 rounded-lg">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="transition-transform transform hover:scale-110 hover:text-blue-500 bg-gray-200 p-2 rounded-lg">
                <FaLinkedinIn size={24} />
              </a>
            </div>
          </div>

          {/* Right Section: Department List and Contact Info */}
          <div className="flex flex-col md:flex-row gap-12">

            {/* Departments Section */}
            <div className="flex flex-col gap-4 text-gray-700">
              <h2 className="text-2xl font-semibold text-cyan-800 text-center md:text-left">Departments</h2>
              <ul className="space-y-2 md:space-y-3 text-md lg:text-lg tracking-wide font-medium text-gray-600 text-center md:text-start">
                <li className="cursor-pointer">Community Ophthalmology</li>
                <li className="cursor-pointer">IOL</li>
                <li className="cursor-pointer">Retina & UVEA</li>
                <li className="cursor-pointer">Oculoplasty</li>
                <li className="cursor-pointer">Cornea</li>
                <li className="cursor-pointer">Glaucoma</li>
              </ul>
            </div>

            {/* Get In Touch Section */}
            <div className="flex flex-col gap-4 text-gray-700">
              <h2 className="text-2xl font-semibold text-cyan-800 text-center md:text-left">Get In Touch</h2>
              <ul className="space-y-2 md:space-y-3 text-md lg:text-lg tracking-wide font-medium text-gray-600 text-center md:text-start">
                <li>Support Available 24/7</li>
                <li>
                  <a href="mailto:info@bhoomikaeyeinstitute.com" className="hover:text-cyan-800">
                    info@bhoomikaeyeinstitute.com
                  </a>
                </li>
                
                <li className="flex items-center gap-2 text-gray-700">
                  <FaPhoneAlt size={18} className="text-cyan-900" />
                  <span className="font-semibold">9777050048</span>
                  <span className="text-sm text-gray-500">Mon to Fri: 08:30 am - 06:00 pm</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="bg-gray-900 py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm md:text-base text-gray-300 font-medium">
            © Copyright Reserved to <span className="text-green-500">Bhoomika Eye Hospital Limited</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
