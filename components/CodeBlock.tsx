"use client";

/**
 * Code block with a header bar (title + lang label) and neutral █ placeholders.
 */
export function CodeBlock({
  title = "POST /auth/login",
  lang = "http",
  body,
}: {
  title?: string;
  lang?: string;
  body?: string;
}) {
  const fallback = `POST █████████ HTTP/1.1
Host:         ████████████████
Content-Type: application/json
Authorization: Bearer ████████████

{
  "phone":   "+54 9 ███ ███ ████",
  "channel": "whatsapp",
  "otp":     "██████"
}`;

  return (
    <div className="border border-border bg-surface">
      <div className="flex items-center justify-between px-3 py-[7px] border-b border-border bg-surface-2">
        <span className="font-mono text-[11px] text-text-mute">{title}</span>
        <span className="font-mono text-[10px] text-text-dim tracking-[0.06em]">{lang.toUpperCase()}</span>
      </div>
      <pre className="font-mono m-0 px-4 py-3.5 text-[12.5px] leading-[1.7] text-text whitespace-pre overflow-hidden">
        {body ?? fallback}
        {"\n\n"}
        <span className="text-ok">→ 200 OK</span>
        {" ── "}{"████████"}{"ms"}
      </pre>
    </div>
  );
}
