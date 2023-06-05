import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

function Footer() {
  const [loggedIn, setLoggedIn] = useState(true);
  const router = useRouter();

  const handleLogout = () => {
    // Lakukan proses logout disini
    localStorage.removeItem("token");
    setLoggedIn(false);
    router.push("/blog");
  };

  return (
    <footer className="text-center text-neutral-900 mx-auto justify-center bottom-0 pb-10 pt-10">
      <div className="flex justify-center gap-4">
        <Link
          href="/blog/about"
          className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out"
        >
          About Us
        </Link>

        <Link
          href="/blog/admin-login?"
          className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out"
        >
          Admin
        </Link>
      </div>

      <div className="mt-4 text-sm">
        © 2023 CerpenBlog. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
