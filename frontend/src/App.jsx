import { useState, useEffect } from "react"
import Dashboard from "./pages/Dashboard"

function App() {

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false)
    }, 500) // 20 seconds

    return () => clearTimeout(timer)

  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">

        <div className="text-center">

          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto mb-4"></div>

          <h2 className="text-xl font-semibold">
            Loading Booking System...
          </h2>

        </div>

      </div>
    )
  }

  return <Dashboard />

}

export default App