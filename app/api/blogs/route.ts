import { NextResponse } from "next/server"
import {getBlogs} from "../../services/blogs"

export async function GET() {
  const blogs = await getBlogs()
  return NextResponse.json(blogs)
}