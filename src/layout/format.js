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
    {/* <div className="pb-12">
      <header className="text-neutral-900 bg-white flex-initial p-3 fixed w-full shadow-lg shadow-neutral-300/50 z-10">
        <div className="flex gap-5 text-lg float-right ">
          <Link
            href="/blog"
            className={`${
              navHoverHome ? "" : "text-amber-200"
            } transition duration-300 ease-in-out`}
            onMouseEnter={nav1}
            onMouseLeave={nav1}
          >
            Home
          </Link>

          <Link
            href="/blog/detail"
            className={`${
              navHoverDetail ? "" : "text-amber-200"
            } transition duration-300 ease-in-out`}
            onMouseEnter={nav2}
            onMouseLeave={nav2}
          >
            Detail
          </Link>

          <div className=" mr-14 relative block">
            <span
              className={`cursor-pointer ${
                navHoverDropdown ? "" : "text-amber-200"
              } transition duration-300 ease-in-out`}
              onMouseEnter={toggleDropdown}
              onMouseLeave={toggleDropdown}
            >
              More
              {showDropdown && (
                <div
                  id="dropdown"
                  className="absolute top-100% bg-white rounded-md w-24 pl-2 pr-2 shadow-lg"
                >
                  <div className="block px-2 py-2 text-black text-base">
                    <Link href="/blog/add">Add</Link>
                    <br />
                    <a href="#">Search</a>
                    <br />
                    <a href="#">###</a>
                  </div>
                </div>
              )}
            </span>
          </div>

        </div>

        <div className="ml-10 text-2xl font-bold">iBloG</div>
      </header>
      </div> */}
      <main>{children}
      <Footer></Footer>
      </main>

    
    </>
  );
}
