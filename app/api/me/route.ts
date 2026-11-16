import { NextResponse } from "next/server";
import { users } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { getUserWithBlogs } from "@/app/services/users";

export async function GET(request : Request) {
try {
const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized. Missing or malformed Authorization header." },
        { status: 401 }
      );
    }
 

const apiToken = authHeader.split(" ")[1];
 if(!apiToken){
    return NextResponse.json(
        { error: "The token is not valid"},
        { status: 401 }
      );
 }

const user = await db.query.users.findFirst({where : (users , {eq})=> eq(users.token , apiToken)})
const username = user?.username
if (username) {
  const blogs = await getUserWithBlogs(username)
   
  return NextResponse.json(
   blogs
    )
}
}catch(error){

  
return NextResponse.json(
        { error: "Server has malfunctioned Authorization header." },
        { status: 500 }

      );

}


}
