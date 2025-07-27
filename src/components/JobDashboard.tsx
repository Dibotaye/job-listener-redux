import React from "react";
import {
  BsCheckCircleFill,
  BsClock,
  BsCalendarDate,
  BsExclamationCircle,
} from "react-icons/bs";
import { IoLocationOutline, IoArrowBack } from "react-icons/io5";
import type { Job } from "../services/api";

interface JobDashboardProps {
  job: Job;
  onBack: () => void;
}

const JobDashboard: React.FC<JobDashboardProps> = ({ job, onBack }) => {
  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <IoArrowBack className="mr-2" /> Back to Opportunities
      </button>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
        <div className="flex items-center mt-4 space-x-4 text-sm text-gray-500">
          <span className="flex items-center">
            <IoLocationOutline className="mr-1" />
            {job.location.join(", ")}
          </span>
          <span className="flex items-center">
            <BsCalendarDate className="mr-1" />
            Posted on {formatDate(job.datePosted)}
          </span>
          <span className="flex items-center">
            <BsClock className="mr-1" />
            Deadline: {formatDate(job.deadline)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <p className="text-gray-700 mb-4">{job.description}</p>

            <h3 className="text-lg font-semibold mt-6 mb-2">
              Responsibilities
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {job.responsibilities.split("\n").map((item, index) => (
                <li key={index}>{item.trim()}</li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-2">Requirements</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {job.requirements.split("\n").map((item, index) => (
                <li key={index}>{item.trim()}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Ideal Candidate</h2>
            <p className="text-gray-700">{job.idealCandidate}</p>
          </section>
        </div>

        <div className="md:col-span-1">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">
              About This Opportunity
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Start Date
                </h4>
                <p>{formatDate(job.startDate)}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">End Date</h4>
                <p>{formatDate(job.endDate)}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Location</h4>
                <p>{job.location.join(", ")}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Type</h4>
                <p>{job.opType}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Categories
                </h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {job.categories.map((category, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Required Skills
                </h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {job.requiredSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center text-sm text-gray-500">
              <BsExclamationCircle className="mr-2" />
              <span>{job.applicantsCount} people have applied</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDashboard;
