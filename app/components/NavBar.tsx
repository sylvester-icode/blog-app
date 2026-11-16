"use client"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

const NavigationBar = ()=>{
const { data: session } = useSession()

    return(<>
    <nav>
 <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    
    <a className="btn btn-ghost text-xl">My Blogs</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu text-md menu-horizontal px-1">
      <li><Link href="/">Home</Link></li>
      <li>
        <Link href="/blogs">Blogs</Link>
      </li>
      <li><Link href="/users">Users</Link></li>
      {session && (
        <li><Link href="/blogs/new">Create blog</Link></li>
      )}
    </ul>
  </div>

     {session ? (
        <div className="navbar-end">
          

          <Link href="/me" className="mx-3 underline"> Me </Link>
          <button className="btn bg-red-600" onClick={() => signOut()}>Logout</button>
        </div>
      ) : (  <div className="navbar-end">
    <Link href="/login" className="btn btn-primary mx-3">Login</Link>
    <Link href="/register" className="btn bg-amber-500">Register</Link>
     </div>
       
      )}

</div>
  </nav>
    </>
    )
}

export default NavigationBar