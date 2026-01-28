import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardDescription from "@/components/CardDescription";
import BlogCard from "@/components/blog/BlogCard";
import { BlogMetadata } from "@/types/Blog";
import { useLanguage } from "@/contexts/LanguageContext";

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<BlogMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    fetch("posts/metadata.json")
      .then((res) => res.json())
      .then((data) => {
        // Show only the 3 most recent posts
        const sortedPosts = data.sort(
          (a: BlogMetadata, b: BlogMetadata) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setPosts(sortedPosts.slice(0, 3));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error loading metadata", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:pt-20 md:pb-0">
        <CardDescription />
      </section>
      {/* Recent Blogs Section */}
      <section className="container mx-auto px-4 max-w-4xl pb-20">
        {/* Posts List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 bg-space-darker/50 border border-helix-cyan/20 animate-pulse"
              />
            ))}
          </div>
        ) : posts.length > 0 ? (
          <>
            <div className="space-y-0">
              {posts.map((post) => (
                <BlogCard key={post.slug} data={post} />
              ))}
            </div>

            {/* View all link */}
            <div className="mt-8 pt-6 border-t border-helix-cyan/30">
              <Link
                to="/blog"
                className="font-mono text-sm text-helix-cyan hover:text-helix-teal transition-colors inline-flex items-center"
              >
                &gt; {t("home.viewAllArticles")}
                <span className="ml-2">→</span>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="font-mono text-text-dim">
              {t("home.noPosts")}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
