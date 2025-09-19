import JobCard from "./JobCard.jsx"

export default function JobList({jobs}) { 
  return (

    <div className="grid grid-cols-2 gap-8">
      {jobs.map(job => (
        <JobCard key={job._id} job={job}/>
      ))}
    </div>

  )
}