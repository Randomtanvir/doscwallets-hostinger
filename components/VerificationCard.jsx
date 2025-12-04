import React from "react";
import toast from "react-hot-toast";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Link, useNavigate } from "react-router-dom";

const VerificationCard = ({ VerificationData, index }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        const docRef = doc(db, "verifications", id);
        await deleteDoc(docRef);

        toast.success("Deleted successfully!");
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Error deleting item.");
      }
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    try {
      const docRef = doc(db, "verifications", id);

      // Determine the new status
      const newStatus = currentStatus === "paid" ? "unpaid" : "paid";

      // Update Firestore document
      await updateDoc(docRef, {
        status: newStatus,
      });

      toast.success(`Status set to ${newStatus}!`);
    } catch (error) {
      console.error("Status update error:", error);
      toast.error("Error updating status.");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="p-4 w-full max-w-xl border rounded-lg shadow flex justify-between items-center bg-white hover:shadow-lg transition">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900 ">
              {index + 1}.
            </span>
            <Link
              to={`/User/#/page/preview/${VerificationData?.urlLink}`}
              className="text-lg font-semibold text-blue-600 hover:underline"
            >
              {VerificationData?.applicantName}
            </Link>
          </div>

          <p className="text-sm text-gray-500">
            Transaction Number: {VerificationData?.transactionNumber}
          </p>

          <span
            className={`inline-block mt-1 text-xs font-semibold px-2 py-1 rounded ${
              VerificationData?.status === "paid"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {VerificationData?.status?.toLowerCase() === "paid"
              ? "Paid"
              : "Unpaid"}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() =>
              handleStatusToggle(VerificationData.id, VerificationData.status)
            }
            className={`text-sm px-3 py-1.5 rounded-md transition ${
              VerificationData?.status === "unpaid"
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-300 text-gray-800 hover:bg-gray-400"
            }`}
          >
            {VerificationData?.status === "paid" ? "Unpaid" : "Paid"}
          </button>

          <button
            onClick={() => navigate(`/dashboard/update/${VerificationData.id}`)}
            className="bg-yellow-500 text-white text-sm px-3 py-1.5 rounded-md hover:bg-yellow-600 transition"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(VerificationData.id)}
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
