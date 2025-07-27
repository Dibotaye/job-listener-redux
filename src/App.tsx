import React, { useState, useEffect } from "react";
import JobCard from "./components/JobCard";
import JobDashboard from "./components/JobDashboard";
// import { Job, fetchOpportunities } from "./services/api";
import type { Job } from "./services/api";
import { fetchOpportunities } from "./services/api";

function App() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string | null>(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const response = await fetchOpportunities();

        if (response.errors) {
          const errorMessage = typeof response.errors === 'string' 
            ? response.errors 
            : 'An error occurred while fetching opportunities';
          throw new Error(errorMessage);
        }

        if (response.data) {
          setJobs(response.data);
        }
      } catch (err) {
        setErrors(
          err instanceof Error
            ? err.message
            : "Failed to load job opportunities"
        );
        console.error("Error loading jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (errors) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 w-full max-w-2xl"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>{errors}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <h1 className="text-2xl text-blue-900 font-bold ml-12">Opportunities</h1>
      <p className="text-sm text-gray-400 ml-12 mb-6">
        {jobs.length > 0
          ? `Showing ${jobs.length} result${jobs.length !== 1 ? "s" : ""}`
          : "No opportunities found"}
      </p>
      {selectedJob ? (
        <JobDashboard job={selectedJob} onBack={() => setSelectedJob(null)} />
      ) : (
        <div className="space-y-6">
          {jobs.length > 0
            ? jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onClick={() => setSelectedJob(job)}
                />
              ))
            : !loading && (
                <div className="text-center py-12 text-gray-500">
                  No job opportunities available at the moment.
                </div>
              )}
        </div>
      )}
    </div>
  );
}

export default App;
