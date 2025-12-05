import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema(
  {
    applicantName: String,
    documentType: String,
    email: String,
    phoneNumber: String,
    attestedDocument: String,
    originalDocument: String,
    paymentId: String,
    transactionNumber: String,
    transactionDate: String,
    totalPayment: String,
    verificationStatus: String,
    verificationDateTime: String,
    verifierName: String,
    urlLink: {
      type: String,
      unique: true,
    },
    urlNumber: {
      type: String,
      unique: true,
    },

    originalDocuments: [{ type: String }], // Array of image URLs or file paths
    attestedDocuments: [{ type: String }], // Array of image URLs or file paths
    status: { type: Boolean, default: false }, // true for approved, false for pending
  },
  { timestamps: true }
);

// Prevent model overwrite issues in dev
export const VerificationModel =
  mongoose.models.VerificationModel ||
  mongoose.model("VerificationModel", verificationSchema);
