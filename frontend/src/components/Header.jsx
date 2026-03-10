export default function Header({ onRefresh ,onNewBooking }) {

  return (
    <div className="flex justify-between items-center mb-6">

      <div>
        <h1 className="text-2xl font-bold">Booking Manager</h1>
        <p className="text-gray-500">
          Manage your appointments and reservations
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onRefresh}
          className="px-4 py-2 border rounded"
        >
          Refresh
        </button>

        <button
  onClick={onNewBooking}
  className="px-4 py-2 bg-blue-600 text-white rounded"
>
  + New Booking
</button>
      </div>

    </div>
  )

}