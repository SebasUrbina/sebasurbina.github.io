import React from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownContentProps {
  content: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  return (
    <div
      className="markdown-content"
      style={{
        maxWidth: "none",
        fontSize: "1.125rem",
        lineHeight: "1.75rem",
      }}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;
