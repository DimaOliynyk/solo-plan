// hooks/useUser.ts
"use client";

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getUser, User } from '../lib/api';

export const useUser = (): UseQueryResult<User, Error> => {
  return useQuery<User, Error>({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
    retry: 1,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};


export async function loginUser({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const response = await fetch("https://solo-plan-server.onrender.com/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
}