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
  });

  const [errors, setErrors] = useState({});

  // Get the current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear the specific error when the user starts correcting the input
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));

    // Validate numeric fields (age and phone number)
    if (name === "age" || name === "phoneNumber") {
      if (!/^\d*$/.test(value)) return; // Only allow numeric values
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};

    // Validate Name
    if (!/^[a-zA-Z\s]+$/.test(formData.patientName)) {
      newErrors.patientName = "Name must only contain letters";
    } else if (formData.patientName.trim().length < 1) {
      newErrors.patientName = "Name must be at least 1 character";
    } else if (formData.patientName.trim().length > 20) {
      newErrors.patientName = "Name cannot exceed 20 characters";
    }

    // Validate Phone Number
    if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits";
    }

    // Validate Age
    if (formData.age < 1 || formData.age > 100) {
      newErrors.age = "Age must be between 1 and 100";
    }

    // Validate Time
    const selectedDate = new Date(formData.date);
    const selectedDay = selectedDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const selectedTime = formData.time;

    if (selectedDay === 0 && (selectedTime < "09:00" || selectedTime > "17:00")) {
      newErrors.time = "Working hours on Sunday: 09:00 AM - 05:00 PM";
    } else if (selectedDay !== 0 && (selectedTime < "09:00" || selectedTime > "20:00")) {
      newErrors.time = "Working hours Mon-Sat: 09:00 AM - 08:00 PM";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      // Prepare the data for Msg91 API
      const data = JSON.stringify({
        recipients: [
          {
            to: [
              { email: "shibammohanty8658@gmail.com", name: "Admin 1" }, // First admin email
              { email: "shibammohanty8458@gmail.com", name: "Admin 2" }, // Second admin email
            ],
          },
        ],
        from: {
          email: "BhoomikaEyeInstitute@bhoomikaeyeinstitute.com", // Replace with your domain
        },
        domain: "bhoomikaeyeinstitute.com", // Replace with your domain
        template_id: "bhoomika_eye_institute_appointment", // Replace with your Msg91 template ID
      });

      console.log("Sending data to Msg91 API:", data); // Log the data being sent

      // Send the email using Msg91 API
      const emailResponse = await fetch("https://control.msg91.com/api/v5/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authkey: "443719A3v7Lg0jpfR067d7af34P1", // Replace with your Msg91 authkey
        },
        body: data,
      });

      const emailResult = await emailResponse.json();
      console.log("Msg91 Email API Response:", emailResult); // Log the API response

      // Prepare the data for Msg91 SMS API
      const smsData = JSON.stringify({
        sender: "BHOOEY", // Replace with your sender ID
        route: "4", // Transactional route
        country: "91", // Country code
        sms: [
          {
            message: `Appointment booked for ${formData.patientName} on ${formData.date} at ${formData.time}.`, // SMS content
            to: [formData.phoneNumber], // Patient's phone number
          },
        ],
      });

      console.log("Sending data to Msg91 SMS API:", smsData); // Log the data being sent

      // Send the SMS using Msg91 API
      const smsResponse = await fetch("https://api.msg91.com/api/v2/sendsms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authkey: "443719A3v7Lg0jpfR067d7af34P1", // Replace with your Msg91 authkey
        },
        body: smsData,
      });

      const smsResult = await smsResponse.json();
      console.log("Msg91 SMS API Response:", smsResult); // Log the API response

      if (emailResponse.ok && smsResponse.ok) {
        alert("Appointment booked successfully! You will receive an SMS confirmation.");
      } else {
        alert(emailResult.message || smsResult.message || "Failed to send confirmation. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error); // Log the error
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
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen p-6 relative overflow-hidden reveal bg-cyan-50">
      <div className="w-full lg:w-1/2 flex justify-center mb-6 lg:mb-0 relative z-10">
        <img src={Doctor} alt="Doctor" className="rounded-2xl shadow-lg w-80 sm:w-96 md:w-[400px] lg:w-[450px]" />
      </div>

      <div className="w-full lg:w-1/2 bg-white bg-opacity-90 p-6 sm:p-8 md:p-10 rounded-lg shadow-xl relative z-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-cyan-900 mb-3 text-center lg:text-left">Book Appointment</h2>
        <p className="text-md sm:text-lg text-gray-600 mb-6 text-center lg:text-left">Get expert eye care with a quick and easy appointment. Your vision matters!</p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
          {/* Name Input */}
          <input
            type="text"
            name="patientName"
            placeholder="Full Name (Max 20 characters)"
            onChange={handleChange}
            maxLength={20} // Restrict input to a maximum of 20 characters
            className="p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            required
          />
          {errors.patientName && <p className="text-red-500 text-sm">{errors.patientName}</p>}

          {/* Phone Number Input */}
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number (10 digits)"
            onChange={(e) => {
              const { value } = e.target;
              if (/^\d*$/.test(value)) {
                handleChange(e);
              } else {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  phoneNumber: "Only numeric values are allowed",
                }));
              }
            }}
            className="p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            required
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}

          {/* Age Input */}
          <input
            type="number"
            name="age"
            placeholder="Age (1-100)"
            onChange={handleChange}
            min={1} // Minimum age
            max={100} // Maximum age
            className="p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            onWheel={(e) => e.target.blur()} // Disable scrolling
            required
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}

          {/* Gender Select */}
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

          {/* Date Input */}
          <label className="col-span-1 sm:col-span-2 text-gray-700">Choose your slot date and time:</label>
          <input
            type="date"
            name="date"
            onChange={handleChange}
            className="p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none w-full"
            placeholder="Choose your date"
            min={getCurrentDate()}
            required
          />

          {/* Time Input */}
          <input
            type="time"
            name="time"
            onChange={handleChange}
            className="p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none w-full"
            placeholder="Choose your time"
            required
          />
          {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}

          {/* Submit Button */}
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