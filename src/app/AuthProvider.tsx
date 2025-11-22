"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import AuthCheck from "../components/AuthCheck";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthCheck>
        {children}
      </AuthCheck>
    </QueryClientProvider>
  );
}
