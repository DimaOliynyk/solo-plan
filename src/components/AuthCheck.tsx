"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface AuthCheckProps {
  children: ReactNode;
}

export default function AuthCheck({ children }: AuthCheckProps) {
  const router = useRouter();

  useEffect(() => {
    const publicPaths = ["/login", "/signup"]; // allow these routes
    const path = window.location.pathname;

    const params = new URLSearchParams(window.location.search);
    const tokenGoogle = params.get("token");
    const token = localStorage.getItem("token");

    if (!token && !tokenGoogle) {
      // not logged in → redirect to login if not public path
      if (!publicPaths.includes(path)) {
        router.replace("/login");
      }
    } else {
      // logged in → save tokens
      if (token) localStorage.setItem("token", token);
      if (tokenGoogle) localStorage.setItem("token", tokenGoogle);

      // if on public page, redirect to dashboard
      if (publicPaths.includes(path)) {
        router.replace("/dashboard");
      }
    }
  }, [router]);

  return <>{children}</>;
}
