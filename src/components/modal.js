import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { useStore } from "./StoreProvider"
import ModalDetail from "./modal-detail"


export default function Modal() {
     // Properti Post Modal untuk Fact
     const store = useStore()
  const [judulFakta, setJudulFakta] = useState('')
  const [isiFakta, setIsiFakta] = useState('')
  const [sumberFakta, setSumberFakta] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [dataFact, setDataFact] = useState([])
  const router = useRouter()

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

  const openModal = () => {
    setShowModal(true)
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
      const JSONdata = JSON.stringify(data)
      const endpoint = 'http://localhost:4000/fact'

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSONdata
      }

      const response = await fetch(endpoint, options)
      console.log(response)
      const result = await response.json()
      console.log(result)

      if (result) {
        alert('Fakta berhasil dibuat!')
        closeModal()

        // tambahkan data yang baru ke dalam array dataFact
        setDataFact([...dataFact, data])

        // simpan data ke localStorage
        localStorage.setItem('faktaTerbaru', JSONdata)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
            <div className="w-1/4 p-10 bg-gray-50 rounded-xl flex-col">
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
                        <ModalDetail/>
                      </div>
                    </div>
                  ))}
                 
                   <div className="mt-auto object-bottom pt-80 text-center ">
      <button onClick={openModal} className="p-2 bg-blue-500 rounded-lg hover:bg-blue-400 text-zinc-100 transition duration-500 ease-in-out">Tambahkan Fakta Menarik Lainnya...</button>

      {showModal && (
         <div className="fixed inset-0 flex items-center justify-center z-50">
          
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



  
  