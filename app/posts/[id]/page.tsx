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

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("posts");
    if (saved) {
      const posts: Post[] = JSON.parse(saved);
      const found = posts.find((p) => p.id === Number(id));
      if (found) setPost(found);
    }
  }, [id]);

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    const saved = localStorage.getItem("posts");
    if (!saved) return;
    const posts: Post[] = JSON.parse(saved).filter((p: Post) => p.id !== Number(id));
    localStorage.setItem("posts", JSON.stringify(posts));
    router.push("/");
  };

  if (!post) return <div className="container py-4">Post not found.</div>;

  return (
    <div className="container py-4">
      <h1>{post.title}</h1>
      <p className="text-muted">{post.date}</p>
      <p>{post.content}</p>
      <div className="mt-4">
        <button className="btn btn-danger me-2" onClick={handleDelete}>
          Remove
        </button>
        <Link href={`/posts/${id}/edit`} className="btn btn-warning me-2">
        Edit
        </Link>
        <Link href="/" className="btn btn-secondary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}