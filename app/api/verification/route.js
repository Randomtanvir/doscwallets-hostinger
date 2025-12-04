import connectMongo from "@/db/db";
import { VerificationModel } from "@/models/verification.model";
import { uploadToCloudinary } from "@/utils/cloudinary";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectMongo();
    const body = await request.formData();

    // Multiple images upload — only if files exist
    const originalDocument = body
      .getAll("originalDocuments")
      .filter((file) => typeof file === "object" && file.size > 0);

    const originalDocumentArray = await Promise.all(
      originalDocument.map(async (file) => {
        const url = await uploadToCloudinary(file, "OriginalDocuments");
        return url;
      })
    );

    const attestedDocument = body
      .getAll("attestedDocuments")
      .filter((file) => typeof file === "object" && file.size > 0);

    const attestedImageArray = await Promise.all(
      attestedDocument.map(async (file) => {
        const url = await uploadToCloudinary(file, "AttestedDocuments");
        return url;
      })
    );

    // Build application data
    const applicationData = {
      applicantName: body.get("applicantName"),
      documentType: body.get("documentType"),
      email: body.get("email"),
      phoneNumber: body.get("phoneNumber"),
      paymentId: body.get("paymentId"),
      transactionNumber: body.get("transactionNumber"),
      transactionDate: body.get("transactionDate"),
      totalPayment: body.get("totalPayment"),
      verificationStatus: body.get("verificationStatus"),
      verificationDateTime: body.get("verificationDateTime"),
      verifierName: body.get("verifierName"),
      urlLink: body.get("urlLink"),
      urlNumber: body.get("urlNumber"),
      OriginalDocuments: originalDocumentArray,
      AttestedDocuments: attestedImageArray,
    };

    // Save to DB
    const application = new VerificationModel(applicationData);
    await application.save();

    return NextResponse.json(
      { message: "Application saved successfully", application },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error in POST /applications:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectMongo();

    // 🔹 Extract search params (default: page=1, limit=10)
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    // 🔹 Fetch data with pagination
    const verificationInfo = await VerificationModel.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // 🔹 Count total documents for pagination meta
    const totalDocs = await VerificationModel.countDocuments();
    const totalPages = Math.ceil(totalDocs / limit);

    return NextResponse.json(
      {
        message: "✅ Applications fetched successfully",
        verificationInfo,
        pagination: {
          totalDocs,
          totalPages,
          currentPage: page,
          pageSize: limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error in GET /applications:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
