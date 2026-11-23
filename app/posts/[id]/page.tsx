"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/posts/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setPost(data));
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    router.push("/");
    router.refresh();
  };

  if (!post) return <div className="container py-4">Post not found.</div>;

  return (
    <div className="container py-4">
      <h1>{post.title}</h1>
      <p className="text-muted">
        {new Date(post.createdAt).toLocaleDateString("en-GB")}
      </p>
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