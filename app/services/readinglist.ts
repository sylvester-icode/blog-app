import { readingList , blogs } from "@/db/schema";
import { db } from "@/db";
import { eq , and } from "drizzle-orm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const createList = async(userId : number , blogId : number)=>{ 
  
const existing = await db.query.readingList.findFirst({where : eq(readingList.blogId , blogId)})
  if(existing){
    throw new Error("blog already exits");
    }
   await db.insert(readingList).values({userId , blogId})


}


export const getList = async() =>{
const session = await auth()

if(!session){
  redirect("/login")
}

const user = Number(session?.user?.id)

return await db
.select({id : readingList.id , title : blogs.title , read : readingList.read})
.from(readingList)
.innerJoin(blogs , eq(readingList.blogId , blogs.id))
.where(
   and(eq(readingList.userId , user),
  )      
  )
}


export const toggleTrue = async(id : number)=>{
  
await db.update(readingList)
.set({read : true})
.where(eq(readingList.id , id))

}

