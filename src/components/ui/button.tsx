import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

const styles = {
  primary:
    "bg-zinc-900 text-zinc-50 hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300",
  secondary:
    "border border-zinc-300 text-zinc-900 hover:border-zinc-900 dark:border-zinc-700 dark:text-zinc-50 dark:hover:border-zinc-300",
} as const;

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
