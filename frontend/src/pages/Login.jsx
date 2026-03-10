import { useState } from "react"
import { supabase } from "../supabaseClient"

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isRegister, setIsRegister] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      let result

      if (isRegister) {
        result = await supabase.auth.signUp({ email, password })
      } else {
        result = await supabase.auth.signInWithPassword({ email, password })
      }

      const { data, error: authError } = result

      if (authError) throw authError

      if (data?.user) {
        onLogin(data.user)
      } else if (isRegister) {
        setError("Check your email for a confirmation link before logging in.")
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleReset() {
    if (!email) {
      setError("Please enter your email to reset password.")
      return
    }
    setError(null)
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email)
    if (resetError) {
      setError(resetError.message)
    } else {
      setError("If that address exists you will receive an email shortly.")
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isRegister ? "Create account" : "Welcome back"}
        </h2>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="border p-2 w-full mb-3 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block mb-2 text-sm font-medium">Password</label>
          <div className="relative mb-3">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="border p-2 w-full rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600"
              onClick={() => setShowPassword((p) => !p)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={handleReset}
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white w-full py-2 rounded disabled:opacity-50"
              disabled={loading || !email || !password}
            >
              {loading
                ? isRegister
                  ? "Creating..."
                  : "Signing in..."
                : isRegister
                ? "Sign up"
                : "Sign in"}
            </button>
          </div>
        </form>

        <p className="text-center text-sm">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            className="text-blue-600 hover:underline"
            onClick={() => {
              setIsRegister((v) => !v)
              setError(null)
            }}
          >
            {isRegister ? "Log in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  )
}