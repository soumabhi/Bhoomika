import React, { useEffect, useState } from "react";
import axios from "axios";

const Career = () => {
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    jobRole: "",
    fellowship: false,
    jobType: "all",
  });
  const [formData, setFormData] = useState({});
  const [formStep, setFormStep] = useState(1);
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "https://bhomika-api-production.up.railway.app/api/career/get-all-career"
        );
        const jobs = response.data;
        // Filter jobs from the last year
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        const recentJobs = jobs?.careers.filter(
          (job) => new Date(job.createdAt) >= oneYearAgo
        );
        setJobListings(recentJobs);
      } catch (err) {
        setError("Failed to load job listings. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowApplyForm(true);
    setFormStep(1);
    setFormData({
      jobId: job.jobId,
      jobRole: job.title,
    });
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setResumeFile(files[0]);
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const nextStep = () => {
    setFormStep(formStep + 1);
  };

  const prevStep = () => {
    setFormStep(formStep - 1);
  };

  const filteredJobs = jobListings.filter((job) => {
    return (
      (filters.location === "" ||
        job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.jobRole === "" ||
        job.title.toLowerCase().includes(filters.jobRole.toLowerCase())) &&
      (filters.jobType === "all" ||
        job.jobType.toLowerCase() === filters.jobType.toLowerCase()) &&
      (!filters.fellowship || job.jobType.toLowerCase() === "fellowship")
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const applicationData = new FormData();
      // Append form data
      Object.keys(formData).forEach((key) => {
        applicationData.append(key, formData[key]);
      });
      // Append resume file
      if (resumeFile) {
        applicationData.append("resume", resumeFile);
      }
      // Send data to backend
      await axios.post("https://api.msg91.com/api/v5/email/send", applicationData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Application submitted successfully!");
      setShowApplyForm(false);
    } catch (err) {
      alert("Failed to submit application. Please try again.");
    }
  };

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  // Get unique job types for filter
  const jobTypes =
    jobListings.length > 0
      ? ["all", ...new Set(jobListings.map((job) => job.jobType))]
      : ["all"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative h-[50vh] flex items-center justify-center bg-gradient-to-r from-cyan-600 to-blue-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="relative z-20 text-center text-white max-w-4xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Build Your Career With Us
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto">
            Join our innovative team and contribute to projects that make a
            difference. We're looking for talented individuals to help shape the
            future.
          </p>
          <a
            href="#job-listings"
            className="inline-block bg-white text-cyan-700 font-bold py-3 px-8 rounded-full hover:bg-cyan-50 transition duration-300 shadow-lg"
          >
            View Open Positions
          </a>
        </div>
      </div>

      {/* Company Values Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-cyan-800 mb-12">
            Why Join Our Team?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           
          </div>
        </div>
      </div>

      {/* Filters */}
      <div
        id="job-listings"
        className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-xl -mt-8 z-10 relative"
      >
        <h2 className="text-2xl font-bold text-cyan-800 mb-6">
          Search Open Positions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-cyan-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="Enter location"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-cyan-700 mb-1">
              Job Role
            </label>
            <input
              type="text"
              name="jobRole"
              value={filters.jobRole}
              onChange={handleFilterChange}
              placeholder="Enter job role"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-cyan-700 mb-1">
              Job Type
            </label>
            <select
              name="jobType"
              value={filters.jobType}
              onChange={handleFilterChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            >
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "all" ? "All Types" : type}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="fellowship"
                checked={filters.fellowship}
                onChange={handleFilterChange}
                className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-cyan-700">Fellowship Only</span>
            </label>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center bg-white p-8 rounded-xl shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-cyan-300 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {filters.fellowship ? (
              <>
                <p className="text-2xl font-bold text-cyan-800 mb-4">
                  No Fellowships Available
                </p>
                <p className="text-cyan-700 mb-6">
                  We currently don't have any fellowship openings that match your
                  criteria. Please check back later!
                </p>
              </>
            ) : (
              <>
                <p className="text-2xl font-bold text-cyan-800 mb-4">
                  No Job Openings Available
                </p>
                <p className="text-cyan-700 mb-6">
                  We currently don't have any job openings that match your
                  criteria. Please check back later!
                </p>
              </>
            )}
            <button
              onClick={() =>
                setFilters({ location: "", jobRole: "", fellowship: false, jobType: "all" })
              }
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-cyan-700 mb-6">
              Found {filteredJobs.length} job openings matching your criteria
            </p>
            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
              {filteredJobs.map((job) => (
                <div
                  key={job.jobId}
                  className="bg-white shadow-lg hover:shadow-xl transition duration-300 rounded-xl overflow-hidden border border-gray-100"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold text-cyan-800 mb-2">
                          {job.title}
                        </h2>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="bg-cyan-100 text-cyan-700 text-xs px-3 py-1 rounded-full font-semibold">
                            {job.jobType}
                          </span>
                          <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-semibold">
                            {job.location}
                          </span>
                          <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold">
                            ID: {job.jobId}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Posted on</p>
                        <p className="text-sm font-medium text-gray-700">
                          {formatDate(job.createdAt)}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {job.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => {
                          setSelectedJob(job);
                          setShowDescription(true);
                        }}
                        className="text-cyan-600 hover:text-cyan-700 font-semibold flex items-center"
                      >
                        View Details
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleApplyClick(job)}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-br from-cyan-700 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Benefits & Perks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Flexible Hours */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-bold mb-2">Flexible Hours</h3>
              <p className="text-cyan-100">
                Work when you're most productive with our flexible scheduling
                options.
              </p>
            </div>
            {/* Health Insurance */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <h3 className="text-xl font-bold mb-2">Health Insurance</h3>
              <p className="text-cyan-100">
                Comprehensive health, dental, and vision coverage for you and
                your family.
              </p>
            </div>
            {/* Remote Work */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <h3 className="text-xl font-bold mb-2">Remote Work</h3>
              <p className="text-cyan-100">
                Work from anywhere with our remote-friendly policies and tools.
              </p>
            </div>
            {/* Learning Budget */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <h3 className="text-xl font-bold mb-2">Learning Budget</h3>
              <p className="text-cyan-100">
                Annual budget for courses, books, and conferences to help you
                grow.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Job Description Pop-up */}
      {showDescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-8 rounded-xl w-full max-w-3xl shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-cyan-800">
                  {selectedJob.title}
                </h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-cyan-100 text-cyan-700 text-xs px-3 py-1 rounded-full font-semibold">
                    {selectedJob.jobType}
                  </span>
                  <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-semibold">
                    {selectedJob.location}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowDescription(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-cyan-800 mb-2">
                Job Description
              </h3>
              <p className="text-gray-700 whitespace-pre-line">
                {selectedJob.description}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={() => setShowDescription(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-6 rounded-lg transition duration-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowDescription(false);
                  handleApplyClick(selectedJob);
                }}
                className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white font-bold py-2 px-6 rounded-lg transition duration-300 shadow-md"
              >
                Apply for this Position
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Multi-step Apply Form Modal */}
      {showApplyForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-4xl shadow-2xl overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-6 relative">
              <button
                onClick={() => setShowApplyForm(false)}
                className="absolute top-6 right-6 text-white hover:text-cyan-100 transition duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h2 className="text-2xl font-bold text-white">
                Apply for {selectedJob.title}
              </h2>
              <p className="text-cyan-100 mt-1">
                Complete the form below to submit your application
              </p>
              {/* Progress Steps */}
              <div className="flex items-center mt-6">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${formStep === 1
                      ? "bg-white text-cyan-700"
                      : "bg-cyan-100 text-cyan-700"
                    }`}
                >
                  1
                </div>
                <div
                  className={`h-1 flex-1 mx-2 ${formStep >= 2 ? "bg-cyan-100" : "bg-cyan-300"
                    }`}
                ></div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${formStep === 2
                      ? "bg-white text-cyan-700"
                      : formStep > 2
                        ? "bg-cyan-100 text-cyan-700"
                        : "bg-cyan-300 text-white"
                    }`}
                >
                  2
                </div>
                <div
                  className={`h-1 flex-1 mx-2 ${formStep >= 3 ? "bg-cyan-100" : "bg-cyan-300"
                    }`}
                ></div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${formStep === 3
                      ? "bg-white text-cyan-700"
                      : "bg-cyan-300 text-white"
                    }`}
                >
                  3
                </div>
              </div>
            </div>
            {showApplyForm && (
              <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-xl w-full max-w-4xl shadow-2xl overflow-hidden">
                  {/* Form Header */}
                  <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-6 relative">
                    <button
                      onClick={() => setShowApplyForm(false)}
                      className="absolute top-6 right-6 text-white hover:text-cyan-100 transition duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <h2 className="text-2xl font-bold text-white">Apply for {selectedJob.title}</h2>
                    <p className="text-cyan-100 mt-1">Complete the form below to submit your application</p>
                    {/* Progress Steps */}
                    <div className="flex items-center mt-6">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${formStep === 1 ? "bg-white text-cyan-700" : "bg-cyan-100 text-cyan-700"
                          }`}
                      >
                        1
                      </div>
                      <div
                        className={`h-1 flex-1 mx-2 ${formStep >= 2 ? "bg-cyan-100" : "bg-cyan-300"
                          }`}
                      ></div>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${formStep === 2 ? "bg-white text-cyan-700" : formStep > 2 ? "bg-cyan-100 text-cyan-700" : "bg-cyan-300 text-white"
                          }`}
                      >
                        2
                      </div>
                      <div
                        className={`h-1 flex-1 mx-2 ${formStep >= 3 ? "bg-cyan-100" : "bg-cyan-300"
                          }`}
                      ></div>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${formStep === 3 ? "bg-white text-cyan-700" : "bg-cyan-300 text-white"
                          }`}
                      >
                        3
                      </div>
                    </div>
                  </div>
                  {/* Form Content */}
                  <div className="p-6 max-h-[70vh] overflow-y-auto">
                    <form onSubmit={handleSubmit}>
                      {/* Step 1: Job Details */}
                      {formStep === 1 && (
                        <div className="space-y-6">
                          <h3 className="text-xl font-semibold text-cyan-800 mb-4">Job Details</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Job ID
                              </label>
                              <input
                                type="text"
                                name="jobId"
                                value={formData.jobId || selectedJob.jobId}
                                readOnly
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Job Role
                              </label>
                              <input
                                type="text"
                                name="jobRole"
                                value={formData.jobRole || selectedJob.title}
                                readOnly
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Job Location
                              </label>
                              <input
                                type="text"
                                name="jobLocation"
                                value={selectedJob.location}
                                readOnly
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Job Type
                              </label>
                              <input
                                type="text"
                                name="jobType"
                                value={selectedJob.jobType}
                                readOnly
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={nextStep}
                              className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
                            >
                              Next Step
                            </button>
                          </div>
                        </div>
                      )}
                      {/* Step 2: Personal Information */}
                      {formStep === 2 && (
                        <div className="space-y-6">
                          <h3 className="text-xl font-semibold text-cyan-800 mb-4">Personal Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                              </label>
                              <input
                                type="text"
                                name="name"
                                value={formData.name || ""}
                                onChange={handleFormChange}
                                required
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                              </label>
                              <input
                                type="email"
                                name="email"
                                value={formData.email || ""}
                                onChange={handleFormChange}
                                required
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number
                              </label>
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone || ""}
                                onChange={handleFormChange}
                                required
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Address
                              </label>
                              <input
                                type="text"
                                name="address"
                                value={formData.address || ""}
                                onChange={handleFormChange}
                                required
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                10th Marks
                              </label>
                              <input
                                type="text"
                                name="tenthMarks"
                                value={formData.tenthMarks || ""}
                                onChange={handleFormChange}
                                required
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                12th Marks
                              </label>
                              <input
                                type="text"
                                name="twelfthMarks"
                                value={formData.twelfthMarks || ""}
                                onChange={handleFormChange}
                                required
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Highest Qualification
                              </label>
                              <input
                                type="text"
                                name="highestQualification"
                                value={formData.highestQualification || ""}
                                onChange={handleFormChange}
                                required
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                College Name
                              </label>
                              <input
                                type="text"
                                name="collegeName"
                                value={formData.collegeName || ""}
                                onChange={handleFormChange}
                                required
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Referral Code (Optional)
                              </label>
                              <input
                                type="text"
                                name="referralCode"
                                value={formData.referralCode || ""}
                                onChange={handleFormChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                              />
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <button
                              type="button"
                              onClick={prevStep}
                              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-6 rounded-lg transition duration-300"
                            >
                              Previous Step
                            </button>
                            <button
                              type="button"
                              onClick={nextStep}
                              className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
                            >
                              Next Step
                            </button>
                          </div>
                        </div>
                      )}
                      {/* Step 3: Upload Resume */}
                      {formStep === 3 && (
                        <div className="space-y-6">
                          <h3 className="text-xl font-semibold text-cyan-800 mb-4">Upload Resume</h3>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Resume (PDF or DOCX)
                            </label>
                            <input
                              type="file"
                              name="resume"
                              accept=".pdf,.doc,.docx"
                              onChange={handleFormChange}
                              required
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                            />
                          </div>
                          <div className="col-span-2">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                name="confirm"
                                required
                                className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                              />
                              <span className="ml-2 text-sm text-cyan-700">
                                I confirm that the information provided is accurate.
                              </span>
                            </label>
                          </div>
                          <div className="flex justify-between">
                            <button
                              type="button"
                              onClick={prevStep}
                              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-6 rounded-lg transition duration-300"
                            >
                              Previous Step
                            </button>
                            <button
                              type="submit"
                              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
                            >
                              Submit Application
                            </button>
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Career;