import React, { useEffect, useState } from "react";
import axios from "axios";
import eyeView from "../assets/eyeview.jpg"

const Career = () => {
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    jobRole: "",
    fellowship: false,
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("https://bhomika-api-production.up.railway.app/api/career/get-all-career");
        const jobs = response.data;

        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

        const recentJobs = jobs?.careers.filter((job) => new Date(job.createdAt) >= oneYearAgo);

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
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const filteredJobs = jobListings.filter((job) => {
    return (
      (filters.location === "" || job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.jobRole === "" || job.title.toLowerCase().includes(filters.jobRole.toLowerCase())) &&
      (!filters.fellowship || job.jobType.toLowerCase() === "fellowship")
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative h-96 flex items-center justify-center bg-cyan-500 bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl">Build your future with us. Explore exciting career opportunities.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto p-6 bg-white/80 backdrop-blur-lg rounded-lg shadow-lg mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-cyan-700">Location</label>
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="Enter location"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-cyan-700">Job Role</label>
            <input
              type="text"
              name="jobRole"
              value={filters.jobRole}
              onChange={handleFilterChange}
              placeholder="Enter job role"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            />
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
              <span className="ml-2 text-sm text-cyan-700">Fellowship</span>
            </label>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        {loading ? (
          <p className="text-center text-cyan-700">Loading jobs...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center">
            <p className="text-2xl font-bold text-cyan-800 mb-4">No Job Openings Available</p>
            <p className="text-cyan-700">We currently don't have any job openings. Please check back later!</p>
            <div className="mt-8">
              <h2 className="text-xl font-bold text-cyan-800 mb-4">Why Join Us?</h2>
              <p className="text-cyan-700">
                At our company, we value innovation, collaboration, and growth. Join our team to work on exciting projects and make a difference!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <div
                key={job.jobId}
                className="bg-white/70 backdrop-blur-lg shadow-lg hover:shadow-2xl transition duration-300 p-6 rounded-xl border border-white/20 relative"
              >
                <p className="absolute top-3 right-4 bg-cyan-100 text-cyan-700 text-xs px-3 py-1 rounded-full font-semibold">
                  {job.jobId}
                </p>

                <h2 className="text-2xl font-bold text-cyan-800 mb-3">{job.title}</h2>
                <p className="text-sm text-cyan-700">
                  <strong>📍 Location:</strong> {job.location}
                </p>
                <p className="text-sm text-cyan-700">
                  <strong>💼 Job Type:</strong> {job.jobType}
                </p>
                <p className="text-sm text-cyan-700 mt-4">{job.description}</p>

                <button
                  onClick={() => handleApplyClick(job)}
                  className="mt-6 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 rounded-lg transition duration-300"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Apply Form Modal */}
      {showApplyForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-cyan-800 mb-6">Apply for {selectedJob.title}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowApplyForm(false);
                window.open(
                  `/apply?jobId=${selectedJob.jobId}&jobRole=${selectedJob.title}`,
                  "_blank"
                );
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-cyan-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cyan-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cyan-700">Years of Experience</label>
                  <input
                    type="number"
                    name="experience"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowApplyForm(false)}
                  className="mr-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                >
                  Open Application Form
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Career;