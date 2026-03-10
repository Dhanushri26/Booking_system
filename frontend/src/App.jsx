import { useState, useEffect } from "react"
import { supabase } from "./supabaseClient"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // check existing session on mount
    async function checkSession() {
      const {
        data: { session }
      } = await supabase.auth.getSession()
      setUser(session?.user || null)
      setLoading(false)
    }

    checkSession()

    // listen for auth changes (sign in / sign out)
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold">Loading Booking System...</h2>
        </div>
      </div>
    )
  }

  // if no user present show login screen
  if (!user) {
    return <Login onLogin={setUser} />
  }

  // logged in
  return <Dashboard user={user} onLogout={() => supabase.auth.signOut()} />
}

export default App