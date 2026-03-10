import { useState } from "react"
import { supabase } from "../supabaseClient"

export default function Login({ onLogin }) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  async function handleLogin(e) {

    e.preventDefault()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setError(error.message)
      return
    }

    onLogin(data.user)

  }

  return (

    <div className="flex items-center justify-center h-screen bg-gray-100">

      <div className="bg-white p-6 rounded shadow w-80">

        <h2 className="text-xl font-bold mb-4 text-center">
          Login
        </h2>

        {error && (
          <div className="text-red-600 mb-3">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full mb-3"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full mb-3"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded"
          >
            Login
          </button>

        </form>

      </div>

    </div>

  )

}