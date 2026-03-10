import { supabase } from "../supabaseClient"

const API_BASE = "http://localhost:5000/api"

async function getAuthHeaders() {
  const {
    data: { session }
  } = await supabase.auth.getSession()
  if (session?.access_token) {
    return { Authorization: `Bearer ${session.access_token}` }
  }
  return {}
}

export async function getResources() {
  try {
    const headers = await getAuthHeaders()
    const res = await fetch(`${API_BASE}/resources`, { headers })
    const data = await res.json()
    return data
  } catch (err) {
    console.error("Resources API error:", err)
    return []
  }
}

export async function getBookings() {
  try {
    const headers = await getAuthHeaders()
    const res = await fetch(`${API_BASE}/bookings`, { headers })
    const data = await res.json()
    return data
  } catch (err) {
    console.error("Bookings API error:", err)
    return []
  }
}

export async function createBooking(data) {
  const headers = await getAuthHeaders()
  const res = await fetch(`${API_BASE}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
    body: JSON.stringify(data)
  })

  const json = await res.json()

  if (!res.ok || json.success === false) {
    throw new Error(json.error?.message || "Booking failed")
  }

  return json.data
}