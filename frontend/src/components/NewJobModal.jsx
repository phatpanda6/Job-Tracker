import { useState } from "react";

export default function NewJobModal({ onClose, handleAddJob }) {
  const [formData, setFormData] = useState({
    companyName: "",
    title: "",
    applicationDate: "",
    applicationStatus: "Applied",
    notes: "",
  });
  //updates our form data when user inputs anything
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  //Communicates with our backend when the users submits the form
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const newJob = await response.json();
      handleAddJob(newJob);
      onClose();
    } catch (error) {
      console.error("Failed to create job", error);
    }
  };

  return (
    //The backdrop
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center">
      {/* The modal Content Panel */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Add New Job</h2>
        <form onSubmit={handleSubmit}>
          {/* Company Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Company Name
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g. Google"
              name="companyName"
              onChange={handleChange}
              value={formData.companyName}
            />
          </div>
          {/* Job Title */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Job Title
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g. Software Engineer"
              name="title"
              onChange={handleChange}
              value={formData.title}
            />
          </div>
          {/* Application Date */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Application Date
            </label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md"
              name="applicationDate"
              onChange={handleChange}
              value={formData.applicationDate}
            />
          </div>
          {/* Application Status */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Status
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={handleChange}
              name="applicationStatus"
              value={formData.applicationStatus}
            >
              <option>Applied</option>
              <option>Interviewing</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </div>
          {/* Notes */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Notes
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="3"
              placeholder="e.g. Spoke with hiring manager"
              name="notes"
              onChange={handleChange}
              value={formData.notes}
            ></textarea>
          </div>
          {/* Form Action Button */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
            >
              Add Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
