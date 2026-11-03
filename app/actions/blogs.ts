"use server"

import { revalidatePath } from "next/cache"
import { createBlog, increaMent, searchTitle } from "../services/blogs"
import {redirect} from "next/navigation"
import { getBlogs } from "../services/blogs"
import { auth } from "@/auth"

export const Updateblogs = async ( prevState: { error: string }, blog : FormData)=>{

    const session = await auth()
  if (!session) {
    redirect("/login")
  }

      const title = blog.get("title") as string
      const author = blog.get("author") as string
      const url = blog.get("url") as string 

       if (!title || title.length < 5) {
    throw new Error("Blog title must be at least 5 characters long")
  }

      if (!author || author.length < 5) {
    throw new Error("Blog author must be at least 5 characters long")
  }
      if (!url || url.length < 5) {
 throw new Error("Blog url  must be at least 5 characters long")
  }
  
      
     await createBlog( title , author , url  )
      revalidatePath('/blogs')
      redirect("/blogs")
}

export const addLikes = async (formData : FormData)=>{
    const like = Number(formData.get("id"))
    increaMent(like)
    revalidatePath(`/blogs/${like}`)
    revalidatePath('/blogs')
}


export const searchAction = async (formData : FormData)=>{
    const title = formData.get("title") as string
    if(!title){
     getBlogs()
     redirect(`/blogs`)
    }
    redirect(`/blogs?title=${title}`)
   

}
