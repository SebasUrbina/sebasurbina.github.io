import { useLanguage } from "@/contexts/LanguageContext";
import BlogList from "../../components/blog/BlogList";

type Props = {};

function BlogPage({}: Props) {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="font-mono text-3xl text-helix-cyan mb-2">
            &gt;&gt; {t("blog.title")}
          </h1>
          <p className="font-mono text-sm text-text-dim pl-4">
            {t("blog.description")}
          </p>
        </div>

        {/* Blog List */}
        <BlogList />
      </div>
    </div>
  );
}

export default BlogPage;
