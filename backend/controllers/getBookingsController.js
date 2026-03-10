import { supabase } from "../config/supabaseClient.js"

export async function getBookings(req, res) {

  try {

    console.log("Fetching bookings...")

    const { data, error } = await supabase
      .from("bookings")
      .select("*")

    if (error) {
      console.error(error)
      return res.status(500).json({ error: error.message })
    }

    console.log("Bookings fetched:", data)

    return res.status(200).json(data)

  } catch (err) {

    console.error(err)

    return res.status(500).json({
      message: "Server error"
    })

  }

}