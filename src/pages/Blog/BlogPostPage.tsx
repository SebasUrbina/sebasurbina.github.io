import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MarkdownContent from "../../components/MarkdownContent";

type Props = {};

export default function BlogPostPage({}: Props) {
  const { slug } = useParams(); // get slug from url
  const [postContent, setPostcontent] = useState<string>("");
  useEffect(() => {
    fetch(`/posts/${slug}.md`)
      .then((res) => res.text())
      .then(setPostcontent)
      .catch((err) => console.error("Error al cargar el post", err));
  }, [slug]);

  return (
    <div className="mx-auto px-4 md:px-8 lg:px-16 max-w-4xl">
      <MarkdownContent content={postContent} />
    </div>
  );
}
