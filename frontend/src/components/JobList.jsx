import JobCard from "./JobCard.jsx"

export default function JobList({jobs, onDeleteJob}) { 
  return (

    <div className="grid grid-cols-2 gap-8">
      {jobs.map(job => (
        <JobCard key={job._id} job={job} onDeleteJob={onDeleteJob}/>
      ))}
    </div>

  )
}