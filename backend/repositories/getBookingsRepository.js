import { supabase } from "../config/supabaseClient.js"

export async function getBookings() {

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("start_time", { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return data
}