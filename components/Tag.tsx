import { cn } from "@/lib/utils";

type TagProps = {
  children: React.ReactNode;
  className?: string;
};

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-300",
        className,
      )}
    >
      {children}
    </span>
  );
}
