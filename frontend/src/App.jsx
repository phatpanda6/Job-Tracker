import PageWrapper from "./components/PageWrapper.jsx";
import Header from "./components/Header.jsx";
import JobFilter from "./components/JobFilters.jsx";
import JobList from "./components/JobList.jsx";
import { useState } from "react";

function App() {
  const initialJobsData = [
    {
      _id: "65f0c8e3a2e7e4e8e8e8e8e1", // MongoDB IDs are typically strings like this
      companyName: "Figma",
      title: "Product Designer",
      applicationStatus: "Interviewing",
      applicationDate: new Date("2024-03-10"), // Using JS Date objects
      notes: "Had a great conversation with the hiring manager.",
    },
    {
      _id: "65f0c8e3a2e7e4e8e8e8e8e2",
      companyName: "Google",
      title: "Software Engineer",
      applicationStatus: "Applied",
      applicationDate: new Date("2024-03-12"),
      notes: "",
    },
    {
      _id: "65f0c8e3a2e7e4e8e8e8e8e3",
      companyName: "Amazon",
      title: "UI/UX Designer",
      applicationStatus: "Rejected",
      applicationDate: new Date("2024-02-28"),
      notes: "Did not pass the take-home assignment.",
    },
    {
      _id: "65f0c8e3a2e7e4e8e8e8e8e4",
      companyName: "Microsoft",
      title: "Backend Developer",
      applicationStatus: "Offer",
      applicationDate: new Date("2024-03-05"),
      notes: "Received a strong offer. Awaiting final decision.",
    },
  ];
  const [jobsData, setJobsData] = useState(initialJobsData);

  //State for our filter function
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredJobs =
    selectedStatus === "All"
      ? jobsData
      : jobsData.filter((job) => job.applicationStatus === selectedStatus);

  return (
    <main className="bg-slate-100 min-h-screen">
      <PageWrapper>
        <Header />
        <JobFilter currentStatus={selectedStatus} onStatusChange={setSelectedStatus} />
        <JobList jobs={filteredJobs} />
      </PageWrapper>
    </main>
  );
}

export default App;
