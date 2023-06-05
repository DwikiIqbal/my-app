import Link from "next/link";
import { ImLinkedin2, ImYoutube, ImFacebook } from "react-icons/im";
import { TbLogout } from "react-icons/tb";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

export default function HeaderAdmin() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dataArtikel, setDataArtikel] = useState([]);
  const [filteredArtikel, setFilteredArtikel] = useState([]);

  const [loggedIn, setLoggedIn] = useState(true);
  const router = useRouter();

  const handleLogout = () => {
    // Lakukan proses logout disini
    localStorage.removeItem("token");
    setLoggedIn(false);
    router.push("/blog/admin-login");
  };


  return (
    <header className="bg-gray-100 max-w-full w-full text-black">
      <div className="xl:contanier xl:mx-auto flex flex-col items-center sm:flex-row sm:justify-between  py-3">
        <div className="shrink w-80 sm:order-2 text-center">
          <Link href={""} className="font-bold text-3xl">
            Admin Page
          </Link>
        </div>
        <div className="w-52 order-3 flex justify-center">
          <div className="flex gap-6 ">
          <Link href="/blog" className="hover:text-amber-500 transition duration-300 ease-in-out">Home</Link>
            {loggedIn ? (
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out"
              >
                Log Out
              </button>
            ) : (
              <Link
                href="/blog/admin-login?"
                className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out"
              >
                Admin
              </Link>
            )}
            
          </div>
        </div>
      </div>
    </header>
  );
}
