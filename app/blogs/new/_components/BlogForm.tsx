"use client"; // 👈 Interactive logic stays here

import { useState } from "react";
import { useRouter } from "next/navigation";

export function BlogForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Send the blog payload directly to your backend endpoint
    const response = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, url }),
    });

    if (response.ok) {
      setTitle("");
      setAuthor("");
      setUrl("");
      router.push("/blogs"); // Redirect back to list page after success
      router.refresh();
    } else {
      alert("Failed to save blog post.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "400px" }}>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Blog Title" 
        required 
      />
      <input 
        type="text" 
        value={author} 
        onChange={(e) => setAuthor(e.target.value)} 
        placeholder="Author" 
        required 
      />
      <input 
        type="url" 
        value={url} 
        onChange={(e) => setUrl(e.target.value)} 
        placeholder="Blog URL Link" 
        required 
      />
      <button type="submit">Save Entry</button>
    </form>
  );
}