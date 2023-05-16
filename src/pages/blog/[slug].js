import { useStore } from '@/components/StoreProvider'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from "react";
import Format from '@/layout/format';
import Link from 'next/link';


export default function CommentPage() {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState()
  const [dataFact, setDataFact] = useState([])
  const store = useStore()

  // METHOD FINDONE ID 
  useEffect(() => {
    loadInitialData()
  }, [])



  const loadInitialData = async () => {
    try {
      if (data && data.body) {
        localStorage.setItem('artikelData', JSON.stringify(data.body));
      }
      
      const artikelData = await store.artikel.getArtikelById(id);
      setData(artikelData.body);
      localStorage.setItem('artikelData', JSON.stringify(data.body));

    } catch (error) {
      console.log(error, 'err');
    }
  }

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('artikelData'));
    if (storedData) {
      setData(storedData);
    }

    const storedFactData = JSON.parse(localStorage.getItem('faktasData'));
    if (storedFactData) {
      setDataFact(storedFactData);
    }

  }, []);

  // METHOD DELETE
  const deleteArtikel = async () => {
    const storedData = JSON.parse(localStorage.getItem('artikelData'));
    console.log(storedData);
    try {
      if (!storedData.id) {
        console.log('Artikel ID tidak tersedia');
        return;
      }

      await store.artikel.deleteArtikel(storedData.id, {
        method: 'DELETE' 
      });
      // Jika berhasil, perbarui tampilan
      setData(null); // menghapus artikel dari tampilan
      localStorage.removeItem('artikelData'); // menghapus artikel dari local storage
      router.push('/blog'); // redirect ke halaman daftar artikel
    } catch (error) {
      console.log(error);
    }
  }

  // METHOD PUT


  return (
    <>
      <Format>
        <main>
          {data ? (
            <div className="">
              <div className="pt-32 px-48 xl:container mx-auto max-w-screen-xl ">
                <h1 className="text-center text-3xl font-bold pb-8">
                  {data.judulArtikel}
                </h1>
                <p>Genre: {data.kategoriArtikel.join(', ')}</p>
                <br/>
                <p className="text-justify indent-8 pb-[80px]">{data.isiArtikel}</p>
                <div className="float-right ">{data.pembuatArtikel}</div>
                <div className='gap-2 flex pb-20'>
                <button className='w-20  rounded-lg text-white bg-red-600 hover:bg-red-500 transition duration-300 ease-in-out' onClick={deleteArtikel}>Delete</button>
                <Link href={`/blog/update`} as={`/blog/update/${data.id}`}className='w-20  rounded-lg text-white text-center bg-blue-600 hover:bg-blue-500 transition duration-300 ease-in-out'>Edit</Link>
                <Link href={'/blog'} className='w-20 text-center rounded-lg text-white bg-orange-500 hover:bg-orange-400 transition duration-300 ease-in-out'>Back</Link>
                </div>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
          
        </main>
      </Format>
    </>
  )
}
