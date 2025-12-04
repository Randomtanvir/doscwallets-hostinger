import { v2 as cloudinary } from "cloudinary";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload function
export async function uploadToCloudinary(file, folder = "uploads") {
  if (!file) throw new Error("No file provided for upload.");

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result); // result.secure_url, result.public_id
      }
    );
    uploadStream.end(buffer);
  });
}

// Extract public_id from URL (handles folder)
export const getPublicIdFromUrl = (url) => {
  try {
    // Example: https://res.cloudinary.com/demo/image/upload/v1699999999/folder/image.jpg
    const parts = url.split("/upload/")[1]; // v123456/folder/image.jpg
    const publicIdWithVersion = parts.split("/").slice(1).join("/"); // folder/image.jpg
    const publicId = publicIdWithVersion.replace(/\.[^/.]+$/, ""); // remove extension
    return publicId;
  } catch {
    return null;
  }
};

// Delete image from Cloudinary
export const deleteFromCloudinary = async (url) => {
  const publicId = getPublicIdFromUrl(url);
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
    console.log("🗑️ Deleted:", publicId);
  } catch (err) {
    console.error("❌ Cloudinary delete failed:", err);
  }
};
