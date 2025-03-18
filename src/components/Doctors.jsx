import React from "react";

const doctors = [
  { name: "Dr. Rajesh Verma", specialty: "Cataract Surgery", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d" },
  { name: "Dr. Anjali Sharma", specialty: "Retina Specialist", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2" },
  { name: "Dr. Amit Mehta", specialty: "Glaucoma Expert", image: "https://images.unsplash.com/photo-1622253692010-333f2da60319" }
];

const Doctors = () => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-800 text-center mb-12">
          Our Expert Ophthalmologists
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:scale-105"
            >
              <img 
                src={doctor.image} 
                alt={doctor.name} 
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{doctor.name}</h3>
                <p className="text-cyan-700 font-medium">{doctor.specialty}</p>
                <div className="mt-4">
                  <button className="text-white bg-cyan-600 hover:bg-cyan-700 py-2 px-4 rounded-lg font-semibold flex items-center justify-center w-full transition-all duration-300">
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
  );
};

export default Doctors;
