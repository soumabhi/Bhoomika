import React from "react";
import MeatSpecialist from "../components/MeatSpecialist";
import bgimage from '../assets/man.jpeg';

const About = () => {
  return (
    <div className="md:px-16 px-4 py-12">
      {/* Main Content */}
   <div className="flex flex-col lg:flex-row lg:gap-12 gap-6 items-center">
   <div className="mb-12 space-y-8">
        <h3 className="text-3xl font-bold text-gray-800  md:text-4xl mb-4">
          Personal Care for Your Healthy Living
        </h3>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto ">
          For your healthy living, Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
          Incidunt, quod laborum alias. Vitae dolorum, officia sit! Saepe ullam facere at, 
          consequatur incidunt, quae esse, quis ut reprehenderit dignissimos, libero delectus.
        </p>
      </div>

      {/* Image Section */}
      <div className="relative mb-12">
        <img
          src={bgimage}
          alt="Healthy living"
          className="w-full h-auto rounded-lg shadow-lg object-cover"
        />
      </div>
   </div>

      {/* Specialists Section */}
      <MeatSpecialist />
    </div>
  );
};

export default About;
