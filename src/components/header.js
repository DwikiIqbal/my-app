import Link from "next/link";
import { ImLinkedin2, ImYoutube, ImFacebook } from "react-icons/im";
import { useState, useEffect } from "react";

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dataArtikel, setDataArtikel] = useState([]);
  const [filteredArtikel, setFilteredArtikel] = useState([]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const artikel = await store.artikel.getArtikel();
      setDataArtikel(artikel.body.data);
      setFilteredArtikel(artikel.body.data); // Menyimpan semua artikel sebagai artikel yang difilter awalnya (semua kategori)
    } catch (error) {
      console.log(error, 'err');
    }
  };

  return (
    <header className="bg-gray-100 fixed w-full">
      <div className="xl:contanier xl:mx-auto flex flex-col items-center sm:flex-row sm:justify-between  py-3">
        <div className="shrink w-80 sm:order-2 text-center">
          <a className="font-bold text-3xl " >CerpenBLog</a>
        </div>
        <div className="w-52 order-3 flex justify-center">
          <div className="flex gap-6 ">
            <Link href="/blog" className="hover:text-amber-500 transition duration-300 ease-in-out">Home</Link>
            <span
              className="cursor-pointer hover:text-amber-500 transition duration-300 ease-in-out"
              onMouseEnter={toggleDropdown}
              onMouseLeave={toggleDropdown}
            >
              Kategori
              {showDropdown && (
                <div
                  id="dropdown"
                  className="absolute top-100% bg-white rounded-md w-24 pl-2 pr-2 shadow-lg"
                >
                  <div className="block px-2 py-2 text-black text-base">
                    {/* <a href="#" onClick={() => setSelectedCategory(null)}>
                      All
                    </a> */}
                   
                    <Link href="/blog/kategori/drama" onClick={() => setSelectedCategory('drama')}>
                      Drama
                    </Link>
                    <br />
                    <Link href="/blog/kategori/religi" onClick={() => setSelectedCategory('religi')}>
                      Religi
                    </Link>
                    <br />
                    <Link href="/blog/kategori/aksi" onClick={() => setSelectedCategory('aksi')}>
                      Aksi
                    </Link>
                    <br />
                    <Link href="/blog/kategori/romantis" onClick={() => setSelectedCategory('romantis')}>
                      Romantis
                    </Link>
                    <br />
                    <Link href="/blog/kategori/misteri" onClick={() => setSelectedCategory('misteri')}>
                      Misteri
                    </Link>
                    <br />
                    <Link href="/blog/kategori/komedi" onClick={() => setSelectedCategory('komedi')}>
                      Komedi
                    </Link>
                  </div>
                </div>
              )}
            </span>
          </div>
        </div>
      </div>
      
    </header>
  );
}
