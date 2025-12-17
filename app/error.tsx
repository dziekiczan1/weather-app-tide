"use client";

import { Button } from "@/components/ui/button";
import { ERROR_MESSAGES } from "@/lib/api-constants";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center bg-slate-900 p-8">
      <h2 className="text-2xl font-bold text-white mb-4">
        Something went wrong!
      </h2>
      <p className="text-red-300 mb-6 text-center max-w-md">
        {error.message || ERROR_MESSAGES.UNKNOWN_ERROR}
      </p>
      <Button
        onClick={reset}
        className="px-6 py-2 rounded-md bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-md hover:from-purple-600 hover:to-indigo-600 transition-colors duration-200"
      >
        Try again
      </Button>
    </div>
  );
}
