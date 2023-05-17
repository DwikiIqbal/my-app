import Link from "next/link"
import {ImLinkedin2, ImYoutube, ImFacebook} from "react-icons/im";
import { useState } from "react";

export default function Header(){
    // membuat state untuk membuat dropdown
    const [showDropdown, setShowDropdown] = useState(false);

    // function untuk menampilkan dropdown
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
      };
    return (

        <header className="bg-gray-100 fixed w-full">
            <div className="xl:contanier xl:mx-auto flex flex-col items-center sm:flex-row sm:justify-between text-center py-3">
                <div className="shrink w-80 sm:order-2">
                    <a className="font-bold text-3xl"  style={{ WebkitTextStroke: '0.0px #000'}}>CerpenBLog</a>
                </div>
                <div className="w-96 order-3 flex justify-center">
                <div className="flex gap-6 ">
                    <Link href="/blog" className="hover:text-amber-500 transition duration-300 ease-in-out">Home</Link>
                    <Link href="/blog/about" className="hover:text-amber-500 transition duration-300 ease-in-out">About Us</Link>
                    <span
              className="cursor-pointer hover:text-amber-500
               transition duration-300 ease-in-out"
              onMouseEnter={toggleDropdown}
              onMouseLeave={toggleDropdown}
            >
              More
              {showDropdown && (
                <div
                  id="dropdown"
                  className="absolute top-100% bg-white rounded-md w-24 pl-2 pr-2 shadow-lg "
                >
                  <div className="block px-2 py-2 text-black text-base ">
                    
                    <Link href="/blog/add-artikel">Add</Link>
                    <br />
                    <Link href="/blog/admin">Admin</Link>
                    <br />
                    <a href="#">###</a>
                    
                  </div>
                </div>
              )}
            </span>

                </div>
                </div>
            </div>
        </header>
    )
}