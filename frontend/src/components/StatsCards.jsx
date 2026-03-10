export default function StatsCards({ bookings, resources = [] }) {
  const pending = bookings.filter(b => b.status === "pending").length
  const confirmed = bookings.filter(b => b.status === "confirmed").length
  const completed = bookings.filter(b => b.status === "completed").length
  const resourceCount = resources.length

  return (
    <div className="grid grid-cols-5 gap-4 mb-8">
      <Card title="Total Bookings" value={bookings.length} />
      <Card title="Pending" value={pending} />
      <Card title="Confirmed" value={confirmed} />
      <Card title="Completed" value={completed} />
      <Card title="Total Resources" value={resourceCount} />
    </div>
  )
}

function Card({ title, value }) {

  return (
    <div className="p-4 border rounded shadow-sm bg-white">

      <p className="text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>

    </div>
  )

}