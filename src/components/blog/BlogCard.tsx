import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BlogMetadata } from "../../types/Blog";

type Props = {
  data: BlogMetadata;
};
export default function BlogCard({ data }: Props) {
  return (
    <Link to={`/blog/${data.slug}`} className="block h-full">
      <motion.article
        className="h-full p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group"
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Header con gradiente */}
        <div className="mb-4">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white mb-3">
            {new Date(data.date).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <h2 className="text-xl font-bold mb-2 text-text-primary dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {data.title}
          </h2>
        </div>

        {/* Excerpt */}
        <p className="text-text-secondary dark:text-gray-300 mb-4 flex-grow line-clamp-3">
          {data.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {data.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Read more */}
        <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:gap-2 transition-all">
          Leer más
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </motion.article>
    </Link>
  );
}
