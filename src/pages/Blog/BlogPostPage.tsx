import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MarkdownContent from "../../components/MarkdownContent";
import { motion } from "framer-motion";

type Props = {};

export default function BlogPostPage({}: Props) {
  const { slug } = useParams(); // get slug from url
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
        console.error("Error al cargar el post", err);
        setIsLoading(false);
      });
  }, [slug]);

  return (
    <motion.div
      className="mx-auto px-4 md:px-8 lg:px-16 max-w-4xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {isLoading ? (
        <div className="text-center py-12">Cargando...</div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <MarkdownContent content={postContent} />
        </motion.div>
      )}
    </motion.div>
  );
}
