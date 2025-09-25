import PageWrapper from "./components/PageWrapper.jsx";
import Header from "./components/Header.jsx";
import JobFilter from "./components/JobFilters.jsx";
import JobList from "./components/JobList.jsx";
import { useState, useEffect } from "react";
import NewJobModal from "./components/NewJobModal.jsx";

function App() {
  const [jobsData, setJobsData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/jobs").then(res => res.json()).then(response => setJobsData(response.data))
  },[] )

  //State for our filter function
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredJobs =
    selectedStatus === "All"
      ? jobsData
      : jobsData.filter((job) => job.applicationStatus === selectedStatus);

  const[isModalOpen, setIsModalOpen] = useState(false)

  //responsible for refreshing ui if new job is added
  const handleAddJob = (newJob) => {
    setJobsData((prevJobsData) => [...prevJobsData, newJob.data])
  }

  //responsible for refreshing ui when job is deleted
  const handleDeleteJob = async (jobId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/jobs/${jobId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete job'); 
      }


      setJobsData(prevJobs => prevJobs.filter(job => job._id !== jobId))
    } catch (error) {
      console.error("Error deleting job", error)
    }
  }

  return (
    <main className="bg-slate-100 min-h-screen">
      <PageWrapper>
        <Header onAddNewJob={() => setIsModalOpen(true)} />
        {isModalOpen && <NewJobModal onClose={()=> setIsModalOpen(false)} handleAddJob={handleAddJob}/>}
        <JobFilter
          currentStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />
        <JobList jobs={filteredJobs} onDeleteJob={handleDeleteJob} />
      </PageWrapper>
    </main>
  );
}

export default App;
