const API_BASE = "http://localhost:5000/api"

export async function getResources() {

  try {

    const res = await fetch(`${API_BASE}/resources`)
    const data = await res.json()

    return data

  } catch (err) {

    console.error("Resources API error:", err)
    return []

  }

}

export async function getBookings() {

  try {

    const res = await fetch(`${API_BASE}/bookings`)
    const data = await res.json()

    return data

  } catch (err) {

    console.error("Bookings API error:", err)
    return []

  }

}

export async function createBooking(data) {

  const res = await fetch("http://localhost:5000/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  const json = await res.json()

  if (!res.ok || json.success === false) {
    throw new Error(json.error?.message || "Booking failed")
  }

  return json.data
}