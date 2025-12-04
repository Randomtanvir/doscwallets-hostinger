import VerificationCard from "./_components/VerificationCard";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getAllVerificationData } from "@/utils/fetcher";

// ⭐ This is a SERVER COMPONENT (no "use client")

export default async function ListsPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams?.page) || 1;
  const limit = 10;

  // Fetch data on the server
  const result = await getAllVerificationData(page, limit);

  const verificationInfo = result?.verificationInfo || [];
  const pagination = result?.pagination || {};
  const error = result?.error ? result?.message : null;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-red-500 mb-3">⚠️ {error}</p>
        <Link
          href="/lists"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Retry
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Link
        href="/dashboard"
        className="text-2xl block font-bold text-green-500 mb-6 text-center hover:underline hover:text-green-700 transition-all"
      >
        HOME
      </Link>

      {/* Results */}
      {verificationInfo.length > 0 ? (
        verificationInfo.map((veri, i) => (
          <VerificationCard key={veri._id} index={i} VerificationData={veri} />
        ))
      ) : (
        <p className="text-center text-gray-500">No applications found.</p>
      )}

      {/* Pagination */}
      {pagination?.totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8">
          {/* Prev */}
          {pagination.hasPrevPage ? (
            <Link
              href={`?page=${pagination.currentPage - 1}`}
              className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-green-400 to-green-600 text-white rounded-xl shadow hover:opacity-90 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Prev
            </Link>
          ) : (
            <span className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-400 rounded-xl cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
              Prev
            </span>
          )}

          {/* Page Info */}
          <span className="px-4 py-2 font-semibold text-lg text-green-700 bg-green-100 rounded-lg shadow-sm">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>

          {/* Next */}
          {pagination.hasNextPage ? (
            <Link
              href={`?page=${pagination.currentPage + 1}`}
              className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-400 to-blue-600 text-white rounded-xl shadow hover:opacity-90 transition"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <span className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-400 rounded-xl cursor-not-allowed">
              Next
              <ChevronRight className="w-4 h-4" />
            </span>
          )}
        </div>
      )}
    </div>
  );
}
