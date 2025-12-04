import DigitalAttestationResult from "@/components/DigitalAttestationResult";
import { getSingleVerificationDataByURLLINK } from "@/utils/fetcher";

// ⭐ This is a pure SERVER COMPONENT (no "use client")

export default async function Page({ params }) {
  const { id } = await params;

  // Fetch data on the server
  const result = await getSingleVerificationDataByURLLINK(id);

  if (result?.error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-red-500 mb-3">⚠️ Network slow or data not found.</p>
        <a
          href=""
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Retry
        </a>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  return <DigitalAttestationResult verificationData={result} />;
}
