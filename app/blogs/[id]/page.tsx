export const instant = false

import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs";
import { addLikes } from "@/app/actions/blogs";
import AddToReadingListButton from "./addReadingList";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>
}

// 1. Dynamic Metadata Function (returns { title, description })
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const blog = await getBlogById(Number(id));
  if (!blog) {
    return { title: 'Post Not Found' }
  }
  return {
    title: blog.title,
  }
}


const blogPage = async ({ params }: Props) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));

  
  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8 font-sans text-base-content">
      <div className="max-w-3xl mx-auto">
        
        {/* Back Navigation Bar */}
        <div className="mb-6">
          <a href="/blogs" className="btn btn-sm btn-ghost text-primary gap-1 pl-0 normal-case font-bold">
            ← Back to Articles
          </a>
        </div>

        {/* Core Blog Article Card */}
        <article className="card bg-base-100 shadow-xl border border-base-300 overflow-hidden rounded-2xl">
          <div data-testid="blog-detail" className="card-body p-8 sm:p-10 space-y-6">
            
            {/* Header Content */}
            <header className="space-y-3 border-b border-base-200 pb-6">
              <h1 data-testid="blog-title" className="text-3xl font-extrabold sm:text-4xl text-base-content tracking-tight leading-tight">
                {blog.title || "Untitled Article"}
              </h1>
              
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <p className="text-sm font-medium text-base-content/60">
                  Published by: <span data-testid="blog-author"
                   className="text-base-content font-bold">{blog.author || "Unknown"}</span>
                </p>

                <div className="flex items-center gap-2">
                  <span className="badge badge-primary badge-md font-semibold px-3 py-1">
                    Article #{blog.id}
                  </span>
                  <span className="badge badge-outline badge-error font-bold gap-1 px-3 py-3 shadow-xs">
                    {blog.likes !== undefined && blog.likes !== null ? String(blog.likes) : "0"} likes
                  </span>
                </div>
              </div>
            </header>

            {/* Core Body Metadata / Link Area */}
            <div className="bg-base-200 rounded-xl p-5 border border-base-300 space-y-3">
              <p className="text-xs font-bold text-base-content/50 uppercase tracking-wider">
                External Link Source
              </p>
              {blog.url ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span  className="text-sm font-medium text-primary break-all underline select-all">
                    {blog.url}
                  </span>
                  <a 
                    href={blog.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary btn-sm text-primary-content font-bold shrink-0 shadow-sm"
                  >
                    Visit Source →
                  </a>
                </div>
              ) : (
                <p className="text-sm text-base-content/40 italic">No external URL attached to this log entry.</p>
              )}
            </div>

            {/* Interactive Feedback Section */}
            <footer className="pt-4 flex items-center justify-between border-t border-base-200">
              <form action={addLikes} className="m-0">
                <input type="hidden" name="id" value={blog.id}/>
                <button 
                  type="submit" 
                  className="btn btn-primary text-white font-bold px-6 shadow-md hover:shadow-lg hover:scale-102 active:scale-98 transition-all gap-2"
                >
                  Like
                </button>
              </form>

              {/* Client Button Component */}
              <AddToReadingListButton blogId={blog.id} />
            </footer>

          </div>
        </article>

      </div>
    </div>
  );
};

export default blogPage;
