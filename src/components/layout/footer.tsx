export function Footer() {
  return (
    <footer className="border-t border-primary/20">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-6 text-sm text-foreground/60">
        <p>© {new Date().getFullYear()} eltn</p>
        <p>Built with Next.js</p>
      </div>
    </footer>
  );
}
