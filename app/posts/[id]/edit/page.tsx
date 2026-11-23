"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  content: string;
  date: string;
};

export default function EditPost() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("posts");
    if (saved) {
      const posts: Post[] = JSON.parse(saved);
      const found = posts.find((p) => p.id === Number(id));
      if (found) {
        setTitle(found.title);
        setContent(found.content);
      }
    }
  }, [id]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return alert("All fields are required!");

    const saved = localStorage.getItem("posts");
    if (!saved) return;

    const posts: Post[] = JSON.parse(saved);
    const updatedPosts = posts.map((p) => {
      if (p.id === Number(id)) {
        return { ...p, title, content };
      }
      return p;
    });

    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    router.push(`/posts/${id}`);
  };

  return (
    <div className="container py-4">
      <h1>Edit Post</h1>
      <form onSubmit={handleUpdate} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-warning me-2">
          Update Post
        </button>
        <Link href={`/posts/${id}`} className="btn btn-secondary">
          Cancel
        </Link>
      </form>
    </div>
  );
}