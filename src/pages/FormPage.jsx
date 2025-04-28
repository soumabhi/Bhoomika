import { useState, useEffect } from 'react';
import eyeview from "../assets/eyeview.jpg";

export default function MedicalProfessionalForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        pgDegree: '',
        registrationNumber: '',
        registeredWithStateCouncil: '',
        fellowship: '',
        opdSkills: {
            comprehensive: false,
            medicalRetina: false,
            glaucoma: false,
            paediatric: false
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
                    opdSkills: {
                        comprehensive: false,
                        medicalRetina: false,
                        glaucoma: false,
                        paediatric: false
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
            }, 5000); // 5 seconds
        }

        // Clean up the timer when component unmounts or submitted state changes
        return () => clearTimeout(timer);
    }, [submitted]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

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
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/api/forms/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
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
                                    <label className="text-sm font-medium text-gray-700">Occuloplasty Cases</label>
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

                    {/* Professional Achievements */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                            </svg>
                            Professional Achievements
                        </h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Previous Work Experiences</label>
                            <textarea
                                name="previousWorkExperiences"
                                value={formData.previousWorkExperiences}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Describe your previous work experiences"
                            ></textarea>
                        </div>
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
                    <div className="flex justify-center lg:justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 shadow-lg flex items-center cursor-pointer
                            "
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Submit Registration
                                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}