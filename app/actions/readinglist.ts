"use server"

import {auth} from "@/auth"
import { createList } from "../services/readinglist"
import { toggleTrue} from "../services/readinglist"
import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { readingList } from "@/db/schema"

export interface AddActionState{
 error : {
   blogId? : string
 }
 modal : {
    success?: boolean , 
    error?: string
 }
}

export const MarkasRead = async(prevState: AddActionState, formdata : FormData) : Promise<AddActionState>=>{
const session = await auth()
 
const currentError : AddActionState ["error"]= {}
const currentModal : AddActionState ["modal"] = {}

const userId = Number(session?.user?.id)
const blogId = Number(formdata.get("blogId"))

const existingBlog = await db.query.readingList.findFirst({where : eq(readingList.blogId , blogId)})

if(existingBlog){
   currentError.blogId = "Blog has already been added"
}

 if (Object.keys(currentError).length > 0) {
    return {
      error: currentError,
      modal : currentModal
    }
  }


 await createList(userId , blogId)
 return {modal : {success : true , error : ""} , error : {}}

}

export const toggleRead = async(formdata : FormData)=>{
const id = Number(formdata.get("id"))

await toggleTrue(id)
revalidatePath("/me")
}







