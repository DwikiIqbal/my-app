import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Footer from "@/components/footer";
import { useStore } from "@/components/StoreProvider";
import { message } from "antd";

export default function AdminLogin() {
  const [responseData, setResponseData] = useState(null);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const store = useStore();
  const router = useRouter();

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const requestData = { email, password };
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        const responseData = await response.json(); // Mengurai respons sebagai teks
        const token = responseData.token;
        localStorage.setItem("token", token);
        router.push("/blog/admin-page");
      } else {
        message.error('user tidak ditemukan')
        setTimeout(() => {
          message.info('pastikan email dan password diisi dengan benar')
        }, 4000)
       
      }
    } catch (error) {
      console.log(error);
    }
  }
  

  // Cek apakah pengguna sudah login dan langsung arahkan ke "/blog/admin-page" jika sudah
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/blog/admin-page");
    }
  }, [router]);

  return (
    <div className="bg-white h-full justify-center">
      <div className="container mx-auto max-w-lg w-[380px] py-40 text-black">
        <h1 className="text-3xl font-bold mb-10 text-center">Admin Login</h1>
        <form onSubmit={handleLogin} className="sm:w-full">
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="border border-gray-300 bg-white px-3 py-2 rounded-sm w-full"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
              onChange={(event) => setPassword(event.target.value)}
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
    </div>
  );
}
