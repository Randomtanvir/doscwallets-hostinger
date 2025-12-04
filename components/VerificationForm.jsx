import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../lib/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { uploadMultipleImagesToCloudinary } from "../lib/uploadMultipleImages";
import { isUrlLinkUnique } from "../lib/checkUniqueUrlLink";
import { useNavigate } from "react-router-dom";
import { generateEncodedString } from "../lib";

export default function VerificationForm({
  isEdit = false,
  verifactionData = {},
}) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      transactionNumber: "VN00403",
      paymentId: "202569014675",
      totalPayment: "OMR 25.75",
      transactionDate: "19 NOV 2025",
      documentType: "Marriage certificate",
      applicantName: "",
      email: "@gmail.com",
      phoneNumber: "78997",
      verifierName: "Foreign Ministry - Oman",
      verificationStatus: "Approved",
      verificationDateTime: "2025-11-19 11:02:36",
      urlLink: verifactionData?.urlLink || generateEncodedString(),
      urlNumber: "1400",
      status: "unpaid",
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
    { label: "URL Number", name: "urlNumber" },
    { label: "Status", name: "status" },
  ];

  useEffect(() => {
    if (isEdit && verifactionData) {
      reset(verifactionData);
    }
  }, [isEdit, verifactionData, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const originalDocs = data.originalDocuments?.length
        ? await uploadMultipleImagesToCloudinary(
            data.originalDocuments,
            "originalDocuments"
          )
        : [];

      const attestedDocs = data.attestedDocuments?.length
        ? await uploadMultipleImagesToCloudinary(
            data.attestedDocuments,
            "attestedDocuments"
          )
        : [];

      const payload = {
        ...data,
        originalDocuments: originalDocs,
        attestedDocuments: attestedDocs,
        createdAt: new Date(),
      };

      delete payload.originalDocumentsFiles;
      delete payload.attestedDocumentsFiles;

      if (isEdit) {
        const docRef = doc(db, "verifications", verifactionData.id);
        await updateDoc(docRef, payload);
        toast.success("Verification updated successfully!");
      } else {
        const isUnique = await isUrlLinkUnique(data.urlLink);
        if (!isUnique) {
          toast.error("URL Link must be unique — already exists!");
          return;
        }

        await addDoc(collection(db, "verifications"), payload);
        toast.success("Verification created successfully!");
      }

      navigate("/dashboard/lists");
    } catch (err) {
      console.error(err);
      toast.error("Submission failed.");
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
