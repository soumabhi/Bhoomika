import React from 'react';
import bgimage from '../assets/man.jpeg'; // Assuming this is the default image

// Dummy data for specialists
const specialists = [
  {
    id: 1,
    name: 'Willsom Jito',
    profession: 'Internist, Emergency Physician',
    image: bgimage,
  },
  {
    id: 2,
    name: 'John Doe',
    profession: 'Surgeon, Cardiologist',
    image: bgimage,
  },
  {
    id: 3,
    name: 'Jane Smith',
    profession: 'Pediatrician, General Physician',
    image: bgimage,
  },
  {
    id: 4,
    name: 'Emily Brown',
    profession: 'Neurologist, Specialist in Stroke',
    image: bgimage,
  },
];

const MeatSpecialist = () => {
  return (
    <div className='flex flex-col items-center px-4 py-16'>
      <h2 className="text-4xl font-semibold text-center mb-6 text-gray-800">Meet Our Specialist</h2>
      <p className='text-center text-lg text-gray-600 mb-8 lg:w-2/3'>
        Today’s users expect effortless experiences. Don’t let essential people and processes stay stuck in the past. Speed it up, skip the hassles.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  gap-8  w-full">
        {specialists.map((specialist) => (
          <div
            key={specialist.id}
            className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <img
              src={specialist.image}
              alt={specialist.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-semibold text-gray-800 text-center mb-2">{specialist.name}</h3>
            <p className="text-center text-lg text-gray-500">{specialist.profession}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeatSpecialist;
