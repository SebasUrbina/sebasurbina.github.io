import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MarkdownContent from "./MarkdownContent";
import { BlogPost, getBlogPost } from "../services/blogService";

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      try {
        const loadedPost = await getBlogPost(slug);
        setPost(loadedPost);
      } catch (error) {
        console.error("Error loading post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="container py-12">
        <div className="flex justify-center">
          <div
            className="animate-spin rounded-full h-12 w-12"
            style={{
              borderTopWidth: "2px",
              borderBottomWidth: "2px",
              borderColor: "var(--color-accent)",
            }}
          ></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container py-12">
        <h1
          className="text-4xl font-bold mb-6 theme-transition"
          style={{ color: "var(--color-text-primary)" }}
        >
          Post no encontrado
        </h1>
        <p
          className="text-lg mb-6 theme-transition"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Lo sentimos, no pudimos encontrar el post que estás buscando.
        </p>
      </div>
    );
  }

  return (
    <div className="container py-12 fade-in">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1
            className="text-4xl font-bold mb-4 theme-transition"
            style={{ color: "var(--color-text-primary)" }}
          >
            {post.title}
          </h1>
          <div
            className="flex items-center space-x-4 theme-transition"
            style={{ color: "var(--color-text-muted)" }}
          >
            <time>{new Date(post.date).toLocaleDateString()}</time>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded-full theme-transition"
                  style={{
                    backgroundColor: "var(--color-secondary)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>
        <div className="theme-transition">
          <MarkdownContent content={post.content} />
        </div>
      </article>
    </div>
  );
};

export default BlogPostPage;
