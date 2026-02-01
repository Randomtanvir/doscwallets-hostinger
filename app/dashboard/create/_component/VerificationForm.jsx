"use client";
import { generateEncodedString } from "@/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function VerificationForm({
  isEdit = false,
  verifactionData = {},
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      transactionNumber: "VN00416",
      paymentId: "202563914675",
      totalPayment: "OMR 25.75",
      transactionDate: "10 FEB 2026",
      documentType: "Marriage certificate",
      applicantName: "",
      email: "@gmail.com",
      phoneNumber: "78943",
      verifierName: "Foreign Ministry - Oman",
      verificationStatus: "Approved",
      verificationDateTime: "2026-02-10 11:03:06",
      urlLink: verifactionData?.urlLink || generateEncodedString(),
    },
  });

  const formFields = [
    { label: "Transaction Number", name: "transactionNumber" },
    { label: "Payment ID", name: "paymentId" },
    { label: "Total Payment", name: "totalPayment" },
    { label: "Transaction Date", name: "transactionDate" },
    { label: "Document Type", name: "documentType" },
    { label: "Applicant Name", name: "applicantName" },
    { label: "Email ID", name: "email" },
    { label: "Phone Number", name: "phoneNumber" },
    { label: "Verifier Name", name: "verifierName" },
    { label: "Verification Status", name: "verificationStatus" },
    { label: "Verification Date & Time", name: "verificationDateTime" },
    { label: "URL Link", name: "urlLink" },
  ];

  useEffect(() => {
    if (isEdit && verifactionData) {
      reset(verifactionData);
    }
  }, [isEdit, verifactionData, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    formFields.forEach((field) => {
      formData.append(field.name, data[field.name] || "");
    });

    if (data.originalDocuments?.length) {
      for (let i = 0; i < data.originalDocuments.length; i++) {
        formData.append("originalDocuments", data.originalDocuments[i]);
      }
    }

    if (data.attestedDocuments?.length) {
      for (let i = 0; i < data.attestedDocuments.length; i++) {
        formData.append("attestedDocuments", data.attestedDocuments[i]);
      }
    }

    try {
      setLoading(true);
      const res = await fetch(
        isEdit
          ? `/api/verification/${verifactionData._id}`
          : "/api/verification",
        {
          method: isEdit ? "PATCH" : "POST",
          body: formData,
        },
      );

      if (!res.ok) throw new Error("Something went wrong");
      const result = await res.json();
      toast.success(
        isEdit
          ? "Verification updated successfully!"
          : "Verification created successfully!",
      );
      router.push("/dashboard/lists");
    } catch (err) {
      console.error(err);
      alert("Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-4 mt-4 bg-white rounded shadow space-y-4"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {isEdit ? "Edit Verification" : "Add New Verification"}
      </h2>

      {formFields.map((field) => (
        <div key={field.name} className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            {field.label}
          </label>
          <input
            {...register(field.name)}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      ))}

      <div>
        <label className="block mb-2 font-medium">Original Documents</label>
        <input
          type="file"
          multiple
          {...register("originalDocuments")}
          className="border p-2 rounded"
          accept="image/*"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Attested Documents</label>
        <input
          type="file"
          multiple
          {...register("attestedDocuments")}
          className="border p-2 rounded"
          accept="image/*"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
      >
        {isEdit ? "Update" : "Submit"}
      </button>
    </form>
  );
}
