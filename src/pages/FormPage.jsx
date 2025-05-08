import { useState, useEffect, useRef } from 'react';
import eyeview from "../assets/eyeview.jpg";

export default function MedicalProfessionalForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [resumeFileName, setResumeFileName] = useState('');
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        pgDegree: '',
        registrationNumber: '',
        registeredWithStateCouncil: '',
        fellowship: '',
        resume: null,
        opdSkills: {
            comprehensive: false,
            medicalRetina: false,
            glaucoma: false,
            paediatric: false,
            cornea: false,
            oculoplasty: false
        },
        surgicalSkills: {
            cataract: {
                sics: 0,
                phaco: 0
            },
            vitreoretina: 0,
            glaucoma: 0,
            paediatric: 0,
            occuloplasty: 0,
            cornea: 0,
            refractive: 0
        },
        previousWorkExperiences: '',
        numPublications: 0,
        numPresentations: 0
    });

    // Add useEffect to automatically reset form after 5 seconds
    useEffect(() => {
        let timer;
        if (submitted) {
            timer = setTimeout(() => {
                setSubmitted(false);
                // Reset form data if needed
                setFormData({
                    fullName: '',
                    email: '',
                    pgDegree: '',
                    registrationNumber: '',
                    registeredWithStateCouncil: '',
                    fellowship: '',
                    resume: null,
                    opdSkills: {
                        comprehensive: false,
                        medicalRetina: false,
                        glaucoma: false,
                        paediatric: false,
                        cornea: false,
                        oculoplasty: false,
                    },
                    surgicalSkills: {
                        cataract: {
                            sics: 0,
                            phaco: 0
                        },
                        vitreoretina: 0,
                        glaucoma: 0,
                        paediatric: 0,
                        occuloplasty: 0,
                        cornea: 0,
                        refractive: 0
                    },
                    previousWorkExperiences: '',
                    numPublications: 0,
                    numPresentations: 0
                });
                setResumeFileName('');
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }, 5000); // 5 seconds
        }

        // Clean up the timer when component unmounts or submitted state changes
        return () => clearTimeout(timer);
    }, [submitted]);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === 'file') {
            if (files && files[0]) {
                const file = files[0];
                // Check if file is a PDF
                if (!file.name.toLowerCase().endsWith('.pdf')) {
                    setError('Please upload a PDF file only');
                    e.target.value = '';
                    return;
                }

                setFormData(prev => ({
                    ...prev,
                    resume: file
                }));
                setResumeFileName(file.name);
                setError(null);
            }
            return;
        }

        if (name.includes('.')) {
            const nameParts = name.split('.');

            if (nameParts.length === 2) {
                const [parent, child] = nameParts;
                setFormData(prev => ({
                    ...prev,
                    [parent]: {
                        ...prev[parent],
                        [child]: type === 'checkbox' ? checked :
                            type === 'number' ? parseInt(value, 10) || 0 : value
                    }
                }));
            } else if (nameParts.length === 3) {
                const [parent, middle, child] = nameParts;
                setFormData(prev => ({
                    ...prev,
                    [parent]: {
                        ...prev[parent],
                        [middle]: {
                            ...prev[parent][middle],
                            [child]: type === 'number' ? parseInt(value, 10) || 0 : value
                        }
                    }
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked :
                    type === 'number' ? parseInt(value, 10) || 0 : value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate resume is uploaded
        if (!formData.resume) {
            setError('Resume is required. Please upload your resume in PDF format.');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            // Create a FormData object for file upload
            const formDataObj = new FormData();

            // Append all form data fields
            formDataObj.append('fullName', formData.fullName);
            formDataObj.append('email', formData.email);
            formDataObj.append('pgDegree', formData.pgDegree);
            formDataObj.append('registrationNumber', formData.registrationNumber);
            formDataObj.append('registeredWithStateCouncil', formData.registeredWithStateCouncil);
            formDataObj.append('fellowship', formData.fellowship);
            formDataObj.append('resume', formData.resume);

            // Append nested objects as JSON strings
            formDataObj.append('opdSkills', JSON.stringify(formData.opdSkills));
            formDataObj.append('surgicalSkills', JSON.stringify(formData.surgicalSkills));

            formDataObj.append('previousWorkExperiences', formData.previousWorkExperiences);
            formDataObj.append('numPublications', formData.numPublications);
            formDataObj.append('numPresentations', formData.numPresentations);

            const response = await fetch('http://localhost:443/api/forms/submit', {
                method: 'POST',
                body: formDataObj,
            });

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Form submission failed');
                }
            } else {
                const textResponse = await response.text();
                if (!response.ok) {
                    throw new Error('Form submission failed: Server did not return JSON');
                }
            }

            setSubmitted(true);
        } catch (error) {
            console.error('Form submission error:', error);
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
                            Our Clinical Talent Management team Will get Back to You Shortly at {formData.email}.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-4">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 p-6 text-white flex flex-col items-center justify-center gap-1">
                    <h1 className="text-2xl font-bold">Medical Professional Registration</h1>
                    <p className="text-blue-100">Complete the form below to join our healthcare network</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                            <p className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                Error: {error}
                            </p>
                        </div>
                    )}

                    {/* Personal Information */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            Personal Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Dr. Shyam Sundar"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="doctor@example.com"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Resume Upload Section */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            Resume
                        </h2>
                        <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
                            <div className="text-center">
                                {/* <svg className="mx-auto h-11 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                </svg> */}
                                <div className="mt-2">
                                    <label htmlFor="resume-upload" className="text-sm font-medium text-gray-700">
                                        <span className="text-indigo-600">Upload your resume</span> <span className="text-red-500">*</span>
                                        <p className="text-xs text-gray-500">PDF only (Max 2MB)</p>
                                    </label>
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
                                </div>
                                <div className="mt-3">
                                    <button
                                        type="button"
                                        onClick={() => document.getElementById('resume-upload').click()}
                                        className="inline-flex items-center px-4 py-2 border border-indigo-300 rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        <svg className="-ml-1 mr-2 h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                                        </svg>
                                        Select File
                                    </button>
                                </div>
                                {resumeFileName && (
                                    <div className="mt-3 text-sm text-gray-600 bg-blue-50 p-2 rounded inline-block">
                                        <span className="font-medium">File selected:</span> {resumeFileName}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Qualifications - Changed to horizontal layout for 3 fields */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                            </svg>
                            Professional Qualifications
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">PG Degree <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="pgDegree"
                                    value={formData.pgDegree}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="MD, MS, DNB, etc."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="registrationNumber"
                                    value={formData.registrationNumber}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Registration Number"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Registered With State Council <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="registeredWithStateCouncil"
                                    value={formData.registeredWithStateCouncil}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="State Medical Council"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fellowship (if any)</label>
                            <input
                                type="text"
                                name="fellowship"
                                value={formData.fellowship}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Specify your fellowship details"
                            />
                        </div>
                    </div>

                    {/* OPD Skills */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                            </svg>
                            OPD Skills
                        </h2>
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="opdComprehensive"
                                        name="opdSkills.comprehensive"
                                        checked={formData.opdSkills.comprehensive}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="opdComprehensive" className="ml-2 text-sm text-gray-700">Comprehensive</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="opdMedicalRetina"
                                        name="opdSkills.medicalRetina"
                                        checked={formData.opdSkills.medicalRetina}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="opdMedicalRetina" className="ml-2 text-sm text-gray-700">Medical Retina</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="opdGlaucoma"
                                        name="opdSkills.glaucoma"
                                        checked={formData.opdSkills.glaucoma}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="opdGlaucoma" className="ml-2 text-sm text-gray-700">Glaucoma</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="opdPaediatric"
                                        name="opdSkills.paediatric"
                                        checked={formData.opdSkills.paediatric}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="opdPaediatric" className="ml-2 text-sm text-gray-700">Paediatric</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="opdCornea"
                                        name="opdSkills.cornea"
                                        checked={formData.opdSkills.cornea}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="opdCornea" className="ml-2 text-sm text-gray-700">Cornea</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="opdOculoplasty"
                                        name="opdSkills.oculoplasty"
                                        checked={formData.opdSkills.oculoplasty}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="opdOculoplasty" className="ml-2 text-sm text-gray-700">Oculoplasty</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Surgical Skills - Modified layout for smaller screens with label/input pairs */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                            </svg>
                            Surgical Skills (Number of Cases)
                        </h2>

                        <div className="rounded-lg bg-blue-50 p-4">

                            {/* Cataract - Top row of surgical skills */}
                            <div className="mb-4">
                                <div className="grid lg:grid-cols-2 gap-4">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium text-gray-700">Cataract SICS Cases</label>
                                        <input
                                            type="number"
                                            name="surgicalSkills.cataract.sics"
                                            value={formData.surgicalSkills.cataract.sics}
                                            onChange={handleChange}
                                            min="0"
                                            className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium text-gray-700">Cataract Phaco Cases</label>
                                        <input
                                            type="number"
                                            name="surgicalSkills.cataract.phaco"
                                            value={formData.surgicalSkills.cataract.phaco}
                                            onChange={handleChange}
                                            min="0"
                                            className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Other Surgical Skills - Two rows with 2 items each */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-gray-700">Vitreoretina Cases</label>
                                    <input
                                        type="number"
                                        name="surgicalSkills.vitreoretina"
                                        value={formData.surgicalSkills.vitreoretina}
                                        onChange={handleChange}
                                        min="0"
                                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-gray-700">Glaucoma Cases</label>
                                    <input
                                        type="number"
                                        name="surgicalSkills.glaucoma"
                                        value={formData.surgicalSkills.glaucoma}
                                        onChange={handleChange}
                                        min="0"
                                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-gray-700">Paediatric Cases</label>
                                    <input
                                        type="number"
                                        name="surgicalSkills.paediatric"
                                        value={formData.surgicalSkills.paediatric}
                                        onChange={handleChange}
                                        min="0"
                                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-gray-700">Oculoplasty Cases</label>
                                    <input
                                        type="number"
                                        name="surgicalSkills.occuloplasty"
                                        value={formData.surgicalSkills.occuloplasty}
                                        onChange={handleChange}
                                        min="0"
                                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-gray-700">Cornea Cases</label>
                                    <input
                                        type="number"
                                        name="surgicalSkills.cornea"
                                        value={formData.surgicalSkills.cornea}
                                        onChange={handleChange}
                                        min="0"
                                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-gray-700">Refractive Cases</label>
                                    <input
                                        type="number"
                                        name="surgicalSkills.refractive"
                                        value={formData.surgicalSkills.refractive}
                                        onChange={handleChange}
                                        min="0"
                                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Previous Work Experience */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            Previous Work Experience
                        </h2>
                        <div>
                            <textarea
                                name="previousWorkExperiences"
                                value={formData.previousWorkExperiences}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Describe your previous work experiences and roles"
                            ></textarea>
                        </div>
                    </div>

                    {/* Research Publications & Presentations */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                            </svg>
                            Research & Presentations
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Publications</label>
                                <input
                                    type="number"
                                    name="numPublications"
                                    value={formData.numPublications}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Presentations</label>
                                <input
                                    type="number"
                                    name="numPresentations"
                                    value={formData.numPresentations}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`cursor-pointer px-8 py-3 rounded-lg shadow-lg text-white font-semibold text-lg transition duration-200 ${isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transform hover:-translate-y-1'
                                }`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </div>
                            ) : (
                                'Submit Application'
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Info Footer */}
            {/* <div className="max-w-4xl mx-auto mt-6 text-center text-gray-600 text-sm">
                <p>Thank you for your interest in joining our medical professional network.</p>
                <p>For any queries, please contact our recruitment team at <span className="text-indigo-600">recruitment@eyeclinic.com</span></p>
            </div> */}
        </div>
    );
}