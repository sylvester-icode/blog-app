"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { useNotification } from "./NotificationContext"

const NavigationBar = () => {
  const { data: session } = useSession()
  const { showNotification } = useNotification()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ redirect: false })
    showNotification("Logged out successfully", "success")
    router.push("/")
    router.refresh()
  }

  return (
    <nav>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <Link href="/" className="btn btn-ghost text-xl">
            My Blogs
          </Link>
        </div>

        <div className="navbar-center flex">
          <ul className="menu text-md menu-horizontal px-1">
            <li>
              <Link href="/" className="capitalize">home</Link>
            </li>
            <li>
              <Link href="/blogs" className="capitalize">blogs</Link>
            </li>
            <li>
              <Link href="/users" className="capitalize">users</Link>
            </li>
            {session && (
              <li>
                <Link href="/blogs/new" className="capitalize">new blog</Link>
              </li>
            )}
          </ul>
        </div>

        {session ? (
          <div className="navbar-end">
            <Link href="/me" className="mx-3 underline capitalize">
              me
            </Link>
            <button
              data-testid="logout-button"
              className="btn bg-red-600 text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="navbar-end">
            <Link href="/login" className="btn btn-primary mx-3 capitalize">
              login
            </Link>
            <Link href="/register" className="btn bg-amber-500 capitalize">
              register
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavigationBar
