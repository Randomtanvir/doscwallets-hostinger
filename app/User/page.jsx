"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PreviewMain() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash; // "#/page/preview/ID"

    if (hash.startsWith("#/")) {
      const newUrl = hash.replace("#/", "&/");
      router.replace(`/User/${newUrl}`);
    }
  }, [router]);

  return null;
}
