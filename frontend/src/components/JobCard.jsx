import StatusBadge from "./StatusBadge.jsx"

export default function JobCard({job, onDeleteJob}) {

  const handleDeleteClick = () => {
    onDeleteJob(job._id)
  }

  return (
    <div className="mt-8 h-52 flex flex-col justify-between bg-white border-2 border-gray-200 rounded-lg p-8 hover:bg-gray-50 hover:border-blue-500 cursor-pointer transition-colors duration-300 ">
      {/* Main Info Section */}
      <div>
        <h2 className="text-4xl font-medium mb-4">{job.companyName}</h2>
        <p className="text-2xl font-normal mb-4">{job.title}</p>
        <StatusBadge status={job.applicationStatus}/>
      </div>

      {/* Footer Section */}
      <div className="flex justify-end items-center gap-4">
        {/* We'll use actual icons later */}
        <span>EDIT</span>
        <span onClick={handleDeleteClick} className="cursor-pointer hover:text-red-500">DELETE</span>
      </div>
    </div>
  )
}