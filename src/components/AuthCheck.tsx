"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface AuthCheckProps {
  children: ReactNode;
}

export default function AuthCheck({ children }: AuthCheckProps) {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenGoogle = params.get("token");

    const token = localStorage.getItem("token");

    if (!token || !tokenGoogle) {
        router.replace("/login"); // no token → redirect to login
    } else {
        if(token) localStorage.setItem("token", token); // save token for AuthCheck
        if(tokenGoogle) localStorage.setItem("token", tokenGoogle); // save token for AuthCheck
        router.replace("/dashboard"); // redirect to protected page
    }
  }, [router]);

  return <>{children}</>; // render children only if token exists
}
