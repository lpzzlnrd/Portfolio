import ReactMarkdown from "react-markdown";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        h2: ({ children }) => <h2 className="pt-4 text-2xl font-semibold text-zinc-100">{children}</h2>,
        h3: ({ children }) => <h3 className="pt-3 text-lg font-semibold text-zinc-200">{children}</h3>,
        p: ({ children }) => <p className="text-sm leading-7 text-zinc-300">{children}</p>,
        ul: ({ children }) => <ul className="list-disc space-y-2 pl-6 text-sm leading-7 text-zinc-300">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal space-y-2 pl-6 text-sm leading-7 text-zinc-300">{children}</ol>,
        li: ({ children }) => <li>{children}</li>,
        blockquote: ({ children }) => <Callout>{children}</Callout>,
        code: ({ children, className }) => {
          const isInline = !className;
          if (isInline) {
            return <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-xs text-zinc-200">{children}</code>;
          }
          return <CodeBlock>{children}</CodeBlock>;
        },
        table: ({ children }) => (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-zinc-800 text-left text-sm">{children}</table>
          </div>
        ),
        th: ({ children }) => <th className="border border-zinc-800 bg-zinc-900 px-3 py-2 text-zinc-200">{children}</th>,
        td: ({ children }) => <td className="border border-zinc-800 px-3 py-2 text-zinc-300">{children}</td>,
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noreferrer" className="text-zinc-100 underline underline-offset-4">
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
