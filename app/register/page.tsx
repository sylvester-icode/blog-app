"use client"

import { registerUser, type RegisterState } from "../actions/users"
import { useActionState } from "react"

const RegisterPage = () => {
  const initialState: RegisterState = {
    errors: {},
    values: {
      username: "",
      password: "",
      name: "",
      confirmpassword: "",
    },
  }

  const [state, formAction, isPending] = useActionState(registerUser, initialState)

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100 border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold justify-center mb-2 text-base-content">Register</h2>

          <form action={formAction}>
            {/* Username Field */}
            <div className="form-control mb-4">
              <label htmlFor="username" className="label">
                <span className="label-text font-medium">Username</span>
              </label>
              <input
                id="username"
                data-testid="username-input"
                type="text"
                name="username"
                placeholder="Choose a username"
                defaultValue={state.values?.username}
                className={`input input-bordered w-full focus:outline-none ${state.errors?.username ? "input-error" : "input-primary"}`}
                required
              />
              {state.errors?.username && (
                <label className="label" data-testid="username-error">
                  <span className="label-text-alt text-error font-medium">{state.errors.username}</span>
                </label>
              )}
            </div>

            {/* Name Field */}
            <div className="form-control mb-4">
              <label htmlFor="name" className="label">
                <span className="label-text font-medium">Name</span>
              </label>
              <input
                id="name"
                data-testid="name-input"
                type="text"
                name="name"
                placeholder="Enter your name"
                defaultValue={state.values?.name}
                className={`input input-bordered w-full focus:outline-none ${state.errors?.name ? "input-error" : "input-primary"}`}
                required
              />
              {state.errors?.name && (
                <label className="label">
                  <span className="label-text-alt text-error font-medium">{state.errors.name}</span>
                </label>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control mb-4">
              <label htmlFor="password" className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                id="password"
                data-testid="password-input"
                type="password"
                name="password"
                placeholder="••••••••"
                defaultValue={state.values?.password}
                className={`input input-bordered w-full focus:outline-none ${state.errors?.password ? "input-error" : "input-primary"}`}
                required
              />
              {state.errors?.password && (
                <label className="label">
                  <span className="label-text-alt text-error font-medium">{state.errors.password}</span>
                </label>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="form-control mb-6">
              <label htmlFor="confirmpassword" className="label">
                <span className="label-text font-medium">Confirm Password</span>
              </label>
              <input
                id="confirmpassword"
                data-testid="confirmpassword-input"
                type="password"
                name="confirmpassword"
                placeholder="••••••••"
                defaultValue={state.values?.confirmpassword}
                className={`input input-bordered w-full focus:outline-none ${state.errors?.confirmpassword ? "input-error" : "input-primary"}`}
                required
              />
              {state.errors?.confirmpassword && (
                <label className="label" data-testid="passwordConfirm-error">
                  <span className="label-text-alt text-error font-medium">{state.errors.confirmpassword}</span>
                </label>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-control">
              <button
                data-testid="register-button"
                type="submit"
                className="btn btn-primary w-full text-white font-semibold"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Creating Account...
                  </>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
