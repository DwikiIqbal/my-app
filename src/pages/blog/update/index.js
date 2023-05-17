import { useStore } from '@/components/StoreProvider'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from "react";
import Format from '@/layout/format';
import Link from 'next/link';

  export default function Update({}) {
    const [data, setData] = useState({
      judulArtikel: "",
      kategoriArtikel: [],
      isiArtikel: "",
      pembuatArtikel: "",
    });
  
    const store = useStore();
    const router = useRouter();
    const [id, setId] = useState('');
    const [isEditing, setIsEditing] = useState(false);
  
    useEffect(() => {
      const { id } = router.query;
      console.log(router.query.id);
  
      const fetchArtikel = async () => {
        try {
          const artikel = await store.artikel.getArtikelById(id);
          if (artikel) {
            setData((prevState) => ({
              ...prevState,
              ...artikel.body,
              id: id,
              kategoriArtikel: artikel.body.kategoriArtikel || [],
            }));
          }
        } catch (error) {
          console.log(error);
        }
      };
  
      // Panggil fetchArtikel hanya jika id tersedia
      if (id) {
        fetchArtikel();
      }
    }, [router.query.id, store.artikel]);
  

    useEffect(() => {
      setId(router.query.id);
    }, [router.query.id]);
    
  
    const updateArtikel = async (e) => {
      e.preventDefault();
      if (id) {
        try {
          const updatedData = await store.artikel.updateArtikel(id, data);
          console.log(updatedData);
          localStorage.setItem("artikelData", JSON.stringify(updatedData));
    
          toggleEdit();
          router.push(`/blog/admin`);
          alert('Artikel berhasil diperbarui');
        } catch (error) {
          console.log(error);
        }
      }
    };
    
  
    const handleCheckboxChange = (event) => {
      const value = event.target.value;
      const isChecked = event.target.checked;
  
      let updatedCategories = [...data.kategoriArtikel];
  
      if (isChecked && !updatedCategories.includes(value)) {
        updatedCategories.push(value);
      } else if (!isChecked && updatedCategories.includes(value)) {
        updatedCategories = updatedCategories.filter((category) => category !== value);
      }
  
      setData((prevState) => ({ ...prevState, kategoriArtikel: updatedCategories }));
  
      const updatedData = { ...data, kategoriArtikel: updatedCategories };
      console.log(updatedCategories);
      localStorage.setItem('artikelData', JSON.stringify(updatedData));
    };
  
    const toggleEdit = () => {
      setIsEditing(!isEditing);
    };
    
  
    
  

  return (
    <>
   
      <Format>
      <div className="h-[100%]">
        <div className="xl:container mx-auto max-w-screen-xl px-44 pt-20">
        
          <form onSubmit={updateArtikel} className="rounded-lg w-full flex flex-col" id='your-id'>
            <div className="grid w-full text-lg">
            <label htmlFor="" className="text-xl font-bold pt-10">
                  📌 JUDUL ARITKEL
            </label>
            <br/>
            <input
              type="text"
              value={data.judulArtikel || ""}
              className="bg-transparent hover:border-amber-200 hover:shadow-lg transition duration-300 ease-in-out border-b border-gray-400 focus:outline-none focus:border-amber-200"
              onChange={(e) => setData((prevState) => ({ ...prevState, judulArtikel: e.target.value }))}
              name='judulArtikel'
              placeholder="Judul Artikel"
            />
            <br/>
            <br/>
            <br/>

            <label htmlFor="" className="text-xl font-bold">
            🔖 KATEGORI ARTIKEL
                </label>
                <br />
            <div className="grid grid-cols-3 gap-4 w-[360px]">
                  <div>
                   <input id="drama" name="kategoriArtikel[]" type="checkbox" value="drama" className="mr-2" checked={data.kategoriArtikel && data.kategoriArtikel.includes("drama")} onChange={handleCheckboxChange}/>
                   <label htmlFor="drama">Drama</label>
                  </div>
                  <div>
                  <input id="komedi" name="kategoriArtikel[]" type="checkbox" value="komedi" className="mr-2" checked={data.kategoriArtikel && data.kategoriArtikel.includes("komedi")} onChange={handleCheckboxChange}/>
                  <label htmlFor="komedi">Komedi</label>
                  </div>
                  <div>
                  <input id="religi" name="kategoriArtikel[]" type="checkbox" value="religi" className="mr-2" checked={data.kategoriArtikel && data.kategoriArtikel.includes("religi")} onChange={handleCheckboxChange}/>
                  <label htmlFor="religi">Religi</label>
                  </div>
                  <div>
                  <input id="misteri" name="kategoriArtikel[]" type="checkbox" value="misteri" className="mr-2" checked={data.kategoriArtikel && data.kategoriArtikel.includes("misteri")} onChange={handleCheckboxChange}/>
                  <label htmlFor="misteri">Misteri</label>
                  </div>
                  <div>
                  <input id="romantis" name="kategoriArtikel[]" type="checkbox" value="romantis" className="mr-2" checked={data.kategoriArtikel && data.kategoriArtikel.includes("romantis")}  onChange={handleCheckboxChange}/>
                  <label htmlFor="romantis">Romantis</label>
                  </div>
                  <div>
                  <input id="aksi" name="kategoriArtikel[]" type="checkbox" value="aksi" className="mr-2" checked={data.kategoriArtikel && data.kategoriArtikel.includes("aksi")}  onChange={handleCheckboxChange}/>
                  <label htmlFor="aksi">Aksi</label>
                  </div>
                </div>
                <br/>
                <br/>
                <br/>

            <label htmlFor="" className="text-xl font-bold">
                  📝 ISI ARTIKEL{" "}
            </label>
            <br/>
            <textarea
              value={data.isiArtikel || ""}
              cols="30"
              rows="15"
              className="bg-transparent hover:border-amber-200 hover:shadow-lg transition duration-300 ease-in-out border-b border-gray-400 focus:outline-none focus:border-amber-200"
              onChange={(e) => setData((prevState) => ({ ...prevState, isiArtikel: e.target.value }))}
              name='isiArtikel'
              placeholder="Isi Artikel"
            />
            <br/>
            <br/>
            <br/>

            <label htmlFor="" className="text-xl font-bold">
                  👤 PEMBUAT{" "}
            </label>
            <br/>
            <input
              type="text"
              value={data.pembuatArtikel || ""}
              className="bg-transparent hover:border-amber-200 hover:shadow-lg transition duration-300 ease-in-out border-b border-gray-400 focus:outline-none focus:border-amber-200"
              onChange={(e) => setData((prevState) => ({ ...prevState, pembuatArtikel: e.target.value }))}
              name='pembuatArtikel'
              placeholder="Pembuat Artikel"
            />
            <div className='flex py-10'>
            {/* <Link href={{ pathname: '/blog/[slug]', query: { id: data.id } }} as={`/blog/${data.id}`} className='w-20  rounded-lg text-white text-center bg-orange-500 hover:bg-orange-400 transition duration-300 ease-in-out'>Back</Link> */}
            <Link href={'/blog/admin'} className='w-20  rounded-lg text-white text-center bg-orange-500 hover:bg-orange-400 transition duration-300 ease-in-out'>Back</Link>
            <div className='ml-auto'>
            <button type="submit" className='w-24 rounded-lg bg-green-400 hover:bg-green-300 transition duration-300 ease-in-out'>Save</button>
             </div>
            </div>
            </div>
           
          </form>
       
        
        </div>
        </div>
      </Format>
    </>
  );
}
