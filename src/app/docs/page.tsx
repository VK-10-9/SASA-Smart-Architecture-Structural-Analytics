"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Docs() {
  const router = useRouter();

  useEffect(() => {
    router.push("/documentation");
  }, [router]);

  return null;
} 