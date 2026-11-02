const blogs = [    {
    id : 1 ,
    title : "American Dad",
    author : "Stan Smith" ,
    url : "https://www.fox.com" ,
    likes : 3
} ,     {
    id : 2 ,
    title : "Avengers",
    author : "Marvel" ,
    url : "https://www.marvel.com",
    likes : 5
} ,  {
    id : 3 ,
    title : "Venom",
    author : "Tom Hardy",
    url : "https://www.sony.com" ,
    likes : 1
}
]

export const getBlogs = ()=>{
    return blogs.sort((a , b)=>b.likes - a.likes)
}

let l = blogs.length + 1
export const createBlog = (
    id : number, 
    title: string, 
    author : string, 
    url : string, 
    likes : number)=>{
       blogs.push({id : l , title , author, url , likes })
}


export const getBlogById = (id : number)=>{
    return blogs.find((blog)=>blog.id === id)
}

export const increaMent = (id : number)=>{
 const blog = blogs.find((blog)=>blog.id === id)
 if(blog){
   return blog.likes++
 }

}

export const searchTitle = async (title : string )=>{
       console.log(title + ' saerching title');
       
      return blogs.find((blog)=>blog.title.toLocaleLowerCase() === title.toLocaleLowerCase())
       
    
}
