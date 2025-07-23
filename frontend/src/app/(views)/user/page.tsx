// app/user/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/user/orders");
  }, [router]);

  return null;
}
