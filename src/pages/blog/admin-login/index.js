import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Footer from "@/components/footer";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    // Check username and password
    if (username === "kdwiki" && password === "123") {
      // Redirect to admin page
      router.push("/blog/admin-page");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    
    <div className="bg-white h-full">

    <div className="container mx-auto max-w-screen-lg py-40 px-20 w-1/3 text-black">
      <h1 className="text-3xl font-bold mb-10 text-center">Admin Login</h1>
      <form onSubmit={handleLogin} className="max-w-sm">
        <div className="mb-4">
          <label htmlFor="username" className="block  mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="border border-gray-300 bg-white px-3 py-2 rounded-sm w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block  mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border border-gray-300 bg-white px-3 py-2 rounded-sm w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 transition duration-500 ease-in-out text-white px-4 py-2 rounded-sm mr-2"
          >
            Login
          </button>
          <Link href="/blog" className="text-blue-500 hover:text-blue-600 ">
              Cancel
          </Link>
        </div>
      </form>
    </div>
    <Footer/>
    </div>
  );
}
