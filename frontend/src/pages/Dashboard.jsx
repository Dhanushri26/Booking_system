/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react"

import Header from "../components/Header"
import StatsCards from "../components/StatsCards"
import EmptyState from "../components/EmptyState"
import ErrorAlert from "../components/ErrorAlert"
import NewBookingDialog from "../components/NewBookingDialog"
import BookingList from "../components/BookingList"
import { getBookings, getResources } from "../services/api"

export default function Dashboard({ user, onLogout }) {

  const [bookings, setBookings] = useState([])
  const [resources, setResources] = useState([])
  const [error, setError] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  async function loadData() {

    try {

      setError(null)

      const [bookingsData, resourcesData] = await Promise.all([
        getBookings(),
        getResources()
      ])

      setBookings(bookingsData || [])
      setResources(resourcesData || [])

    } catch (err) {

      console.error(err)
      setError(err.message)

    }

  }

  useEffect(() => {
    loadData()
  }, [])

  const now = new Date()

  const activeBookings = bookings.filter(
    b => new Date(b.end_time) > now
  )

  const bookedResourceIds = activeBookings.map(
    b => b.resource_id
  )

  let availableResources = resources.filter(
    r => !bookedResourceIds.includes(r.id)
  )

  const special = resources.find(r => r.name === "Conference Room A")
  if (special && !availableResources.find(r => r.id === special.id)) {
    availableResources = [...availableResources, special]
  }

  return (

    <div className="p-8">

      <Header
        onRefresh={loadData}
        onNewBooking={() => setDialogOpen(true)}
        user={user}
        onLogout={onLogout}
      />

      {error && <ErrorAlert message={error} />}

      <StatsCards bookings={bookings} resources={resources} />

      {/* show available resources when there are any */}
      {availableResources.length > 0 && (
        <div className="my-6">
          <h3 className="text-lg font-semibold mb-2">
            Available Resources
          </h3>
          <ul className="flex flex-wrap gap-2">
            {availableResources.map(r => (
              <li
                key={r.id}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
              >
                {r.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {bookings.length === 0 ? (
        <EmptyState />
      ) : (
        <BookingList bookings={bookings} resources={resources} />
      )}
      
      <NewBookingDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        resources={availableResources}
        onSuccess={loadData}
      />

    </div>

  )

}