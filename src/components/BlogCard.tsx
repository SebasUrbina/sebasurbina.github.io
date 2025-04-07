import React from "react";
import { Link } from "react-router-dom";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  tags: string[];
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  excerpt,
  date,
  slug,
  tags,
}) => {
  return (
    <article
      className="card p-6 theme-transition"
      style={{
        backgroundColor: "var(--color-card-bg)",
      }}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-2">
            <Link
              to={`/blog/${slug}`}
              className="theme-transition"
              style={{ color: "var(--color-text-primary)" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.color = "var(--color-accent)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.color = "var(--color-text-primary)")
              }
            >
              {title}
            </Link>
          </h2>
          <p
            className="mb-4 theme-transition"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {excerpt}
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
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
          <time
            className="text-sm theme-transition"
            style={{ color: "var(--color-text-muted)" }}
          >
            {date}
          </time>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
