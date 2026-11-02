// 1. ADD THIS LINE AT THE VERY TOP TO FIX THE BUILD CRASH
export const instant = false;

import { notFound } from "next/navigation"
import { getBlogById } from "../../api/blogs"
import { addLikes } from "@/app/actions/notes"

const blogPage = async ({params}: {params : Promise<{id : string}>})=>{

    const {id} = await  params
  
    const blog =  getBlogById(Number(id))

    if (!blog) {
       notFound() 
    }

return(
          <div>
             <h1>{blog.title}</h1>
             <h3>Author: {blog.author}</h3>
             <h3>URL: {blog.url}</h3>
             <h3>Likes: {blog.likes}</h3>
             <form action={addLikes}>
                <input type="hidden" name='id' value={blog.id}></input>
                <button >Like </button>
             </form>
          </div>  
)

}
export default blogPage