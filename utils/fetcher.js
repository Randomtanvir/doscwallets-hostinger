"use server";

// Fetch all verifications with pagination
export async function getAllVerificationData(page = 1, limit = 5) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(
      `${apiUrl}/verification?page=${page}&limit=${limit}`,
      {
        cache: "no-store", // always fresh data
      }
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch verification data. Status: ${res.status}`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("❌ getAllVerificationData Error:", error);
    return { error: true, message: error.message };
  }
}

// Fetch single verification by ID
export const getSingleVerificationData = async (id) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${apiUrl}/verification/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch verification. Status: ${res.status}`);
    }

    const data = await res.json();
    return data?.application || {};
  } catch (error) {
    console.error("❌ getSingleVerificationData Error:", error);
    return { error: true, message: "Data fetch error" };
  }
};

// Fetch single verification by URL link (with retry)
export const getSingleVerificationDataByURLLINK = async (url) => {
  const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(`${apiUrl}/${url}`, { cache: "no-store" });

      if (res.ok) {
        const data = await res.json();
        return data?.application || {};
      } else {
        console.warn(
          `Attempt ${attempt + 1}: Failed with status ${res.status}`
        );
      }
    } catch (err) {
      console.warn(`Attempt ${attempt + 1}: Fetch error`, err);
      if (attempt === 1) throw err; // second attempt fail হলে throw করো
    }
  }

  return { error: true, message: "Data fetch error" };
};
