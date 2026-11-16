"use client";

import { useRouter } from "next/navigation";
import { useTransition, useActionState, useEffect } from "react";
import { MarkasRead, type AddActionState } from "@/app/actions/readinglist";
import { useNotification } from "@/app/components/NotificationContext";

const initialState: AddActionState = {
  error: { blogId : ""},
  modal: { success: false, error: "" },
};

export default function AddToReadingListButton({ blogId }: { blogId: number }) {
 
    const { showNotification } = useNotification();
  const router = useRouter();
  const [state, formAction] = useActionState(MarkasRead, initialState);
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    if (state.modal.success) {
      showNotification("Blog has been added to reading list");
      router.push("/me");
    }
  }, [state, showNotification, router]);

  const handleSubmit = (formData: FormData) => {
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <form action={handleSubmit} className="m-0">

      <input type="hidden" name="blogId" value={blogId} />
      {!state.error.blogId ? ( 
        <button
        data-testid="add-to-reading-list-button"
        type="submit"
        disabled={isLoading}
        className="btn bg-green-600 text-white font-bold px-6 shadow-md hover:shadow-lg hover:scale-102 active:scale-98 transition-all gap-2"
      >
        {isLoading ? "Adding..." : "Add to reading list"}
      
      </button> ) : (
            <div className="alert alert-error py-2 px-3 text-sm shadow-sm ">
              <svg xmlns="http://w3.org" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{state.error.blogId}</span>
            </div>
          )
 }
     
       
      
    </form>
  );
}
