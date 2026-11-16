import { db } from "@/db";
import { users } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req : NextRequest)=>{
try{
 
    if (process.env.NODE_ENV === "production") {
  return NextResponse.json(
    { error: "This endpoint is not available in production" },
    { status: 403 },
  )
}

    const body = await req.json()
    const {username , password , name} = body

   
    if(username && password && name){
      const user = await db.insert(users).values(body)
     
      return NextResponse.json({user , massage : "user has been added to database" , success : true})
    }


}catch(error){
return NextResponse.json(error)
}
}