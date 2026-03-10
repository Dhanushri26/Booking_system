import express from "express"

import { createBooking } from "../controllers/bookingController.js"
import { getBookings } from "../controllers/getBookingsController.js"

const router = express.Router()

router.post("/", createBooking)
router.get("/", getBookings)

export default router