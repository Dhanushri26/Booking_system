export default function BookingList({ bookings, resources }) {
  // highlight any overlapping entries
  const conflicts = detectConflicts(bookings || [])

  function getName(id) {
    const r = resources.find(r => r.id === id)
    return r ? r.name : id
  }

  function formatDate(date) {
    return new Date(date).toLocaleString()
  }

  function detectConflicts(bookings) {
    const conflicts = []
    for (let i = 0; i < bookings.length; i++) {
      for (let j = i + 1; j < bookings.length; j++) {
        const a = bookings[i]
        const b = bookings[j]
        if (
          a.resource_id === b.resource_id &&
          new Date(a.start_time) < new Date(b.end_time) &&
          new Date(a.end_time) > new Date(b.start_time)
        ) {
          conflicts.push(a.id)
          conflicts.push(b.id)
        }
      }
    }
    return conflicts
  }

  return (
    <div className="bg-white border rounded shadow-sm">
      <h2 className="text-lg font-semibold p-4 border-b">
        Active Bookings
      </h2>

      {conflicts.length > 0 && (
        <div className="bg-red-100 text-red-700 p-2 mb-2 rounded">
          ⚠️ Some bookings conflict with each other; overlapping entries are highlighted.
        </div>
      )}

      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-3">Resource</th>
            <th className="p-3">Status</th>
            <th className="p-3">Start</th>
            <th className="p-3">End</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr
              key={b.id}
              className={`border-b ${conflicts.includes(b.id) ? "bg-red-50" : ""}`}
            >
              <td className="p-3">{getName(b.resource_id)}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-sm
                  ${b.status === "pending" && "bg-yellow-100 text-yellow-700"}
                  ${b.status === "confirmed" && "bg-green-100 text-green-700"}
                  ${b.status === "completed" && "bg-gray-200 text-gray-700"}`}
                >
                  {b.status}
                </span>
              </td>
              <td className="p-3">{formatDate(b.start_time)}</td>
              <td className="p-3">{formatDate(b.end_time)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
