import Format from "@/layout/format"
import { useStore } from "@/components/StoreProvider"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function Admin(){
  // store digunakan untuk menyimpan setiap class yang sudah dibuat. Contoh nya seperti class pada artikel dan fact
  const store = useStore()
  // membuat state dataArtikel 
  const [dataArtikel, setDataArtikel] = useState([])
  const [dataFact, setDataFact] = useState([])
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleDelete = (id) => {
    setConfirmDelete(true);
    setDeleteItemId(id);
  };

  const handleConfirmDelete = () => {
    // Lakukan aksi penghapusan dengan id deleteItemId
    // Setelah selesai, reset confirmDelete dan deleteItemId ke nilai awal
    setConfirmDelete(false);
    setDeleteItemId(null);
  };

  const handleCancelDelete = () => {
    // Batalkan penghapusan
    setConfirmDelete(false);
    setDeleteItemId(null);
  };
  

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

  useEffect(() => {
    loadInitialDataFact()
  }, [])

  const loadInitialDataFact = async () => {
    try {
      const fact = await store.fact.getFact()
      setDataFact(fact.body.data)
    } catch (error) {
      console.log(error, 'err')
    }
  }


  // METHOD DELETE
  const deleteArtikel = async (id) => {
    try {
      const confirmed = window.confirm('Apakah Anda yakin ingin menghapus artikel ini?');
      if (confirmed) {
        await store.artikel.deleteArtikel(id);
        const updatedData = dataArtikel.filter(item => item.id !== id);
        setDataArtikel(updatedData);
        localStorage.removeItem('artikelData');
        // router.push('/blog/admin');
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const deleteFact = async (id) => {
    try {
      const confirmed = window.confirm('Apakah Anda yakin ingin menghapus fakta ini?');
      if (confirmed) {
        await store.fact.deleteFact(id);
        const updatedData = dataFact.filter(item => item.id !== id);
        setDataFact(updatedData);
        localStorage.removeItem('factData');
        // router.push('/blog/admin');
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  

    return(
        <>
        <Format>
        <div className="xl:container mx-auto max-w-screen-xl px-20 pt-32 pb-44 bg-white">
    <header>
        <div class="text-5xl pb-16 ">
            <h1>Admin Page</h1>
            <div className=" flex overflow-hidden sm:w-full sm:px-auto">
            {/* <img src="https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGJvb2t8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" className="  mx-auto h-[450px]"/> */}
            {/* <img src="https://images.unsplash.com/photo-1573848855919-9abecc93e456?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fGJvb2t8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" className="w-1/2  mx-auto h-[450px]"/> */}
            </div>
        </div>
    </header>

    
    <div className="">
    <h3 className="text-2xl">Data Cerpen</h3>
    <table class="min-w-full mx-auto ">
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
      <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis" style={{ maxWidth: "250px" }}>{item.isiArtikel}</td>
      <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis"  style={{ maxWidth: "300px" }}>{item.pembuatArtikel}</td>
      <td className="px-6 py-4 whitespace-nowrap flex gap-2">
      <Link href={{ pathname: '/blog/update/[slug]', query: { id: item.id } }} as={`/blog/update/${item.id}`} className="bg-lime-400 hover:bg-lime-500 hover:text-white transition duration-500 ease-in-out rounded-md px-4 py-2 mr-2">Edit</Link>
        <button className="text-white bg-red-600 hover:bg-red-500 hover:text-black  transition duration-500 ease-in-out rounded-md px-4 py-2 mr-2" onClick={() => deleteArtikel(item.id)}>Delete</button>
      </td>
    </tr>
  ))}
</tbody>
  </table>
    <div className="float-right py-20 pr-2">
  <Link href={'/blog/add-artikel'} className="p-2 bg-blue-500 rounded-lg hover:bg-blue-400 text-zinc-100 transition duration-500 ease-in-out">Tambah Cerpen Lainnya...</Link>
  </div>
    </div>

    

    <div className="pt-32 ">
    <h3 className="text-2xl">Data Fakta</h3>
    <table class="min-w-full">
    <thead>
      <tr>
        <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
        <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Isi</th>
        <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sumber</th>
        <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Navigasi</th>
      </tr>
    </thead>
    <tbody className="bg-cover bg-center divide-y divide-gray-200">
      {dataFact.map((item) => (
        <tr key={item.id}>
          <td className="px-6 py-4 whitespace-nowrap">{item.judulFakta}</td>
          <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis" style={{ maxWidth: "300px" }}>{item.isiFakta}</td>
          <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis" style={{ maxWidth: "600px" }}>{item.sumberFakta}</td>
          <td className="px-6 py-4 whitespace-nowrap flex gap-2">
            <button className="text-white bg-red-600 hover:bg-red-500 hover:text-black  transition duration-500 ease-in-out rounded-md px-4 py-2 mr-2" onClick={() => deleteFact(item.id)}>Delete</button>
          </td>
        </tr>
      ))}
      {/* {confirmDelete && (
        <tr>
          <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-center">
            <p>Are you sure you want to delete this item?</p>
            <button className="text-white bg-red-600 hover:bg-red-500 hover:text-black transition duration-500 ease-in-out rounded-md px-4 py-2 mr-2" onClick={handleConfirmDelete}>Yes</button>
            <button className="text-white bg-gray-600 hover:bg-gray-500 hover:text-black transition duration-500 ease-in-out rounded-md px-4 py-2" onClick={handleCancelDelete}>No</button>
          </td>
        </tr>
      )} */}
    </tbody>
  </table>
  </div>
    
</div>
</Format>
        </>
    )
}