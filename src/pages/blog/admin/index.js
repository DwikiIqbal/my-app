import Format from "@/layout/format"
import { useStore } from "@/components/StoreProvider"
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import Link from "next/link"

export default function Admin(){
  const router = useRouter();
  const { id } = router.query;
  // store digunakan untuk menyimpan setiap class yang sudah dibuat. Contoh nya seperti class pada artikel dan fact
  const store = useStore()
  // membuat state dataArtikel 
  const [dataArtikel, setDataArtikel] = useState([])
  

  // menjalankan fungsi loadInitialData yang didalamnya ada function untuk artikel 
  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    // data yang diperoleh dari kedua function tersebut akan disimpan ke dalam dataArtikel dan dataFact menggunakan function setDataArtikel dan setDataFact. lalu disimpan kedalam body
      try {
          const artikel = await store.artikel.getArtikel();
          setDataArtikel(artikel.body.data)
      } catch (error) {
          console.log(error, 'err');
      }
  }

  // METHOD DELETE
  const deleteArtikel = async (id) => {
    try {
      await store.artikel.deleteArtikel(id);
      const updatedData = dataArtikel.filter(item => item.id !== id);
      setDataArtikel(updatedData);
      localStorage.removeItem('artikelData');
      router.push('/blog/admin');
    } catch (error) {
      console.log(error);
    }
  };
  
  

    return(
        <>
        <Format>
        <div className="xl:container mx-auto max-w-screen-xl px-20 pt-32 pb-44">
    <header>
        <div class="text-5xl pb-16 ">
            <h1>Admin Page</h1>
            <div className=" flex overflow-hidden sm:w-full sm:px-auto">
            {/* <img src="https://images.unsplash.com/photo-1512580770426-cbed71c40e94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGJvb2t8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" className="  mx-auto h-[450px]"/> */}
            {/* <img src="https://images.unsplash.com/photo-1573848855919-9abecc93e456?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fGJvb2t8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" className="w-1/2  mx-auto h-[450px]"/> */}
            </div>
        </div>
    </header>

    
    <div className="">
    <table class="min-w-full">
    <thead>
      <tr>
        <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
        <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
        <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Isi</th>
        <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pembuat</th>
        <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Navigasi</th>
      </tr>
    </thead>
    <tbody className="bg-cover bg-center divide-y divide-gray-200">
  {dataArtikel.map((item) => (
    <tr key={item.id}>
      <td className="px-6 py-4 whitespace-nowrap">{item.judulArtikel}</td>
      <td className="px-6 py-4 whitespace-nowrap">{item.kategoriArtikel.join(', ')}</td>
      <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis" style={{ maxWidth: "200px" }}>{item.isiArtikel}</td>
      <td className="px-6 py-4 whitespace-nowrap" >{item.pembuatArtikel}</td>
      <td className="px-6 py-4 whitespace-nowrap flex gap-2">
      <Link href={`/blog/update`} as={`/blog/update/${item.id}`} className="bg-lime-400 hover:bg-lime-500 hover:text-white transition duration-500 ease-in-out rounded-md px-4 py-2 mr-2">Edit</Link>
        <button className="text-white bg-red-600 hover:bg-red-500 hover:text-black  transition duration-500 ease-in-out rounded-md px-4 py-2 mr-2" onClick={() => deleteArtikel(item.id)}>Delete</button>
      </td>
    </tr>
  ))}
</tbody>
  </table>
    </div>
    
</div>
</Format>
        </>
    )
}