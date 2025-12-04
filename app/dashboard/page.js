import React from "react";
import Link from "next/link";
import { Plus, List } from "lucide-react";

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-6 justify-center items-center h-screen bg-gray-50 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl">
        <Link
          href="/dashboard/create"
          className="flex items-center gap-3 p-5 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
        >
          <Plus className="w-5 h-5" />
          <span className="text-base font-medium">Add a Verification Info</span>
        </Link>

        <Link
          href="/dashboard/lists"
          className="flex items-center gap-3 p-5 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          <List className="w-5 h-5" />
          <span className="text-base font-medium">Certificate List</span>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
