import express from "express"
import cors from "cors"

import bookingRoutes from "./routes/bookingRoutes.js"
import resourceRoutes from "./routes/resourceRoutes.js"

import { errorHandler } from "./middleware/errorMiddleware.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/bookings", bookingRoutes)
app.use("/api/resources", resourceRoutes)

app.use(errorHandler)

app.listen(5000, () => {
  console.log("Server running on port 5000")
})