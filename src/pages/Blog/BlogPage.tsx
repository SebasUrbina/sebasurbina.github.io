import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import BlogList from "../../components/blog/BlogList";

type Props = {};

function BlogPage({}: Props) {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              Blog
            </h1>
          </div>
          <p className="text-lg text-text-secondary dark:text-gray-300 max-w-2xl">
            Artículos, reflexiones y pensamientos sobre tecnología, desarrollo y
            ciencia de datos
          </p>
        </motion.div>

        {/* Blog List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <BlogList />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default BlogPage;
