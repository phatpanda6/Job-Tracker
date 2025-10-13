import { useState, useEffect } from "react";
import PageWrapper from "./components/PageWrapper.jsx";
import Header from "./components/Header.jsx";
import JobFilter from "./components/JobFilters.jsx";
import JobList from "./components/JobList.jsx";
import NewJobModal from "./components/NewJobModal.jsx";

function App() {
  // --- STATE MANAGEMENT ---
  const [jobsData, setJobsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("All");

  // --- DATA FETCHING ---
  useEffect(() => {
    fetch("http://localhost:8000/api/jobs")
      .then((res) => res.json())
      .then((response) => setJobsData(response.data))
      .catch((error) => console.error("Failed to fetch jobs:", error));
  }, []);

  // --- MODAL CONTROLS ---
  const openAddJobModal = () => {
    setJobToEdit(null); // Ensure we're not in edit mode
    setIsModalOpen(true);
  };

  const openEditJobModal = (job) => {
    setJobToEdit(job); // Set the job to be edited
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setJobToEdit(null); // Always reset jobToEdit when modal closes
  };

  // --- CRUD LOGIC ---
  const handleAddJob = (newJobResponse) => {
    setJobsData((prevJobsData) => [...prevJobsData, newJobResponse.data]);
  };

  const handleUpdateJob = (updatedJobResponse) => {
    setJobsData((prevJobs) =>
      prevJobs.map((job) =>
        job._id === updatedJobResponse.data._id
          ? updatedJobResponse.data
          : job
      )
    );
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/jobs/${jobId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete job");
      setJobsData((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Error deleting job", error);
    }
  };

  // --- DERIVED STATE (FILTERING) ---
  const filteredJobs =
    selectedStatus === "All"
      ? jobsData
      : jobsData.filter((job) => job.applicationStatus === selectedStatus);

  // --- RENDER ---
  return (
    <main className="bg-slate-100 min-h-screen">
      <PageWrapper>
        <Header onAddNewJob={openAddJobModal} />

        {isModalOpen && (
          <NewJobModal
            onClose={closeModal}
            handleAddJob={handleAddJob}
            handleUpdateJob={handleUpdateJob}
            jobToEdit={jobToEdit}
          />
        )}

        <JobFilter
          currentStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />

        <JobList
          jobs={filteredJobs}
          onDeleteJob={handleDeleteJob}
          onEditJob={openEditJobModal}
        />
      </PageWrapper>
    </main>
  );
}

export default App;