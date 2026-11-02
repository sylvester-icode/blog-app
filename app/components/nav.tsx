import Link from "next/link"
import { searchAction } from "../actions/notes"

const NavigationBar = ()=>{
    
    return(
        <div>
            <Link href={"/"}>Home</Link>{ " | "}
            <Link href={"/blogs"}>Blogs</Link>{ " | "}
            <Link href={"/blogs/new"}>Add Blog</Link>

        </div>

    )
}

export default NavigationBar