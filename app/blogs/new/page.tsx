"use client"

import { Updateblogs, type BlogActionState } from "@/app/actions/blogs";
import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { useNotification } from "../../components/NotificationContext";
import { useEffect, useTransition } from "react";

const CreateBlog = () => {
  const initialState: BlogActionState = { 
    errors: {}, 
    values: { title: "", author: "", url: "" },
    modal: { success: false, error: "" }
  }

  const { showNotification } = useNotification()
  const router = useRouter()
  
  // useTransition lets us monitor the exact loading state of our server form action
  const [isPending, startTransition] = useTransition()
  const [state, formAction] = useActionState(Updateblogs, initialState)  

  useEffect(() => {
    if (state.modal.success) {
      showNotification("Blog has been created successfully", "success")
      router.push("/blogs")
    }
  }, [state, showNotification, router])

  const handleSubmit = (formData: FormData) => {
    startTransition(() => {
      formAction(formData)
    })
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="card bg-base-100 w-full max-w-lg shadow-xl border border-base-300 rounded-2xl overflow-hidden">
        <div className="card-body p-6 sm:p-8">
          
          {/* Header Block */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-base-content tracking-tight">
              Create New Blog
            </h2>
            <p className="text-sm text-base-content/60 mt-1">
              Share your latest project insights, technical discoveries, or code logs.
            </p>
          </div>

          {/* Core Server Error Alert */}
          {state.modal.error && (
            <div className="alert alert-error shadow-sm py-2.5 text-sm text-white rounded-lg mb-4">
              <span>{state.modal.error}</span>
            </div>
          )}

          {/* Form Stack */}
          <form action={handleSubmit} className="space-y-5">
            
            {/* Title Field Input Block */}
            <div className="form-control w-full">
              <label className="label pt-0">
                <span className="label-text font-semibold text-base-content">Title</span>
              </label>
              <input 
                type="text" 
                name="title" 
                placeholder="e.g., Demystifying Tailwind CSS v4 Hooks"
                defaultValue={state.values?.title}
                disabled={isPending}
                className={`input input-bordered w-full focus:outline-none bg-base-100 shadow-xs ${
                  state.errors.title ? "input-error focus:ring-2 focus:ring-error" : "input-primary"
                }`}
              />
              {state.errors.title && (
                <label className="label pb-0">
                  <span className="label-text-alt text-error font-medium">{state.errors.title}</span>
                </label>
              )}
            </div>

            {/* Author Field Input Block */}
            <div className="form-control w-full">
              <label className="label pt-0">
                <span className="label-text font-semibold text-base-content">Author</span>
              </label>
              <input 
                type="text" 
                name="author" 
                placeholder="Your name or organization"
                defaultValue={state.values?.author}
                disabled={isPending}
                className={`input input-bordered w-full focus:outline-none bg-base-100 shadow-xs ${
                  state.errors.author ? "input-error focus:ring-2 focus:ring-error" : "input-primary"
                }`}
              />
              {state.errors.author && (
                <label className="label pb-0">
                  <span className="label-text-alt text-error font-medium">{state.errors.author}</span>
                </label>
              )}
            </div>

            {/* URL Field Input Block */}
            <div className="form-control w-full">
              <label className="label pt-0">
                <span className="label-text font-semibold text-base-content">URL</span>
              </label>
              <input 
                type="text" 
                name="url" 
                placeholder="https://example.com"
                defaultValue={state.values?.url}
                disabled={isPending}
                className={`input input-bordered w-full focus:outline-none bg-base-100 shadow-xs ${
                  state.errors.url ? "input-error focus:ring-2 focus:ring-error" : "input-primary"
                }`}
              />
              {state.errors.url && (
                <label className="label pb-0">
                  <span className="label-text-alt text-error font-medium">{state.errors.url}</span>
                </label>
              )}
            </div>

            {/* Form Footer Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-base-200 mt-6">
              <a 
                href="/blogs" 
                className="btn btn-ghost btn-sm text-base-content/60 hover:text-base-content font-bold normal-case order-last sm:order-first w-full sm:w-auto"
              >
                Cancel & Return
              </a>
              
              <button 
                data-testid="create-blog-button"
                type="submit" 
                disabled={isPending}
                className="btn btn-primary text-primary-content font-bold px-8 shadow-md hover:shadow-lg w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {isPending && <span className="loading loading-spinner loading-sm"></span>}
                {isPending ? "Publishing..." : "Create Post"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateBlog;
