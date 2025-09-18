export default function JobFilter() {
  return (
    <div className="mt-8 flex items-center gap-4">
      <label>Filter by status</label>
      <select className="bg-white border-gray-50 rounded-md py-1.5">
        <option>All</option>
        <option>Applied</option>
        <option>Interviewing</option>
        <option>Rejected</option>
        <option>Offer</option>
      </select>
    </div>
  )
}