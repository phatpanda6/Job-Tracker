import clsx from "clsx"
export default function StatusBadge({status}) {
  const typeStyles = {
    Offer: "bg-green-200 text-white",
    Rejected: "bg-red-200 text-white",
    Interviewing: "bg-yellow-200 text-white",
    Applied: "bg-blue-200 text-white"
  }
  return (
    <span className={clsx(
      "inline-flex w-32 items-center justify-center px-4 py-2 rounded font-medium",
      typeStyles[status]
    )}>
      {status}
    </span>
  )
}

