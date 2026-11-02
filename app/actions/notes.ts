"use server"
import { revalidatePath } from "next/cache"
import { createBlog, increaMent, searchTitle } from "../api/blogs"
import {redirect} from "next/navigation"
import { getBlogs } from "../api/blogs"

export const Updateblogs = async (blog : FormData)=>{
      const id = blog.get("id") as any
      const title = blog.get("title") as string
      const author = blog.get("author") as string
      const url = blog.get("url") as string 
      const likes = Number(blog.get("likes"))
      
      createBlog(id, title , author , url , likes )
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
