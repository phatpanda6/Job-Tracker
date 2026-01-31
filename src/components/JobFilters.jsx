export default function JobFilter({ currentStatus, onStatusChange}) {
  const handleChange = (event) => {
    onStatusChange(event.target.value); 
  }
  return (
    <div className="mt-8 flex items-center gap-4">
      <label>Filter by status</label>
      <select className="bg-white border-grey-100 rounded-md py-1.5" value ={currentStatus} onChange={handleChange}>
        <option>All</option>
        <option>Applied</option>
        <option>Interviewing</option>
        <option>Rejected</option>
        <option>Offer</option>
      </select>
    </div>
  )
}