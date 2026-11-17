export const instant = false
import { getBlogs } from "../services/blogs";
import { searchAction } from '../actions/blogs'
import Link from "next/link";

const blogsPage = async ({ searchParams }: { searchParams: Promise<{ title?: string }> }) => {

  const { title } = await searchParams
  const blogs = await getBlogs()

  // Safe checks to avoid crashing if title or blog arrays have format anomalies
  const showList = title === undefined 
    ? (blogs || []) 
    : (blogs || []).filter((blog) => 
        blog?.title?.toLowerCase().includes(title.toLowerCase())
      )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-5xl">
            Explore Articles
          </h1>
          <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
            Discover technical insights, developer logs, and shared tutorials.
          </p>
        </div>

        {/* Search Bar Block */}
        <div className="max-w-xl mx-auto mb-12">
          <form className="flex rounded-xl shadow-sm border border-gray-300 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800" action={searchAction}>
            <div className="relative flex-1 flex items-center">
              <input 
                data-testid="filter-input"
                placeholder="Search articles by title..." 
                type="text" 
                name="title"
                defaultValue={title || ""}
                className="w-full px-4 py-3 bg-transparent text-gray-900 dark:text-white focus:outline-none placeholder-gray-400 text-sm"
              />
            </div>
            <button 
              data-testid="search-button"
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold text-sm transition-colors cursor-pointer shrink-0"
            >
              Search
            </button>
          </form>
        </div>

        {/* Collection Stream Grid */}
        {!showList || showList.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 shadow-sm">
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No articles found matching that title.</p>
          </div>
        ) : (
          <div data-testid="blogs-list" className="grid gap-6 sm:grid-cols-2">
            {showList.map((blog, index) => (
              <div 
                key={blog?.id ? String(blog.id) : index} 
                className="flex flex-col justify-between bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Link href={`/blogs/${blog?.id || ""}`} className="flex-1">
                  <div>
                    {/* Safe Title Rendering */}
                    <h2
                      className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
                      {blog?.title || "Untitled Blog"}
                    </h2>
                    
                    {/* Safe Author Rendering */}
                    <p className="mt-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                      By <span className="text-gray-800 dark:text-gray-200 font-semibold">{blog?.author || "Unknown"}</span>
                    </p>
                  </div>
                </Link>

                {/* Footer Metrics Row */}
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  {/* Safe Likes Counter (Guards against Null values) */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border border-red-100 dark:border-red-900/30">
                    {blog?.likes !== undefined && blog?.likes !== null ? String(blog.likes) : "0"} likes
                  </span>
                  
                  {/* Safe Outbound Link Button */}
                  {blog?.url ? (
                    <a 
                      href={blog.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 gap-0.5 hover:underline"
                    >
                      Read Article 
                      <svg className="w-4 h-4 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  ) : (
                    <span className="text-xs text-gray-400 italic">No link available</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default blogsPage;
