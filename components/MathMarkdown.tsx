import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';

interface MathMarkdownProps {
  content: string;
}

// NOTE: Ensure 'katex', 'react-markdown', 'rehype-katex', 'remark-math', 'remark-gfm' are installed.
// The styles for KaTeX are loaded in index.html

const MathMarkdown: React.FC<MathMarkdownProps> = ({ content }) => {
  return (
    <div className="prose prose-teal max-w-none dark:prose-invert">
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex]}
        components={{
          // Customize standard HTML elements if needed for Tailwind
          p: ({node, ...props}) => <p className="mb-2 leading-relaxed" {...props} />,
          h1: ({node, ...props}) => <h1 className="text-xl font-bold mb-2 text-teal-900" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-lg font-semibold mb-2 text-teal-800" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2 ml-2" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-2 ml-2" {...props} />,
          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-teal-500 pl-4 italic text-gray-600 bg-teal-50 py-2 rounded-r my-2" {...props} />,
          code: ({node, inline, className, children, ...props}: any) => {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <div className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto my-2 text-sm">
                 <code className={className} {...props}>
                    {children}
                 </code>
              </div>
            ) : (
              <code className="bg-teal-100 text-teal-900 px-1 py-0.5 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            )
          }
        }}
      />
    </div>
  );
};

export default MathMarkdown;