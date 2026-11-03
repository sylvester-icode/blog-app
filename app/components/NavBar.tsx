"use client"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

const NavigationBar = ()=>{
 const { data: session } = useSession()
 
    return(
        <div>
            <Link href={"/"}>Home</Link>{ " | "} 
            <Link href={"/blogs"}>Blogs</Link>{ " | "}
            <Link href={"/users"}>Users</Link>{ " | "}
             { " | "}
            
                {session ? (
        <>
          <Link href={"/blogs/new"}>Add Blog</Link>
          {" | "}
          <em>{session.user?.name} logged in</em>{" "}
          <button onClick={() => signOut()}>logout</button>
        </>
      ) : (<>
         <Link href="/login">login</Link>
         {" | "}
          <Link href="/register">register</Link>
        </>
       
      )}
       </div>

    )
}

export default NavigationBar