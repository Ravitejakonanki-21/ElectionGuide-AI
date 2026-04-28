import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | ElectionGuide AI",
  description: "The page you were looking for could not be found.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md">
        <div className="mb-4 text-6xl font-bold text-blue-700 dark:text-blue-400">404</div>
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="mt-3 text-sm text-black/60 dark:text-white/60">
          The page you were looking for doesn&apos;t exist or may have been moved.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            Back to home
          </Link>
          <Link
            href="/assistant"
            className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-50 dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            Ask Election AI
          </Link>
        </div>
      </div>
    </main>
  );
}
