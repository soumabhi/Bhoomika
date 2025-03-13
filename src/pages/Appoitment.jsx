import { useState } from 'react';
import Doctor from "../assets/check.jpeg"

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    phoneNumber: '',
    age: '',
    gender: '',
    date: '',
    time: '',
    complaints: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex p-8 bg-gray-100 ">
      <div className="w-1/2 flex items-center justify-center">
        <img
          src={Doctor} // Replace with your image path
          alt="Doctors"
          className="rounded-lg shadow-lg"
        />
        {/* <div className="absolute text-white bg-teal-700 p-4 rounded-lg mt-32">
          <span className="text-2xl font-bold">📞 9777050048</span>
        </div> */}
      </div>
      <div className="w-1/2 p-8">
        <h2 className="text-3xl font-bold mb-4">Book appointment</h2>
        <p className="mb-6 text-gray-600">Expert eye care just a call away! Schedule your consultation today and take the first step towards clearer, healthier vision.</p>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input type="text" name="patientName" placeholder="Patient Name" onChange={handleChange} className="p-3 border rounded-lg" />
          <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} className="p-3 border rounded-lg" />
          <input type="text" name="age" placeholder="Age" onChange={handleChange} className="p-3 border rounded-lg" />
          <select name="gender" onChange={handleChange} className="p-3 border rounded-lg">
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input type="date" name="date" onChange={handleChange} className="p-3 border rounded-lg" />
          <input type="time" name="time" onChange={handleChange} className="p-3 border rounded-lg" />
          <textarea name="complaints" placeholder="Chief Complaints" onChange={handleChange} className="col-span-2 p-3 border rounded-lg"></textarea>
          <button type="submit" className="col-span-2 bg-teal-700 text-white p-3 rounded-lg hover:bg-teal-800">Make Appointment ➜</button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;