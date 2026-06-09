import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Copy, Check } from "lucide-react";

type Props = {
  content: string;
};

// Robust helper to slugify React children to create section IDs
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const getSlug = (node: any): string => {
  if (!node) return "";
  if (typeof node === "string") {
    return node
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }
  if (Array.isArray(node)) {
    return node.map(getSlug).join("");
  }
  if (node.props && node.props.children) {
    return getSlug(node.props.children);
  }
  return "";
};

// Self-contained custom Code Block component with Copy button
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function CodeBlock({ children, language, ...props }: { children: string; language?: string; [key: string]: any }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code block!", err);
    }
  };

  return (
    <div className="relative group my-6 border border-helix-cyan/20 rounded-lg overflow-hidden bg-space-darker/90 shadow-lg">
      {/* Code Block Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-space-darker border-b border-helix-cyan/15 select-none text-xs font-mono">
        <span className="text-helix-teal font-medium uppercase tracking-wider">{language || "code"}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-text-dim hover:text-helix-cyan transition-colors cursor-pointer py-1 px-2 rounded hover:bg-space-deep/50"
          title="Copy Code"
        >
          {copied ? (
            <>
              <Check size={14} className="text-helix-green" />
              <span className="text-helix-green">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      {/* Code Content */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={language}
          PreTag="div"
          customStyle={{
            margin: 0,
            background: "transparent",
            fontSize: "0.875rem",
            padding: "1rem",
          }}
          {...props}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

function MarkdownContent({ content }: Props) {
  return (
    <div className="markdown-content font-sans text-text-primary/95 text-[16px] md:text-[17px] leading-relaxed tracking-normal max-w-none">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children }) => {
            const id = getSlug(children);
            return (
              <h1 id={id} className="scroll-mt-24 text-3xl font-bold text-helix-cyan mb-6 mt-8 font-mono border-b border-helix-cyan/20 pb-2">
                &gt;&gt; {children}
              </h1>
            );
          },
          h2: ({ children }) => {
            const id = getSlug(children);
            return (
              <h2 id={id} className="scroll-mt-24 text-2xl font-bold text-helix-cyan mb-4 mt-8 font-mono border-b border-helix-cyan/10 pb-2 flex items-center gap-2">
                <span className="text-helix-teal/75 select-none font-light">#</span> {children}
              </h2>
            );
          },
          h3: ({ children }) => {
            const id = getSlug(children);
            return (
              <h3 id={id} className="scroll-mt-24 text-xl font-bold text-text-bright mb-3 mt-6 font-mono flex items-center gap-2">
                <span className="text-helix-teal/40 select-none">&gt;</span> {children}
              </h3>
            );
          },
          p: ({ children }) => (
            <p className="text-text-primary/95 mb-6 leading-relaxed">
              {children}
            </p>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-helix-cyan hover:text-helix-teal underline transition-colors font-medium decoration-helix-cyan/30 hover:decoration-helix-teal"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="list-disc space-y-3 mb-6 pl-6 text-text-primary/95 marker:text-helix-cyan">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal space-y-3 mb-6 pl-6 text-text-primary/95 marker:text-helix-teal">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-text-primary/95 leading-relaxed pl-1">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-helix-cyan bg-space-deep/30 px-6 py-4 my-6 text-text-primary/80 italic rounded-r-lg shadow-sm">
              {children}
            </blockquote>
          ),
          /* eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");

            return !inline && match ? (
              <CodeBlock language={match[1]} {...props}>
                {String(children).replace(/\n$/, "")}
              </CodeBlock>
            ) : (
              <code className="bg-space-darker px-1.5 py-0.5 text-helix-teal text-sm border border-helix-cyan/15 rounded font-mono mx-1 font-semibold break-all">
                {children}
              </code>
            );
          },
          hr: () => (
            <hr className="border-helix-cyan/15 my-8" />
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-6 rounded-lg border border-helix-cyan/20 shadow-md">
              <table className="w-full border-collapse font-sans text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-space-darker border-b border-helix-cyan/20 select-none">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left text-helix-cyan font-semibold font-mono text-xs uppercase tracking-wider">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 border-t border-helix-cyan/10 text-text-primary/90">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}

export default MarkdownContent;
