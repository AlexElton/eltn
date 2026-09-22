export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-6 text-sm text-zinc-500 dark:text-zinc-400">
        <p>© {new Date().getFullYear()} eltn</p>
        <p>Built with Next.js</p>
      </div>
    </footer>
  );
}
