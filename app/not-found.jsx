"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-red-500 mb-4 animate-pulse">
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-8">
          Oops! The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}
