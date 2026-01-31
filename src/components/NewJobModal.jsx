import { useState, useEffect } from "react";

export default function NewJobModal({
  onClose,
  handleAddJob,
  handleUpdateJob, // Prop for the update function
  jobToEdit = null, // Prop holding the job data for editing
  token,
}) {
  const [formData, setFormData] = useState({
    companyName: "",
    title: "",
    applicationDate: "",
    applicationStatus: "Applied",
    notes: "",
  });

  // This hook pre-fills the form if we are in "edit mode"
  useEffect(() => {
    if (jobToEdit) {
      setFormData({
        companyName: jobToEdit.companyName,
        title: jobToEdit.title,
        applicationDate: new Date(jobToEdit.applicationDate)
          .toISOString()
          .split("T")[0],
        applicationStatus: jobToEdit.applicationStatus,
        notes: jobToEdit.notes || "",
      });
    }
  }, [jobToEdit]);

  // Generic handler to update form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // "Smart" submit handler for both creating and updating
  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = jobToEdit
      ? `http://localhost:8000/api/jobs/${jobToEdit._id}`
      : "http://localhost:8000/api/jobs";

    const method = jobToEdit ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const result = await response.json();

      // Call the correct handler based on whether we were editing
      if (jobToEdit) {
        handleUpdateJob(result);
      } else {
        handleAddJob(result);
      }

      onClose(); // Close the modal on success
    } catch (error) {
      console.error("Failed to submit job", error);
    }
  };

  // A boolean flag to make the UI dynamic
  const isEditing = Boolean(jobToEdit);

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        
        <h2 className="text-2xl font-bold mb-6">
          {isEditing ? "Edit Job" : "Add New Job"}
        </h2>

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
          {/* Form Action Buttons */}
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
              {isEditing ? "Save Changes" : "Add Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}