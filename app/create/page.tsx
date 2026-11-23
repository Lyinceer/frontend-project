"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  content: string;
  date: string;
};

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return alert("All fields are required!");

    const newPost: Post = {
      id: Date.now(),
      title,
      content,
      date: new Date().toLocaleDateString("en-GB"), // dd/mm/yyyy
    };

    const saved = localStorage.getItem("posts");
    const posts = saved ? JSON.parse(saved) : [];
    posts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));

    router.push("/");
  };

  return (
    <div className="container py-4">
      <h1>Create new post</h1>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your content here..."
          ></textarea>
        </div>

        <button type="submit" className="btn btn-success me-2">
          Publish
        </button>
        <Link href="/" className="btn btn-secondary">
          Back to Home
        </Link>
      </form>
    </div>
  );
}