import { createBookingService }
from "../services/bookingService.js"

export async function createBooking(req, res, next) {

  try {

    const booking =
      await createBookingService(req.body)

    res.status(201).json(booking)

  } catch(err) {

    next(err)

  }

}