import connectMongo from "@/db/db";
import { VerificationModel } from "@/models/verification.model";
import { deleteFromCloudinary, uploadToCloudinary } from "@/utils/cloudinary";
import { NextResponse } from "next/server";

// export async function PATCH(request, { params }) {
//   await connectMongo();
//   const { id } = await params;

//   try {
//     const contentType = request.headers.get("content-type");
//     if (contentType.includes("application/json")) {
//       // Handle JSON status or simple updates
//       const body = await request.json();
//       const application = await VerificationModel.findByIdAndUpdate(id, body, {
//         new: true,
//       });

//       if (!application) {
//         return NextResponse.json(
//           { error: "Verification not found" },
//           { status: 404 }
//         );
//       }

//       return NextResponse.json(
//         { message: "✅ Verification updated successfully", application },
//         { status: 200 }
//       );
//     }

//     if (contentType.includes("multipart/form-data")) {
//       // Handle full form-data update
//       const body = await request.formData();
//       const existingApplication = await VerificationModel.findById(id);

//       if (!existingApplication) {
//         return NextResponse.json(
//           { error: "Verification not found" },
//           { status: 404 }
//         );
//       }

//       // Original documents upload (if provided)
//       let originalDocuments = existingApplication.originalDocuments;
//       const originalFiles = body
//         .getAll("originalDocuments")
//         .filter((file) => typeof file === "object" && file.size > 0);
//       if (originalFiles.length > 0) {
//         originalDocuments = await Promise.all(
//           originalFiles.map(async (file) => {
//             const url = await uploadToCloudinary(file, "OriginalDocuments");
//             return url;
//           })
//         );
//       }

//       // Attested documents upload (if provided)
//       let attestedDocuments = existingApplication.attestedDocuments;
//       const attestedFiles = body
//         .getAll("attestedDocuments")
//         .filter((file) => typeof file === "object" && file.size > 0);
//       if (attestedFiles.length > 0) {
//         attestedDocuments = await Promise.all(
//           attestedFiles.map(async (file) => {
//             const url = await uploadToCloudinary(file, "AttestedDocuments");
//             return url;
//           })
//         );
//       }

//       // Build update data
//       const updateData = {
//         applicantName:
//           body.get("applicantName") || existingApplication.applicantName,
//         documentType:
//           body.get("documentType") || existingApplication.documentType,
//         email: body.get("email") || existingApplication.email,
//         phoneNumber: body.get("phoneNumber") || existingApplication.phoneNumber,
//         paymentId: body.get("paymentId") || existingApplication.paymentId,
//         transactionNumber:
//           body.get("transactionNumber") ||
//           existingApplication.transactionNumber,
//         transactionDate:
//           body.get("transactionDate") || existingApplication.transactionDate,
//         totalPayment:
//           body.get("totalPayment") || existingApplication.totalPayment,
//         verificationStatus:
//           body.get("verificationStatus") ||
//           existingApplication.verificationStatus,
//         verificationDateTime:
//           body.get("verificationDateTime") ||
//           existingApplication.verificationDateTime,
//         verifierName:
//           body.get("verifierName") || existingApplication.verifierName,
//         urlLink: body.get("urlLink") || existingApplication.urlLink,
//         urlNumber: body.get("urlNumber") || existingApplication.urlNumber,
//         originalDocuments,
//         attestedDocuments,
//       };

//       // Update DB record
//       const varifacationData = await VerificationModel.findByIdAndUpdate(
//         id,
//         updateData,
//         { new: true }
//       );

//       return NextResponse.json(
//         { message: "✅ Verification updated successfully", varifacationData },
//         { status: 200 }
//       );
//     }

//     // Unsupported content type
//     return NextResponse.json(
//       { error: "Unsupported Content-Type" },
//       { status: 400 }
//     );
//   } catch (error) {
//     console.error("❌ PATCH Error:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

// PATCH API
export async function PATCH(req, { params }) {
  await connectMongo();
  const { id } = await params;

  try {
    const contentType = req.headers.get("content-type") || "";

    // JSON update
    if (contentType.includes("application/json")) {
      const body = await req.json();
      const app = await VerificationModel.findByIdAndUpdate(id, body, {
        new: true,
      });
      if (!app)
        return NextResponse.json(
          { error: "Verification not found" },
          { status: 404 }
        );
      return NextResponse.json({ message: "Updated", app }, { status: 200 });
    }

    // FormData update
    if (contentType.includes("multipart/form-data")) {
      const body = await req.formData();
      const existingApp = await VerificationModel.findById(id);
      if (!existingApp)
        return NextResponse.json(
          { error: "Verification not found" },
          { status: 404 }
        );

      // --- Original Documents ---
      let originalDocs = existingApp.originalDocuments || [];
      const originalFiles = body
        .getAll("originalDocuments")
        .filter((f) => f && f.size > 0);

      if (originalFiles.length > 0) {
        // Delete old images
        for (const url of originalDocs) await deleteFromCloudinary(url);

        // Upload new images
        const uploadedOriginals = await Promise.all(
          originalFiles.map((file) =>
            uploadToCloudinary(file, "OriginalDocuments")
          )
        );
        originalDocs = uploadedOriginals.map((r) => r.secure_url);
      }

      // --- Attested Documents ---
      let attestedDocs = existingApp.attestedDocuments || [];
      const attestedFiles = body
        .getAll("attestedDocuments")
        .filter((f) => f && f.size > 0);

      if (attestedFiles.length > 0) {
        // Delete old images
        for (const url of attestedDocs) await deleteFromCloudinary(url);

        // Upload new images
        const uploadedAttested = await Promise.all(
          attestedFiles.map((file) =>
            uploadToCloudinary(file, "AttestedDocuments")
          )
        );
        attestedDocs = uploadedAttested.map((r) => r.secure_url);
      }

      // Build update data
      const updateData = {
        applicantName: body.get("applicantName") || existingApp.applicantName,
        documentType: body.get("documentType") || existingApp.documentType,
        email: body.get("email") || existingApp.email,
        phoneNumber: body.get("phoneNumber") || existingApp.phoneNumber,
        paymentId: body.get("paymentId") || existingApp.paymentId,
        transactionNumber:
          body.get("transactionNumber") || existingApp.transactionNumber,
        transactionDate:
          body.get("transactionDate") || existingApp.transactionDate,
        totalPayment: body.get("totalPayment") || existingApp.totalPayment,
        verificationStatus:
          body.get("verificationStatus") || existingApp.verificationStatus,
        verificationDateTime:
          body.get("verificationDateTime") || existingApp.verificationDateTime,
        verifierName: body.get("verifierName") || existingApp.verifierName,
        urlLink: body.get("urlLink") || existingApp.urlLink,
        urlNumber: body.get("urlNumber") || existingApp.urlNumber,
        originalDocuments: originalDocs,
        attestedDocuments: attestedDocs,
      };

      const updatedApp = await VerificationModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );
      return NextResponse.json(
        { message: "Updated", updatedApp },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: "Unsupported Content-Type" },
      { status: 400 }
    );
  } catch (error) {
    console.error("❌ PATCH Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectMongo();
    const { id } = await params;
    console.log(id);

    // Delete the application from the database
    const deletedApplication = await VerificationModel.findByIdAndDelete(id);

    if (!deletedApplication) {
      return NextResponse.json(
        { message: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "✅ Application deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error in DELETE /attestations/:id:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    await connectMongo();
    const { id } = await params;

    // Fetch the application from the database
    const application = await VerificationModel.findById(id);

    if (!application) {
      return NextResponse.json(
        { message: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "✅ Application fetched successfully", application },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error in GET /attestations/:id:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
