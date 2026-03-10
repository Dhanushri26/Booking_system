import { createBooking } from "../repositories/bookingRepository.js"
import { supabase } from "../config/supabaseClient.js"

export async function createBookingService(data) {

  const { resource_id, start_time, end_time } = data;

  if (!resource_id || !start_time || !end_time) {
    throw new Error("resource_id, start_time and end_time are required");
  }

  if (new Date(start_time) >= new Date(end_time)) {
    throw new Error("Start time must be before end time");
  }
  const WORK_START = 8
const WORK_END = 17

const start = new Date(start_time)
const end = new Date(end_time)

const durationHours = (end - start) / (1000 * 60 * 60)

if (start >= end) {
  throw new Error("Start time must be before end time")
}

// working hours validation
if (
  start.getHours() < WORK_START ||
  end.getHours() > WORK_END
) {
  const err = new Error("Bookings allowed only between 8 AM and 5 PM")
  err.status = 400
  throw err
}

  // ❌ Booking cannot be in the past
  if (start < now) {
    const err = new Error("Cannot create booking in the past")
    err.status = 400
    throw err
  }

  // ❌ Minimum slot duration = 10 minutes
  if (durationMinutes < 10) {
    const err = new Error("Booking must be at least 10 minutes long")
    err.status = 400
    throw err
  }
  
// max duration validation
if (durationHours > 4) {
  const err = new Error("Booking cannot exceed 4 hours")
  err.status = 400
  throw err
}

  // Check overlapping bookings
  const { data: conflict, error } = await supabase
    .from("bookings")
    .select("id")
    .eq("resource_id", resource_id)
    .in("status", ["approved", "confirmed", "pending"])
    .lt("start_time", end_time)
    .gt("end_time", start_time);

  if (error) {
    throw new Error(error.message);
  }

  if (conflict.length > 0) {
    throw new Error("Resource already booked for this time slot");
  }

  const booking = await createBooking(data);

  return Array.isArray(booking) ? booking[0] : booking;
}