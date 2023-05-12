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
    const [isEditing, setIsEditing] = useState(false);
    
    useEffect(() => {
      const id = router.query.id; // Ambil ID dari URL
      console.log(router.query.id);

      const fetchArtikel = async () => {
        try {
          const artikel = await store.artikel.getArtikelById(id); // Ambil data artikel dari database menggunakan ID
          setData({ ...artikel }); // Set data artikel ke dalam state `data`
        } catch (error) {
          console.log(error);
        }
      };
      fetchArtikel();
    }, [router.query.id, store.artikel]);
    

    const updateArtikel = async (e) => {
      e.preventDefault();
      try {
        const updatedData = await store.artikel.updateArtikel(data.id, data);
        console.log(updatedData);
        setData(updatedData);
        localStorage.setItem("artikelData", JSON.stringify(data)); // simpan data yang sudah diperbarui
        toggleEdit();
        router.push(`/blog/${updatedData.id}`);
        alert('Cerpen berhasil diperbarui')
      } catch (error) {
        console.log(error);
      }
    };
    
    const handleCheckboxChange = (event) => {
      const value = event.target.value;
      const isChecked = event.target.checked;
    
      let updatedCategories = [...data.kategoriArtikel];
    
      const index = updatedCategories.indexOf(value);
      if (isChecked && index === -1) {
        updatedCategories.push(value);
      } else if (!isChecked && index !== -1) {
        updatedCategories.splice(index, 1);
      }
    
      setData((prevState) => ({ ...prevState, kategoriArtikel: updatedCategories }));

      // simpan data yang sudah diperbarui
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
              value={data.judulArtikel}
              className="bg-transparent hover:border-amber-200 hover:shadow-lg transition duration-300 ease-in-out border-b border-gray-400 focus:outline-none focus:border-amber-200"
              onChange={(e) => setData({...data, judulArtikel: e.target.value})}
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
                  <input id="komedi" name="kategoriArtikel[]" type="checkbox" value="komedi" className="mr-2" checked={data.kategoriArtikel.includes("komedi")} onChange={handleCheckboxChange}/>
                  <label htmlFor="komedi">Komedi</label>
                  </div>
                  <div>
                  <input id="religi" name="kategoriArtikel[]" type="checkbox" value="religi" className="mr-2" checked={data.kategoriArtikel.includes("religi")} onChange={handleCheckboxChange}/>
                  <label htmlFor="religi">Religi</label>
                  </div>
                  <div>
                  <input id="misteri" name="kategoriArtikel[]" type="checkbox" value="misteri" className="mr-2" checked={data.kategoriArtikel.includes("misteri")} onChange={handleCheckboxChange}/>
                  <label htmlFor="misteri">Misteri</label>
                  </div>
                  <div>
                  <input id="romantis" name="kategoriArtikel[]" type="checkbox" value="romantis" className="mr-2" checked={data.kategoriArtikel.includes("romantis")}  onChange={handleCheckboxChange}/>
                  <label htmlFor="romantis">Romantis</label>
                  </div>
                  <div>
                  <input id="aksi" name="kategoriArtikel[]" type="checkbox" value="aksi" className="mr-2" checked={data.kategoriArtikel.includes("aksi")}  onChange={handleCheckboxChange}/>
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
              value={data.isiArtikel}
              cols="30"
              rows="15"
              className="bg-transparent hover:border-amber-200 hover:shadow-lg transition duration-300 ease-in-out border-b border-gray-400 focus:outline-none focus:border-amber-200"
              onChange={(e) => setData({...data, isiArtikel: e.target.value})}
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
              value={data.pembuatArtikel}
              className="bg-transparent hover:border-amber-200 hover:shadow-lg transition duration-300 ease-in-out border-b border-gray-400 focus:outline-none focus:border-amber-200"
              onChange={(e) => setData({...data, pembuatArtikel: e.target.value})}
              name='pembuatArtikel'
              placeholder="Pembuat Artikel"
            />
            <div className='flex py-10'>
            <Link href={{ pathname: '/blog/[slug]', query: { id: data.id } }} as={`/blog/${data.id}`} className='w-20  rounded-lg text-white text-center bg-orange-500 hover:bg-orange-400 transition duration-300 ease-in-out'>Back</Link>
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
