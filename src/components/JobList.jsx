import JobCard from "./JobCard.jsx"

export default function JobList({jobs, onDeleteJob, onEditJob}) { 
  return (

    <div className="grid grid-cols-2 gap-8">
      {jobs.map(job => (
        <JobCard key={job._id} job={job} onDeleteJob={onDeleteJob} onEditJob={onEditJob}/>
      ))}
    </div>

  )
}