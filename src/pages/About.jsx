import React from 'react'
import bgimage from '../assets/man.jpeg'

const About = () => {
  return (
   <>
     <div className="relative w-full h-[500px] bg-cover bg-center mt-0 lg:mt-0" style={{ backgroundImage: `url(${bgimage})` }}>
  <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
  <div className="absolute inset-0 flex flex-col justify-center items-center md:items-start text-center px-2 md:text-start text-white md:px-16 lg:w-2/3">
    <h2 className="lg:text-6xl md:text-5xl text-2xl font-bold mb-4">
      We are pleased to offer you the <span className="text-green-400">chance to have healthy</span> vision.
    </h2>
    <button
      type="button"
      className="text-gray-900 bg-[#F7BE38] hover:bg-lime-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-md hover:shadow-xl cursor-pointer"
    >
      Book an Appointment
    </button>
  </div>
</div>
   </>
  )
}

export default About
