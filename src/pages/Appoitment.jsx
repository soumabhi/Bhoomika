import { useState, useEffect } from "react";
import ScrollReveal from "scrollreveal";
import Doctor from "../assets/eyeins.jpg";

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    phoneNumber: "",
    age: "",
    gender: "",
    date: "",
    time: "",
    complaints: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.patientName.trim()) newErrors.patientName = "Name is required";
    if (!/^[0-9]{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = "Invalid phone number";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/send-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientName: formData.patientName,
          phoneNumber: formData.phoneNumber,
          date: formData.date,
          time: formData.time,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Appointment booked successfully! You will receive an SMS confirmation.");
        console.log("Form Data:", formData);
      } else {
        alert(result.message || "Failed to send SMS. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    ScrollReveal().reveal(".reveal", {
      distance: "30px",
      origin: "bottom",
      opacity: 0,
      duration: 1000,  
      delay: 200,      
      easing: "ease-in-out",
      reset: true,   
    });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen p-6 relative overflow-hidden reveal">
      <div className="w-full lg:w-1/2 flex justify-center mb-6 lg:mb-0 relative z-10">
        <img src={Doctor} alt="Doctor" className="rounded-2xl shadow-lg w-80 sm:w-96 md:w-[400px] lg:w-[450px]" />
      </div>

      <div className="w-full lg:w-1/2 bg-white bg-opacity-90 p-6 sm:p-8 md:p-10 rounded-lg shadow-xl relative z-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-cyan-900 mb-3 text-center lg:text-left">Book Appointment</h2>
        <p className="text-md sm:text-lg text-gray-600 mb-6 text-center lg:text-left">Get expert eye care with a quick and easy appointment. Your vision matters!</p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
          <input
            type="text"
            name="patientName"
            placeholder="Full Name"
            onChange={handleChange}
            className="p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            required
          />
          {errors.patientName && <p className="text-red-500 text-sm">{errors.patientName}</p>}

          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={handleChange}
            className="p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            required
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}

          <input
            type="number"
            name="age"
            placeholder="Age"
            onChange={handleChange}
            className="p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            required
          />

          <select
            name="gender"
            onChange={handleChange}
            className="p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            required
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label className="col-span-1 sm:col-span-2 text-gray-700">Choose your slot date and time:</label>
          <input
            type="date"
            name="date"
            onChange={handleChange}
            className="p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            required
          />

          <input
            type="time"
            name="time"
            onChange={handleChange}
            className="p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            required
          />

          <textarea
            name="complaints"
            placeholder="Chief Complaints"
            onChange={handleChange}
            className="col-span-1 sm:col-span-2 p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            required
          ></textarea>

          <button
            type="submit"
            className="col-span-1 sm:col-span-2 bg-gradient-to-r from-[#04637B] via-cyan-600 to-[#04637B] text-white p-3 rounded-lg transition-all duration-300 ease-in-out shadow-md font-medium cursor-pointer"
          >
            Make Appointment ➜
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
