import { Link } from "react-router-dom";
import { BlogMetadata } from "../../types/Blog";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = {
  data: BlogMetadata;
};

export default function BlogCard({ data }: Props) {
  const { language } = useLanguage();

  // Format date as YYYY-MM-DD
  const formattedDate = new Date(data.date).toLocaleDateString("en-CA"); // ISO format

  return (
    <Link 
      to={`/blog/${data.slug}`} 
      className="block group"
    >
      <article className="py-4 border-b border-helix-cyan/20 hover:border-helix-cyan/40 transition-all duration-200">
        {/* Terminal-style title */}
        <h2 className="font-mono text-lg mb-2">
          <span className="text-helix-cyan">&gt;&gt; {formattedDate} [POST]:</span>{" "}
          <span className="text-text-bright group-hover:text-helix-teal transition-colors">
            {data.title}
          </span>
        </h2>

        {/* Excerpt */}
        <p className="font-mono text-sm text-text-dim mb-3 line-clamp-2 pl-4">
          {data.excerpt}
        </p>

        {/* Tags */}
        {data.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pl-4">
            {data.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs text-helix-teal"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Read more indicator */}
        <div className="font-mono text-xs text-text-dim mt-2 pl-4 group-hover:text-helix-cyan transition-colors">
          &gt; read more...
        </div>
      </article>
    </Link>
  );
}
