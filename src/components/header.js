import Link from "next/link";
import { ImLinkedin2, ImYoutube, ImFacebook } from "react-icons/im";
import { TbLogout } from "react-icons/tb";

import { useState, useEffect } from "react";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dataArtikel, setDataArtikel] = useState([]);
  const [filteredArtikel, setFilteredArtikel] = useState([]);

  const items = [
    {
      label:  <Link href="/blog/kategori/drama" onClick={() => setSelectedCategory('drama')}> Drama </Link>,
      key: '0',
    },
    {
      label:   <Link href="/blog/kategori/religi" onClick={() => setSelectedCategory('religi')}>
      Religi
    </Link>,
      key: '1',
    },
    {
      label:   <Link href="/blog/kategori/aksi" onClick={() => setSelectedCategory('aksi')}>
      Aksi
    </Link>,
      key: '2',
    },
    {
      label:     <Link href="/blog/kategori/romantis" onClick={() => setSelectedCategory('romantis')}>
      Romantis
    </Link>,
      key: '3',
    },
    {
      label:     <Link href="/blog/kategori/misteri" onClick={() => setSelectedCategory('misteri')}>
      Misteri
    </Link>,
      key: '4',
    },
    {
      label:      <Link href="/blog/kategori/komedi" onClick={() => setSelectedCategory('komedi')}>
      Komedi
    </Link>,
      key: '5',
    },
    {
      type: 'divider',
    },
    {
      label: 'CerpenBlog',
    },
  ];

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
    <header className="bg-gray-100 max-w-full w-full text-black">
      <div className="xl:contanier xl:mx-auto flex flex-col items-center sm:flex-row sm:justify-between  py-3">
        <div className="shrink w-80 sm:order-2 text-center">
          <Link href={"/blog"} className="font-bold text-3xl">CerpenBLog</Link>
        </div>
        <div className="w-52 order-3 flex justify-center">
          <div className="flex gap-6 ">
            <Link href="/blog" className="hover:text-amber-500 transition duration-300 ease-in-out">Home</Link>
            <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={['click']}
                >
                  <a className="cursor-pointer" onClick={(e) => e.preventDefault()}>
                    <Space>
                      Kategori
                      
                    </Space>
                  </a>
                </Dropdown>
          </div>
        </div>
      </div>
      
    </header>
  );
}
