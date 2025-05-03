import { Link } from "react-router-dom";
import { BlogMetadata } from "../../types/Blog";

type Props = {
  data: BlogMetadata;
};
export default function BlogCard({ data }: Props) {
  return (
    <Link to={`/blog/${data.slug}`} className="block">
      <article className="p-6 theme-transition shadow-2xl rounded-lg bg-white dark:bg-gray-800 hover:translate-0.5 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-2">
            <span className="theme-transition">{data.title}</span>
          </h2>
          <p className="mb-4 theme-transition">{data.excerpt}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-full theme-transition bg-gray-100 dark:bg-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
          <time className="text-sm theme-transition">{data.date}</time>
        </div>
      </article>
    </Link>
  );
}
