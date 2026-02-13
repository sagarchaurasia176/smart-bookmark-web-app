"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to bookmarks by default
    router.replace("/dashboard/bookmarks");
  }, [router]);

  return null;
}
