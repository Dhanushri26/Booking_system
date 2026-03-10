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

export default function Dashboard() {

  const [bookings, setBookings] = useState([])
  const [resources, setResources] = useState([])
  const [error, setError] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  function getResourceName(id, resources) {
    const r = resources.find(r => r.id === id)
    return r ? r.name : "Unknown Resource"
  }

  function formatDate(date) {
    return new Date(date).toLocaleString()
  }

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

  const availableResources = resources.filter(
    r => !bookedResourceIds.includes(r.id)
  )

  return (

    <div className="p-8">

      <Header
        onRefresh={loadData}
        onNewBooking={() => setDialogOpen(true)}
      />

      {error && <ErrorAlert message={error} />}

      <StatsCards bookings={bookings} />

      {bookings.length === 0 ? (
        <EmptyState />
      ) : (
       <BookingList bookings={bookings} resources={resources} />
      )}

      <NewBookingDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        resources={resources}
        onSuccess={loadData}
      />

    </div>

  )

}