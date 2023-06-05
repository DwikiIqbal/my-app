import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Head from "next/head";

export default function format({ children }) {
  const router = useRouter();
  const onClickUrl = (url) => {
    router.push(url);
  };

  // useState Navbar
  const [showDropdown, setShowDropdown] = useState(false);
  const [navHoverHome, setNavHoverHome] = useState(true);
  const [navHoverDetail, setNavHoverDetail] = useState(true);
  const [navHoverDropdown, setNavHoverDropdown] = useState(true);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setNavHoverDropdown(!navHoverDropdown);
  };

  const nav1 = () => {
    setNavHoverHome(!navHoverHome);
  };

  const nav2 = () => {
    setNavHoverDetail(!navHoverDetail);
  };

  return (
    <>
    
    <Head>
      <title>iBlog</title>
    </Head>

    <Header/>
      <main className="bg-white text-black">{children}
      <Footer></Footer>
      </main>

    
    </>
  );
}
