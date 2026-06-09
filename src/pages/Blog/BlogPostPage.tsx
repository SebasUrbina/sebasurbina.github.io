import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Link as LinkIcon, 
  Check, 
  Twitter, 
  Linkedin,
  List
} from "lucide-react";
import MarkdownContent from "../../components/MarkdownContent";
import { BlogMetadata } from "../../types/Blog";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const { t, language } = useLanguage();
  const [postContent, setPostcontent] = useState<string>("");
  const [metadata, setMetadata] = useState<BlogMetadata | null>(null);
  const [nextPost, setNextPost] = useState<BlogMetadata | null>(null);
  const [prevPost, setPrevPost] = useState<BlogMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Interactive features state
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeId, setActiveId] = useState<string>("");
  const [copied, setCopied] = useState(false);

  // Fetch content and metadata
  useEffect(() => {
    setIsLoading(true);
    
    // Fetch Markdown Content
    const fetchContent = fetch(`/posts/${slug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error("Post file not found");
        return res.text();
      })
      .then((content) => {
        setPostcontent(content);
      });

    // Fetch Metadata to match current post, and previous/next navigation
    const fetchMetadata = fetch("/posts/metadata.json")
      .then((res) => {
        if (!res.ok) throw new Error("Metadata file not found");
        return res.json();
      })
      .then((data: BlogMetadata[]) => {
        const index = data.findIndex((p) => p.slug === slug);
        if (index !== -1) {
          setMetadata(data[index]);
          // Posts are sorted chronological. Prev post is older (index - 1), Next post is newer (index + 1)
          setPrevPost(index > 0 ? data[index - 1] : null);
          setNextPost(index < data.length - 1 ? data[index + 1] : null);
        }
      });

    Promise.all([fetchContent, fetchMetadata])
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error loading blog post elements", err);
        setIsLoading(false);
      });
  }, [slug]);

  // Scroll Progress Bar calculation
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercent(percent);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter markdown content to avoid rendering duplicate H1 title if present
  const cleanPostContent = useMemo(() => {
    if (!postContent) return "";
    // Removes the first heading line starting with "# " (representing the title in raw markdown)
    return postContent.replace(/^#\s+.+$/m, "").trim();
  }, [postContent]);

  // Dynamically calculate Reading Time
  const readingTime = useMemo(() => {
    if (!postContent) return 1;
    const words = postContent.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 225)); // average reading speed of 225 wpm
  }, [postContent]);

  // Dynamically extract headings for Table of Contents
  const headings = useMemo((): HeadingItem[] => {
    if (!cleanPostContent) return [];
    const lines = cleanPostContent.split("\n");
    const extracted: HeadingItem[] = [];
    let inCodeBlock = false;

    for (const line of lines) {
      if (line.startsWith("```")) {
        inCodeBlock = !inCodeBlock;
        continue;
      }
      if (inCodeBlock) continue;

      const match = line.match(/^(##|###)\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-");
        extracted.push({ id, text, level });
      }
    }
    return extracted;
  }, [cleanPostContent]);

  // Active heading highlighting on scroll
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Filter elements that are intersecting (visible in the top half of the screen)
        const visibleHeadings = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target.id);

        if (visibleHeadings.length > 0) {
          // Choose the first visible heading
          setActiveId(visibleHeadings[0]);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  // Copy Link action
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Could not copy link", err);
    }
  };

  // Format Date gracefully based on current language context
  const formattedDate = useMemo(() => {
    if (!metadata) return "";
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(metadata.date).toLocaleDateString(language === "es" ? "es-ES" : "en-US", options);
  }, [metadata, language]);

  return (
    <div className="min-h-screen pb-20">
      {/* Elegantly animated scroll progress bar */}
      <div className="fixed top-0 left-0 w-full h-[3.5px] bg-transparent z-[9999] pointer-events-none">
        <motion.div 
          className="h-full bg-gradient-to-r from-helix-cyan via-helix-blue to-helix-teal shadow-[0_0_10px_rgba(0,188,212,0.8)]"
          style={{ width: `${scrollPercent}%` }}
          layoutId="scrollProgress"
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 py-8 md:py-12 max-w-7xl">
        {/* Navigation Breadcrumb & Back button */}
        <div className="mb-8">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 font-mono text-sm text-text-dim hover:text-helix-cyan transition-colors group select-none"
          >
            <ArrowLeft size={16} className="transform group-hover:-translate-x-1.5 transition-transform" />
            <span>&lt;&lt; {t("blog.backToBlog")}</span>
          </Link>
        </div>

        {isLoading ? (
          /* High-quality skeleton loading state */
          <div className="max-w-4xl mx-auto py-12 space-y-8 animate-pulse font-mono">
            <div className="h-4 w-32 bg-space-deep rounded" />
            <div className="h-10 w-3/4 bg-space-deep rounded" />
            <div className="flex gap-4">
              <div className="h-4 w-24 bg-space-deep rounded" />
              <div className="h-4 w-24 bg-space-deep rounded" />
            </div>
            <hr className="border-space-deep" />
            <div className="space-y-4">
              <div className="h-4 w-full bg-space-deep rounded" />
              <div className="h-4 w-full bg-space-deep rounded" />
              <div className="h-4 w-5/6 bg-space-deep rounded" />
              <div className="h-4 w-4/5 bg-space-deep rounded" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Blog Post content column */}
            <div className="lg:col-span-3 max-w-3xl w-full mx-auto lg:mx-0">
              <article>
                {/* Modern styled Post Header */}
                <header className="mb-8 pb-8 border-b border-helix-cyan/15">
                  <h1 className="font-mono text-3xl md:text-4xl font-bold text-text-bright leading-tight mb-4 tracking-tight">
                    <span className="text-helix-cyan select-none">&gt;&gt; </span>
                    {metadata?.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs md:text-sm text-text-dim">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-helix-teal" />
                      {formattedDate}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} className="text-helix-teal" />
                      {readingTime} {t("blog.readingTime")}
                    </span>

                    {/* Social share action button */}
                    <button
                      onClick={handleCopyLink}
                      className="inline-flex items-center gap-1.5 hover:text-helix-cyan transition-colors cursor-pointer"
                      title={t("blog.share")}
                    >
                      {copied ? (
                        <>
                          <Check size={14} className="text-helix-green animate-bounce" />
                          <span className="text-helix-green font-semibold">{t("blog.copied")}</span>
                        </>
                      ) : (
                        <>
                          <Share2 size={14} />
                          <span>{t("blog.share")}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Badges / Tags */}
                  {metadata?.tags && metadata.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {metadata.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-xs text-helix-teal bg-helix-teal/5 border border-helix-teal/15 px-2.5 py-0.5 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </header>

                {/* Main Rendered Markdown content */}
                <div className="prose-container">
                  <MarkdownContent content={cleanPostContent} />
                </div>

                {/* Post Footer Actions & Navigation */}
                <footer className="mt-12 pt-8 border-t border-helix-cyan/15">
                  {/* Share panel */}
                  <div className="bg-space-deep/20 border border-helix-cyan/10 rounded-lg p-6 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
                    <div>
                      <h4 className="text-text-bright text-sm font-semibold mb-1">Disfrutaste la lectura?</h4>
                      <p className="text-text-dim text-xs">Comparte este artículo con otros entusiastas de la tecnología.</p>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        onClick={handleCopyLink}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 text-xs bg-space-darker hover:bg-space-deep border border-helix-cyan/25 rounded hover:border-helix-cyan text-text-primary transition-colors cursor-pointer"
                      >
                        {copied ? (
                          <>
                            <Check size={14} className="text-helix-green" />
                            <span className="text-helix-green">{t("blog.copied")}</span>
                          </>
                        ) : (
                          <>
                            <LinkIcon size={14} />
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(metadata?.title || "")}&url=${encodeURIComponent(window.location.href)}`, "_blank")}
                        className="inline-flex items-center justify-center p-2 text-xs bg-space-darker hover:bg-space-deep border border-helix-cyan/25 rounded hover:border-helix-cyan text-text-primary transition-colors cursor-pointer"
                        title="Twitter / X"
                      >
                        <Twitter size={14} />
                      </button>
                      <button
                        onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, "_blank")}
                        className="inline-flex items-center justify-center p-2 text-xs bg-space-darker hover:bg-space-deep border border-helix-cyan/25 rounded hover:border-helix-cyan text-text-primary transition-colors cursor-pointer"
                        title="LinkedIn"
                      >
                        <Linkedin size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 font-mono text-sm mt-8">
                    {prevPost ? (
                      <Link 
                        to={`/blog/${prevPost.slug}`}
                        className="flex-1 p-4 border border-helix-cyan/10 hover:border-helix-cyan/30 rounded-lg bg-space-deep/10 hover:bg-space-deep/20 transition-all group text-left"
                      >
                        <span className="text-xs text-text-dim block mb-1">← {t("blog.prevPost")}</span>
                        <span className="text-text-bright group-hover:text-helix-teal transition-colors line-clamp-1">{prevPost.title}</span>
                      </Link>
                    ) : (
                      <div className="flex-1 hidden sm:block" />
                    )}

                    {nextPost ? (
                      <Link 
                        to={`/blog/${nextPost.slug}`}
                        className="flex-1 p-4 border border-helix-cyan/10 hover:border-helix-cyan/30 rounded-lg bg-space-deep/10 hover:bg-space-deep/20 transition-all group text-right"
                      >
                        <span className="text-xs text-text-dim block mb-1">{t("blog.nextPost")} →</span>
                        <span className="text-text-bright group-hover:text-helix-teal transition-colors line-clamp-1">{nextPost.title}</span>
                      </Link>
                    ) : (
                      <div className="flex-1 hidden sm:block" />
                    )}
                  </div>
                </footer>
              </article>
            </div>

            {/* Sidebar Table of Contents column */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24 self-start space-y-6">
                <div className="p-5 border border-helix-cyan/10 rounded-lg bg-space-darker/60 backdrop-blur-sm shadow-md font-mono">
                  <h3 className="text-helix-cyan text-xs font-semibold uppercase tracking-wider mb-4 pb-2 border-b border-helix-cyan/15 flex items-center gap-2">
                    <List size={14} />
                    <span>{t("blog.tableOfContents")}</span>
                  </h3>
                  
                  {headings.length === 0 ? (
                    <p className="text-xs text-text-dim italic">Post is quick-read, no subtitles.</p>
                  ) : (
                    <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                      {headings.map((h) => (
                        <a
                          key={h.id}
                          href={`#${h.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className={`block text-xs py-1.5 transition-colors leading-tight ${
                            h.level === 3 ? "pl-4 text-text-dim" : "font-medium"
                          } ${
                            activeId === h.id 
                              ? "text-helix-cyan border-l border-helix-cyan pl-2 -ml-2" 
                              : "text-text-dim hover:text-text-bright"
                          }`}
                        >
                          {h.text}
                        </a>
                      ))}
                    </nav>
                  )}
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
