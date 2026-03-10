import { supabase } from "../config/supabaseClient.js"

export async function createBooking(data) {

  const result = await supabase
    .from("bookings")
    .insert(data)
    .select()

  if (result.error) {
    console.error(result.error)
    throw new Error(result.error.message)
  }

  return result.data
}