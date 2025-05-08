import { useState, useEffect, useRef } from "react";
import eyeview from "../assets/eyeview.jpg";
import "tailwindcss";

export default function Optometrist() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [resumeFileName, setResumeFileName] = useState("");
    const [selectedRole, setSelectedRole] = useState("optometrist");
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        gender: "",
        dob: "",
        degree: "",
        passingYear: "",
        UniversityName: "",
        resume: null,
        opdSkills: {},
        previousWorkExperiences: "",
    });

    const optometristSkills = {
        "Vision & Refraction": false,
        Retinoscope: false,
        "Slit Lamp Examination & Treated The Patient": false,
        "DO(Direct Ophthalmoscope)": false,
        "IO(Indirect Ophthalmoscope)": false,
        OCT: false,
        "B-Scan": false,
        "A-Scan": false,
        "Fundus Photo": false,
        "HFA/HVF": false,
        "Patient Counselling": false,
        "Peribulber Block Technique": false,
        "CAMP Activities": false,
    };

    const docaSkills = {
        Vision: false,
        NCT: false,
        Schiotz: false,
        BP: false,
        LPI: false,
        AR: false,
        "Dr Assist in OPD": false,
        "Autoclaves for surgical instruments": false,
        "OT Cleaning Protocol": false,
        "Surgery Assist in Cataract,Retina,Occuloplasty": false,
        "Ward management": false,
        "Peribulber Block Technique": false,
        "Patient Counselling": false,
        "Cataract Screening": false,
    };

    // Initialize opdSkills based on selected role
    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            opdSkills:
                selectedRole === "optometrist"
                    ? { ...optometristSkills }
                    : { ...docaSkills },
        }));
    }, [selectedRole]);

    // Add useEffect to automatically reset form after 5 seconds
    useEffect(() => {
        let timer;
        if (submitted) {
            timer = setTimeout(() => {
                setSubmitted(false);
                // Reset form data if needed
                setFormData({
                    fullName: "",
                    email: "",
                    gender: "",
                    dob: "",
                    degree: "",
                    passingYear: "",
                    UniversityName: "",
                    resume: null,
                    opdSkills:
                        selectedRole === "optometrist"
                            ? { ...optometristSkills }
                            : { ...docaSkills },
                    previousWorkExperiences: "",
                });
                setResumeFileName("");
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            }, 5000); // 5 seconds
        }

        // Clean up the timer when component unmounts or submitted state changes
        return () => clearTimeout(timer);
    }, [submitted, selectedRole]);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === "file") {
            if (files && files[0]) {
                const file = files[0];
                // Check if file is a PDF
                if (!file.name.toLowerCase().endsWith(".pdf")) {
                    setError("Please upload a PDF file only");
                    e.target.value = "";
                    return;
                }

                setFormData((prev) => ({
                    ...prev,
                    resume: file,
                }));
                setResumeFileName(file.name);
                setError(null);
            }
            return;
        }

        if (name.includes(".")) {
            const nameParts = name.split(".");

            if (nameParts.length === 2) {
                const [parent, child] = nameParts;
                setFormData((prev) => ({
                    ...prev,
                    [parent]: {
                        ...prev[parent],
                        [child]:
                            type === "checkbox"
                                ? checked
                                : type === "number"
                                    ? parseInt(value, 10) || 0
                                    : value,
                    },
                }));
            } else if (nameParts.length === 3) {
                const [parent, middle, child] = nameParts;
                setFormData((prev) => ({
                    ...prev,
                    [parent]: {
                        ...prev[parent],
                        [middle]: {
                            ...prev[parent][middle],
                            [child]: type === "number" ? parseInt(value, 10) || 0 : value,
                        },
                    },
                }));
            }
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]:
                    type === "checkbox"
                        ? checked
                        : type === "number"
                            ? parseInt(value, 10) || 0
                            : value,
            }));
        }
    };

    const handleRoleChange = (role) => {
        setSelectedRole(role);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate resume is uploaded
        if (!formData.resume) {
            setError("Resume is required. Please upload your resume in PDF format.");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            // Create a FormData object for file upload
            const formDataObj = new FormData();

            // Append all form data fields
            formDataObj.append("fullName", formData.fullName);
            formDataObj.append("email", formData.email);
            formDataObj.append("gender", formData.gender);
            formDataObj.append("dob", formData.dob);
            formDataObj.append("degree", formData.degree);
            formDataObj.append("passingYear", formData.passingYear);
            formDataObj.append(
                "UniversityName",
                formData.UniversityName
            );
            formDataObj.append("resume", formData.resume);
            formDataObj.append("role", selectedRole);

            // Append nested objects as JSON strings
            formDataObj.append("opdSkills", JSON.stringify(formData.opdSkills));

            formDataObj.append(
                "previousWorkExperiences",
                formData.previousWorkExperiences
            );
            const response = await fetch("http://localhost:443/api/optforms/submit", {
                method: "POST",
                body: formDataObj,
            });

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Form submission failed");
                }
            } else {
                const textResponse = await response.text();
                if (!response.ok) {
                    throw new Error("Form submission failed: Server did not return JSON");
                }
            }

            setSubmitted(true);
        } catch (error) {
            console.error("Form submission error:", error);
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center" style={{ backgroundImage: `url(${eyeview})` }}>
                <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
                    <div className="flex justify-center mb-6">
                        <div className="bg-green-100 rounded-full p-3">
                            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Details Submitted!</h2>
                    <p className="text-center text-gray-600 mb-6">Thank you Dr. {formData.fullName}. Your application has been received.</p>

                    <div className="bg-blue-50 rounded-lg p-4 mb-6">
                        <p className="text-sm text-blue-800">
                            Our Clinical Talent Management team will get back to you shortly at {formData.email}.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
        }}>
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Header with eye-catching gradient and illustration */}
                <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-8 text-white relative overflow-hidden">
                    <div className="relative z-10 text-center">
                        <h1 className="text-3xl font-bold mb-2 tracking-tight">
                            DOCA/COA/COSA
                        </h1>
                        <p className="text-blue-100 text-lg text-center">
                            Join our network of dedicated eye care professionals. We're
                            looking for talented individuals like you.
                        </p>

                        <div className="mt-6 inline-flex items-center px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm backdrop-blur-sm">
                            <span className="animate-pulse mr-2 h-3 w-3 bg-green-400 rounded-full"></span>
                            <span className="font-medium text-black">
                                Now hiring{" "}
                                {selectedRole === "optometrist" ? "Optometrists" : "DOCA/OCA"}
                            </span>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="p-8">
                    {error && (
                        <div className="mb-8 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md animate-fade-in-down">
                            <div className="flex items-center">
                                <svg
                                    className="w-6 h-6 mr-3 text-red-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                </svg>
                                <p className="font-medium">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Form Sections with Card-like Design */}
                    <div className="space-y-10">
                        {/* Personal Information */}
                        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center pb-3">
                                <svg
                                    className="w-6 h-6 mr-3 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    ></path>
                                </svg>
                                Personal Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg
                                                className="h-5 w-5 text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                ></path>
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            placeholder="Dr. Shyam Sundar"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg
                                                className="h-5 w-5 text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                ></path>
                                            </svg>
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            placeholder="doctor@example.com"
                                        />
                                    </div>
                                </div>

                                {/* Gender */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Gender <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="" disabled>
                                            Select gender
                                        </option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                        <option value="preferNotToSay">Prefer not to say</option>
                                    </select>
                                </div>

                                {/* Date of Birth */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Date of Birth <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Role Selection Dropdown */}
                        <div className="mb-10 flex flex-col items-left justify-left text-left bg-white rounded-xl shadow-md p-6 border border-gray-100">
                            <label className="text-lg font-semibold text-gray-800 mb-3 ">
                                Select Your Role <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={selectedRole}
                                onChange={(e) => handleRoleChange(e.target.value)}
                                className="w-120 p-3 border-2 border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
                            >
                                <option value="" disabled>
                                    Select a role
                                </option>
                                <option value="optometrist">
                                    Optometrist - Eye examination and vision care specialist
                                </option>
                                <option value="doca">
                                    DOCA/OCA - Diploma Ophthalmic Clinical Assistant
                                </option>
                            </select>
                        </div>

                        {/* Resume Upload Section with modern dropzone */}
                        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center  pb-3">
                                <svg
                                    className="w-6 h-6 mr-3 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    ></path>
                                </svg>
                                Resume
                            </h2>
                            <div className="bg-blue-50 p-8 rounded-xl border-2 border-dashed border-blue-300 transition-all hover:bg-blue-100 hover:border-blue-400">
                                <div className="text-center">
                                    <div className="mb-4">
                                        <label
                                            htmlFor="resume-upload"
                                            className="text-lg font-medium text-gray-700"
                                        >
                                            <span className="text-blue-600">Upload your resume</span>{" "}
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <p className="text-sm text-gray-500 mt-1">
                                            PDF only (Max 2MB)
                                        </p>
                                    </div>
                                    <input
                                        id="resume-upload"
                                        name="resume"
                                        type="file"
                                        ref={fileInputRef}
                                        accept=".pdf"
                                        onChange={handleChange}
                                        className="sr-only"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            document.getElementById("resume-upload").click()
                                        }
                                        className="inline-flex items-center px-6 py-3 border border-blue-400 rounded-lg shadow-sm text-base font-medium text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                    >
                                        <svg
                                            className="mr-2 h-5 w-5 text-blue-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                            ></path>
                                        </svg>
                                        Browse Files
                                    </button>
                                </div>
                                {resumeFileName && (
                                    <div className="mt-5 flex items-center justify-center text-sm text-gray-600 bg-white p-3 rounded-lg border border-green-200 shadow-sm">
                                        <svg
                                            className="w-5 h-5 mr-2 text-green-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            ></path>
                                        </svg>
                                        <span className="font-medium text-green-600">
                                            File selected:
                                        </span>
                                        <span className="ml-1">{resumeFileName}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Qualifications */}
                        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center  pb-3">
                                <svg
                                    className="w-6 h-6 mr-3 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    ></path>
                                </svg>
                                Qualifications
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Degree <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="degree"
                                        value={formData.degree}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors"
                                        placeholder="Enter your degree (e.g., MD, MS, DNB)"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Passing Year <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="passingYear"
                                        value={formData.passingYear}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Passing Year"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        University Name<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="UniversityName"
                                        value={formData.UniversityName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Name of the University"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* OPD Skills */}
                        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center pb-3">
                                <svg
                                    className="w-6 h-6 mr-3 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    ></path>
                                </svg>
                                OPD Skills
                            </h2>
                            <p className="text-gray-600 mb-4">
                                Please select the skills you are proficient in:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.keys(formData.opdSkills).map((skill) => (
                                    <div key={skill} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`skill-${skill}`}
                                            name={`opdSkills.${skill}`}
                                            checked={formData.opdSkills[skill]}
                                            onChange={handleChange}
                                            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                                        />
                                        <label
                                            htmlFor={`skill-${skill}`}
                                            className="ml-3 text-sm text-gray-700"
                                        >
                                            {skill}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Previous Work Experience */}
                        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center pb-3">
                                <svg
                                    className="w-6 h-6 mr-3 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    ></path>
                                </svg>
                                Previous Work Experience
                            </h2>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tell us about your previous work experience
                                </label>
                                <textarea
                                    name="previousWorkExperiences"
                                    value={formData.previousWorkExperiences}
                                    onChange={handleChange}
                                    rows="5"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Briefly describe your work experience, including hospital names, roles, and years of service..."
                                ></textarea>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center mt-10">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`cursor-pointer inline-flex items-center px-8 py-4 border border-transparent rounded-lg shadow-lg text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                                    }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Submit Application
                                        <svg
                                            className="ml-2 -mr-1 w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                            ></path>
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}