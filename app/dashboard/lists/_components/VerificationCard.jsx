"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const VerificationCard = ({ VerificationData, index }) => {
  const router = useRouter();

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        const res = await fetch(`/api/verification/${id}`, {
          method: "DELETE",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to delete");
        }

        toast.success("Deleted successfully!");
        router.refresh();
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Error deleting item.");
      }
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    try {
      const res = await fetch(`/api/verification/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: !currentStatus }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      toast.success(
        `Status ${!currentStatus ? "approved" : "set to pending"}!`
      );
      router.refresh();
    } catch (error) {
      console.error("Status update error:", error);
      toast.error("Error updating status.");
    }
  };

  return (
    <div className="flex flex-col mt-2 items-center justify-center gap-2">
      <div className="p-4 w-full max-w-xl border rounded-lg shadow flex justify-between items-center bg-white hover:shadow-lg transition">
        <div>
          <Link
            href={`/User/&/page/preview/${VerificationData?.urlLink}`}
            className="text-lg font-semibold text-blue-600 hover:underline"
          >
            {index + 1}. {VerificationData?.applicantName}
          </Link>

          <p className="text-xs text-gray-500">
            Transaction Number: {VerificationData?.transactionNumber}
          </p>
          <p className="text-xs mt-1 text-gray-500">
            Time: {VerificationData?.verificationDateTime}
          </p>

          <span
            className={`inline-block mt-1 text-xs font-semibold px-2 py-1 rounded ${
              VerificationData?.status
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {VerificationData?.status ? "Paid" : "Unpaid"}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() =>
              handleStatusToggle(VerificationData._id, VerificationData.status)
            }
            className={`text-sm px-3 py-1.5 rounded-md transition ${
              VerificationData?.status
                ? "bg-gray-300 text-gray-800 hover:bg-gray-400"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {VerificationData?.status ? "Unpaid" : "Paid"}
          </button>

          <button
            onClick={() =>
              router.push(`/dashboard/update/${VerificationData._id}`)
            }
            className="bg-yellow-500 text-white text-sm px-3 py-1.5 rounded-md hover:bg-yellow-600 transition"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(VerificationData._id)}
            className="bg-red-500 text-white text-sm px-3 py-1.5 rounded-md hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationCard;
