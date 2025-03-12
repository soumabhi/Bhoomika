import React from "react";
import man from '../assets/man.jpeg'
import img from '../assets/check.jpeg'
import device from '../assets/eyed.jpeg'

const AboutSection = () => {
  return (
    <section className="w-full min-h-full flex items-center justify-center bg-cyan-50 py-12">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
          <div className="flex flex-col gap-6">
            <img
              src={man}
              alt="Doctor Consultation"
              className="w-full h-auto rounded-xl shadow-lg"
            />
            <img
              src={img}
              alt="Medical Equipment"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>

          <div>
            <img
              src={device}
              alt="Healthcare Professional"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>

          <div className="flex justify-center flex-col p-6 lg:pl-12">
            <h2 className="text-3xl md:text-4xl font-bold text-cyan-900 leading-tight">
              Personal Care <br /> & Healthy Sight
            </h2>
            <p className="text-lg text-black mt-4 mb-6">
              We provide world-class eye care with precision, expertise, and
              compassion—ensuring clear vision and healthier eyes for life.
            </p>
            <a
              href="/services"
              className="bg-cyan-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-lime-500 transition-all duration-300 ease-in-out flex items-center gap-2 w-fit"
            >
              Services
              <i className="icofont-simple-right"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
