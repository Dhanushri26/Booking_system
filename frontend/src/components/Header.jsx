export default function Header({ onRefresh, onNewBooking, user, onLogout }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">Booking Manager</h1>
        <p className="text-gray-500">Manage your appointments and reservations</p>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={onRefresh} className="px-4 py-2 border rounded">
          Refresh
        </button>

        <button onClick={onNewBooking} className="px-4 py-2 bg-blue-600 text-white rounded">
          + New Booking
        </button>

        {user && (
          <div className="flex items-center gap-2">
            <span className="text-gray-700 text-sm">{user.email}</span>
            <button
              onClick={onLogout}
              className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}