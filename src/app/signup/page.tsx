"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // to wait for token check
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // This only runs client side
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    setLoading(false);
  }, []);


  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    const response = await fetch(
      "http://localhost:3001/api/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      console.log(222)
      router.push(`/home/${username}`);
    } else {
      // Handle errors
      alert("Register failed");
    }
  }

  if (loading) {
    // Optionally render loading state while checking token
    return <div>Loading...</div>;
  }

  if (token) {
    // If token exists, redirect to home (client side)
    router.push("/home/user");
    return null; // render nothing while redirecting
  }

  // No token, show login form
  return (
    <div className="mt-[20px] bg-gray-50 flex flex-col items-center justify-center">
      <header className="justify-items-center">
        <img
          src="./main-logo.png"
          alt="main logo"
          className="m-auto mb-[40px]"
        />
        <div className="mt-[0]">
          <h2 className="text-center text-[22px] text-black font-medium">
            Hello, Welcome!
          </h2>
          <p className="text-center text-[gray] text-[16px]">Sign up to continue</p>
        </div>
      </header>

      <main className="justify-items-center mt-[50px] h-[100%] bg-white rounded-xl">
        <form
          className="w-[330px] flex flex-col w-4\5 p-6"
          onSubmit={handleSubmit}
        >
          <p className="mb-[10px]">Username</p>
          <input
            type="text"
            name="username"
            placeholder="username"
            className="mb-[20px] w-[100%] h-[40px] rounded-xl border-1 border-gray-300 border-gray-50 p-2"
            required
          />
          <p className="mb-[10px]">Password</p>
          <input
            type="password"
            name="password"
            placeholder="password"
            className="mb-[20px] w-[100%] h-[40px] rounded-xl border-1 border-gray-300 border-gray-50 p-2"
            required
          />

          <button className="h-[48px] bg-[#2879E4] w-[100%] text-white mx-auto rounded-4xl mt-[30px]">
            Sign Up
          </button>
        </form>
      </main>

      <footer className="m-auto bottom-4 w-full mt-[30px]">
        <p className="text-sm text-center mb-[20px]">
          Have account? <a href="/login" className="text-blue-500">Sign In</a>
        </p>
      </footer>
    </div>
  );
}
