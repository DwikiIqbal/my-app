import { useState, useEffect } from "react"
import { useStore } from "./StoreProvider"



export default function Modal() {
  // Properti Post Modal untuk Fact
  const store = useStore()
  const [judulFakta, setJudulFakta] = useState('')
  const [isiFakta, setIsiFakta] = useState('')
  const [sumberFakta, setSumberFakta] = useState('')

  const [showModal, setShowModal] = useState(false)
  const [showModalDetail, setShowModalDetail] = useState(false)
  
  const [dataFact, setDataFact] = useState([])
  const [factData, setFactData] = useState({});

  const [deleteId, setDeleteId] = useState(null); // State untuk menyimpan id item yang akan dihapus
  

  // Mengambil semua data fact
  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    try {
      const fact = await store.fact.getFact()
      setDataFact(fact.body.data)
    } catch (error) {
      console.log(error, 'err')
    }
  }

  // menampilkan modal berupa inputan untuk menambahkan
  const openModalDetail = (item) => {
    setFactData(item)
    setDeleteId(item.id);
    setShowModalDetail(true)
  }

  const openModal = () => {
    setShowModal(true)
  }

  const closeModalDetail = () => {
    setShowModalDetail(false)
  }

  const closeModal = () => {
    setShowModal(false)
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      judulFakta,
      isiFakta,
      sumberFakta,
    }

    try {
      const result = await store.fact.createFact(data);
      console.log(result);

      

      if (result) {
        alert('Fakta berhasil dibuat!')

         // setiap nilai state menjadi kosong
        setJudulFakta('')
        setIsiFakta('')
        setSumberFakta('')
      
        closeModal()

        // tambahkan data yang baru ke dalam array dataFact
        setDataFact([...dataFact, data])

        // simpan data ke localStorage
        localStorage.setItem('factData', JSON.stringify(result.body.data));

      }
    } catch (error) {
      console.error(error)
    }
  };

  const deleteFact = async () => {
    try {
      await store.fact.deleteFact(deleteId); // Menghapus data berdasarkan id menggunakan fungsi deleteFact dari store
      const updatedData = dataFact.filter((item) => item.id !== deleteId);
      setDataFact(updatedData);
      closeModalDetail();
  
      // Hapus juga data dari localStorage
      const storedData = JSON.parse(localStorage.getItem('factData'));
      const updatedStoredData = storedData.filter((item) => item.id !== deleteId);
      localStorage.setItem('factData', JSON.stringify(updatedStoredData));
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <>
            <div className="w-1/4 p-10 bg-gray-50 flex-col">

              {/* Mengambil data yang berada di dataFact lalu dipetakan sampai seluruhnya berhasil di ambil */}
                    <div className="text-center text-2xl pb-4 font-bold">
                    <h1>Funfact</h1>
                    </div>   
                  {dataFact.map((item) => (
                    <div className="mb-4">
                      <div className="sm:w-full bg-white px-3 rounded-lg shadow-lg hover:shadow-amber-200/50 transition duration-300 ease-in-out overflow-hidden">

                        <h1 className="text-xl font-bold text-center py-3 sm:py-5">{item.judulFakta}</h1>
                        <div className="line-clamp-[4]">
                          <p>{item.isiFakta}</p>
                          <br />
                        </div>
                        <button onClick={() => openModalDetail(item)} className="block w-44 mx-auto text-center text-blue-500 my-4 hover:text-blue-300 transition duration-300 ease-in-out"> Read Me</button>
                      </div>
                    </div>
                  ))}

                  {showModalDetail && (
                          <div className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-70">
                            <div className="flex items-center justify-center min-h-screen px-4">
                              <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full">
                                <div className="px-6 py-4">
                                  <div className="text-xl font-bold mb-2">{factData.judulFakta}</div>
                                  <p className="text-gray-700 text-base">{factData.isiFakta}</p>
                                  <br/>
                                  <p className="text-gray-700 text-base float-right ">Sumber: {factData.sumberFakta}</p>
                                </div>
                                <div className="px-6 py-4 flex justify-end float-right">
                                  <button className="bg-gray-200 hover:bg-gray-300 rounded-md px-4 py-2 mr-2" onClick={closeModalDetail}>Tutup</button>
                                  <button className="bg-gray-200 hover:bg-red-600 rounded-md px-4 py-2 mr-2" onClick={deleteFact}>Hapus</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}




                 
                 {/* Membuat dataFact sesuai value nya */}
                   <div className="pt-20 text-center bottom-0 ">
      <button onClick={openModal} className="p-2 bg-blue-500 rounded-lg hover:bg-blue-400 text-zinc-100 transition duration-500 ease-in-out">Tambahkan Fakta Menarik Lainnya...</button>
      
      {/* Menampilkan form untuk Funfact yang ditampilkan berupa modal */}
      {showModal && (
         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          
          <form onSubmit={handleSubmit} className='bg-gray-100 p-8 rounded-lg shadow-lg grid w-1/4'>
          <div className="font-bold text-xl pb-4">
            <h1>Buat Funfact Kamu</h1>
          </div>
            <label>
              
              <input
                type="text"
                value={judulFakta}
                className="rounded-lg border-line w-full"
                placeholder=" Masukkan Judul"
                onChange={(e) => setJudulFakta(e.target.value)}
              />
            </label>
            <br/>
            <label>
              <textarea
                value={isiFakta}
                cols="30" rows="10" id="isiFakta" name="isiFakta" type="text" placeholder=" Masukkan Isi" className="rounded-lg w-full" 
                onChange={(e) => setIsiFakta(e.target.value)}
              />
            </label>
            <br/>
            <label>
              <input
                type="text"
                value={sumberFakta}
                className="rounded-lg w-full"
                placeholder=" Masukkan Sumbernya"
                onChange={(e) => setSumberFakta(e.target.value)}
              />
            </label>

            <div className="pt-6 flex gap-2 float-right">  
            <span className="close cursor-pointer bg-blue-400 px-2 rounded" onClick={closeModal}>close</span>
            <button onClick={handleSubmit} className="bg-green-400 px-2 rounded">submit</button>
            </div>  
                            
          </form>
        </div>
      )}
      </div> 
      </div>
    </>
  )

}



  
  