"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("[ElectionGuide AI] Unhandled error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center dark:bg-[#0a0a0a]">
        <div className="max-w-md">
          <div className="mb-4 text-5xl">⚠️</div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Something went wrong
          </h1>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            An unexpected error occurred. Please try again or return to the home page.
          </p>
          {error.digest && (
            <p className="mt-2 font-mono text-xs text-gray-400">
              Error ID: {error.digest}
            </p>
          )}
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={reset}
              className="rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              Try again
            </button>
            <Link
              href="/"
              className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-50 dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
              Go home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
