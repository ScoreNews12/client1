
export default function AppFooter() {
  return (
    <footer className="bg-footer-background border-t border-gray-400 py-3 text-center w-full">
      <div className="px-4">
        <p className="text-xs text-footer-text">
          &copy; {new Date().getFullYear()} Anonymous Board - All posts are the responsibility of the individual poster.
        </p>
        <p className="text-xs text-footer-text mt-0.5">
          Server Time: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </footer>
  );
}
