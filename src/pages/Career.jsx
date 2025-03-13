import React, { useEffect, useState } from "react";
import axios from "axios";

const Career = () => {
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/career/get-all-career");
        const jobs = response.data; // Assuming API returns an array of jobs

        // Get today's date minus one year
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

        // Filter jobs created within the last year
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

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-5">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">Join Our Team</h1>

      {loading ? (
        <p className="text-center text-gray-700">Loading jobs...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : jobListings.length === 0 ? (
        <p className="text-center text-gray-500">No job openings available.</p>
      ) : (
        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {jobListings.map((job) => (
            <div
              key={job.jobId}
              className="bg-white shadow-lg hover:shadow-2xl transition duration-300 p-6 rounded-xl border border-gray-200 relative"
            >
              <p className="absolute top-3 right-4 bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-semibold">
                {job.jobId}
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mb-3">{job.title}</h2>
              <p className="text-sm text-gray-600">
                <strong>📍 Location:</strong> {job.location}
              </p>
              <p className="text-sm text-gray-600">
                <strong>💼 Job Type:</strong> {job.jobType}
              </p>
              <p className="text-sm text-gray-700 mt-4">{job.description}</p>

              <button className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-lg transition duration-300">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Career;