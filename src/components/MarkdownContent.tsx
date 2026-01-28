import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

type Props = {
  content: string;
};

function MarkdownContent({ content }: Props) {
  return (
    <div className="markdown font-mono">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-helix-cyan mb-6 mt-8">
              &gt;&gt; {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-helix-teal mb-4 mt-6">
              &gt; {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold text-text-bright mb-3 mt-4">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-text-primary mb-4 leading-relaxed">
              {children}
            </p>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-helix-cyan hover:text-helix-teal underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="list-none space-y-2 mb-4 pl-4">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 mb-4 pl-4 text-text-primary">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-text-primary">
              <span className="text-helix-cyan mr-2">&gt;</span>
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-helix-cyan/50 pl-4 py-2 my-4 text-text-dim italic">
              {children}
            </blockquote>
          ),
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");

            return !inline && match ? (
              <div className="my-4 border border-helix-cyan/30">
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{
                    margin: 0,
                    background: "#0a1929",
                    fontSize: "0.875rem",
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className="bg-space-darker px-1.5 py-0.5 text-helix-teal text-sm border border-helix-cyan/20">
                {children}
              </code>
            );
          },
          hr: () => (
            <hr className="border-helix-cyan/30 my-8" />
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="w-full border border-helix-cyan/30">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-space-darker border-b border-helix-cyan/30">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2 text-left text-helix-cyan font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2 border-t border-helix-cyan/20 text-text-primary">
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
