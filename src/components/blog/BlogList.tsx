import { useState, useEffect } from "react";
import { BlogMetadata } from "../../types/Blog";
import BlogCard from "./BlogCard";
import { motion } from "framer-motion";

type Props = {};

function BlogList({}: Props) {
  const [posts, setPosts] = useState<BlogMetadata[]>([]);

  useEffect(() => {
    fetch("posts/metadata.json")
      .then((res) => res.json())
      .then(setPosts)
      .catch((err) => console.error("Error al cargar los metadatos", err));
  }, []);

  return (
    <>
      {posts.map((data, index) => (
        <motion.div
          key={data.slug}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.3,
            delay: index * 0.1
          }}
        >
          <BlogCard data={data} />
        </motion.div>
      ))}
    </>
  );
}

export default BlogList;
