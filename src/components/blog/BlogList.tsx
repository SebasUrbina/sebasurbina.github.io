import React, { useState, useEffect } from "react";
import { BlogMetadata } from "../../types/Blog";
import BlogCard from "./BlogCard";

type Props = {};

function BlogList({}: Props) {
  const [posts, setPosts] = useState<BlogMetadata[]>([]);

  useEffect(() => {
    fetch("posts/metadata.json")
      .then((res) => res.json())
      .then(setPosts)
      .catch((err) => console.error("Error loading metadata", err));
  }, []);

  return (
    <div>
      {posts.map((data) => (
        <BlogCard data={data} />
      ))}
    </div>
  );
}

export default BlogList;
