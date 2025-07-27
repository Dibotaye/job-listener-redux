import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { BsClock } from "react-icons/bs";
import type { Job } from "../services/api";

interface JobCardProps {
  job: Job;
  onClick: () => void;
}

const categoryColors = [
  { border: "border-orange-300", text: "text-orange-300" },
  { border: "border-blue-300", text: "text-blue-300" },
  { border: "border-yellow-100", text: "text-yellow-300" },
  { border: "border-pink-100", text: "text-pink-300" },
];

const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-200 mx-auto ml-12 w-[900px]"
      onClick={onClick}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <img
            src={job.logoUrl || "/avatar.jpg"}
            alt={job.orgName}
            className="h-16 w-16 rounded-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-gray-900">{job.title}</h2>
          <p className="text-sm text-gray-500 mt-1">{job.orgName}</p>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {job.description.substring(0, 150)}...
          </p>

          <div className="mt-3 flex items-center space-x-3 text-sm text-gray-500">
            <span className="flex items-center">
              <IoLocationOutline className="mr-1" />
              {job.location[0]}
            </span>

            <span className="flex items-center">
              <BsClock className="mr-1" />
              {formatDate(job.startDate)} - {formatDate(job.endDate)}
            </span>

            <div className="flex-1"></div>

            {job.requiredSkills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className={`border ${
                  categoryColors[index % categoryColors.length].border
                } ${
                  categoryColors[index % categoryColors.length].text
                } text-xs font-semibold px-2.5 py-0.5 rounded-full`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
