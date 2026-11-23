"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const loadPosts = async () => {
    const res = await fetch("/api/posts");
    if (res.ok) {
      const data = await res.json();
      setPosts(data);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-4">
      <h1 className="mb-4">My Professional Blog</h1>

      <Link href="/create" className="btn btn-primary mb-3">
        + Create New Post
      </Link>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {posts.length === 0 && <p>No posts yet.</p>}

      <ul className="list-group">
        {filteredPosts.map((post) => (
          <li key={post.id} className="list-group-item">
            <Link href={`/posts/${post.id}`} className="fw-bold text-decoration-none">
              {post.title}
            </Link>
            <div className="text-muted small">
              {new Date(post.createdAt).toLocaleDateString("id-ID")}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}