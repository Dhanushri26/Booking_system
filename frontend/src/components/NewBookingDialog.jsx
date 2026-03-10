import { useState, useEffect } from "react"
import { createBooking } from "../services/api"

export default function NewBookingDialog({ open, onClose, resources, onSuccess }) {
  const [resourceId, setResourceId] = useState("")
  const [status, setStatus] = useState("pending")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState([])
const [showSuggestions, setShowSuggestions] = useState(false)

  // reset fields whenever dialog is shown
  useEffect(() => {
    if (open) {
      setResourceId("")
      setStatus("pending")
      setStartTime("")
      setEndTime("")
      setError(null)
    }
  }, [open])

  if (!open) return null

  async function handleSubmit(e) {
    e.preventDefault()

    if (new Date(startTime) >= new Date(endTime)) {
      setError("Start time must be before end time")
      return
    }

    try {
      setLoading(true)
      setError(null)

      await createBooking({
        resource_id: resourceId,
        status,
        start_time: startTime,
        end_time: endTime
      })

      onSuccess()
      onClose()
    } catch (err) {
      if (err.suggestions && err.suggestions.length > 0) {

  setSuggestions(err.suggestions)
  setShowSuggestions(true)

} else {

  setError(err.message)

}
    } finally {
      setLoading(false)
    }
  }

  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">

      <div className="bg-white p-6 rounded w-96 shadow-lg">

        <h2 className="text-xl font-bold mb-4">
          New Booking
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <label className="block mb-2">
            Resource
          </label>

          <select
            className="w-full border p-2 mb-4"
            value={resourceId}
            onChange={(e) => setResourceId(e.target.value)}
            required
          >
            <option value="">Select resource</option>

            {resources.map(r => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}

          </select>

          <label className="block mb-2">
            Start time
          </label>
          <input
            type="datetime-local"
            className="w-full border p-2 mb-4"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />

          <label className="block mb-2">
            End time
          </label>
          <input
            type="datetime-local"
            className="w-full border p-2 mb-4"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />

          <label className="block mb-2">
            Status
          </label>

          <select
            className="w-full border p-2 mb-4"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
          </select>

          <div className="flex justify-end gap-2">

            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {loading ? "Creating..." : "Create"}
            </button>

          </div>

        </form>

      </div>
{showSuggestions && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">

    <div className="bg-white p-6 rounded w-96 shadow-lg">

      <h2 className="text-xl font-bold text-red-600 mb-3">
        Slot Already Booked
      </h2>

      <p className="text-gray-600 mb-4">
        Try one of these available slots:
      </p>

      <div className="space-y-2">

        {suggestions.map((slot, i) => (

          <button
            key={i}
            className="w-full bg-blue-600 text-white p-2 rounded"
            onClick={() => {

              setStartTime(slot.start_time)
              setEndTime(slot.end_time)
              setShowSuggestions(false)

            }}
          >

            {new Date(slot.start_time).toLocaleTimeString()} -
            {new Date(slot.end_time).toLocaleTimeString()}

          </button>

        ))}

      </div>

      <button
        className="mt-4 border px-4 py-2 rounded w-full"
        onClick={() => setShowSuggestions(false)}
      >
        Close
      </button>

    </div>

  </div>
)}
    </div>

  )

}