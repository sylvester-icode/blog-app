"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useNotification } from "../components/NotificationContext"

export default function LoginPage() {

    const { showNotification } = useNotification()
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError("Invalid username or password")
    } else {
      showNotification("user has logged in successfully", "success")
      router.push("/")
    }
  }

  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100 border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold justify-center mb-2 text-base-content">Login</h2>
          
          {error && (
            <div data-testid="error-message" className="alert alert-error py-2 px-3 text-sm shadow-sm mb-4">
              <svg xmlns="http://w3.org" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label  htmlFor="username" className="label">
                <span className="label-text font-medium">Username</span>
              </label>
              <input 
                id="username"
                type="text" 
                name="username"
                placeholder="Enter your username" 
                className="input input-bordered input-primary w-full focus:outline-none" 
                required 
              />
            </div>

            <div className="form-control mb-6">
              <label htmlFor="password" className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input 
                id="password"
                type="password" 
                name="password"
                placeholder="••••••••" 
                className="input input-bordered input-primary w-full focus:outline-none" 
                required 
              />
            </div>

            <div className="form-control">
              <button 
                data-testid="login-button"
                type="submit" 
                className="btn btn-primary w-full text-white font-semibold"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
