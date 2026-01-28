import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MarkdownContent from "../../components/MarkdownContent";

type Props = {};

export default function BlogPostPage({}: Props) {
  const { slug } = useParams();
  const [postContent, setPostcontent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/posts/${slug}.md`)
      .then((res) => res.text())
      .then((content) => {
        setPostcontent(content);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error loading post", err);
        setIsLoading(false);
      });
  }, [slug]);

  return (
    <div className="mx-auto px-4 md:px-8 lg:px-16 max-w-4xl py-8">
      {isLoading ? (
        <div className="text-center py-12 font-mono text-text-dim">
          Loading...
        </div>
      ) : (
        <MarkdownContent content={postContent} />
      )}
    </div>
  );
}
