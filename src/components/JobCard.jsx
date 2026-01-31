import StatusBadge from "./StatusBadge.jsx";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

export default function JobCard({ job, onDeleteJob, onEditJob }) {
  const handleDeleteClick = () => {
    onDeleteJob(job._id);
  };

  const handleEditClick = () => {
    onEditJob(job);
  };

  return (
    <div className="mt-8 h-52 flex flex-col justify-between bg-white border-2 border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Main Info Section */}
      <div>
        <h2 className="text-4xl font-medium mb-4">{job.companyName}</h2>
        <p className="text-2xl font-normal mb-4">{job.title}</p>
        <StatusBadge status={job.applicationStatus} />
      </div>

      {/* Footer Section with Icons */}
      <div className="flex justify-end items-center gap-4">
        <button
          onClick={handleEditClick}
          className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
          aria-label="Edit job"
        >
          <FaPencilAlt size={18} />
        </button>

        <button
          onClick={handleDeleteClick}
          className="text-gray-500 hover:text-red-600 transition-colors duration-200"
          aria-label="Delete job"
        >
          <FaTrash size={18} />
        </button>
      </div>
    </div>
  );
}
