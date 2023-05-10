import { useRouter } from "next/router"
import { useState, useEffect } from "react"


export default function Modal() {
     // Properti Post Modal untuk Fact
     const [judulFakta, setJudulFakta] = useState('')
     const [isiFakta, setIsiFakta] = useState('')
     const [sumberFakta, setSumberFakta] = useState('')
     const [showModal, setShowModal] = useState(false)
     const [data, setData] = useState([]);
     const router = useRouter()
     

     useEffect(() => {
        const fetchData = async () => {
          const endpoint = "http://localhost:4000/fact";
          const response = await fetch(endpoint);
          const result = await response.json();
      
          setData(result);
        };
      
        fetchData();
      }, []);
 
     const openModal = () => {
         setShowModal(true)
     }
 
     const closeModal = () => {
         setShowModal(false)
     }
 
     const handleSubmit = async (e) => {
     e.preventDefault()
     
 
     const data = {
         judulFakta: document.getElementById("judulFakta").value,
         isiFakta: document.getElementById("isiFakta").value,
         sumberFakta: document.getElementById("sumberFakta").value,
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
             console.log(response);
             const result = await response.json()
             console.log(result);
            //  localStorage.setItem(JSON.stringify(data))
             
 
             if (result) {
                 alert("Cerpen berhasil dibuat!")
                 closeModal();
                 // simpan data ke localStorage
                 localStorage.setItem('faktaTerbaru', JSONdata)
                 // tambahkan data ke state agar bisa ditampilkan
                 setData([...data, data])
               }

                // tutup modal setelah submit berhasil
                

         } catch (error) {
             console.error(error)
           }

           
  };
 

return ( 
                <div className="mt-auto object-bottom pt-80 text-center "> 
                    <button onClick={openModal} className="p-2 bg-blue-500 rounded-lg hover:bg-blue-400 text-zinc-100 transition duration-500 ease-in-out"> Tambah Fakta Menarik Lainnya...</button>
                    

                    {showModal && (
                        <div className="">
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                        
                            <div className="bg-gray-100 p-8 rounded-lg shadow-lg grid w-1/4">
                              <div className="font-bold text-xl pb-4">
                                <h1>Buat Funfact Kamu</h1>
                              </div>

                            <input id="judulFakta" name="judulFakta" type="text" placeholder=" Masukkan Judul" className="rounded-lg border-line" value={judulFakta} onChange={(e) => setJudulFakta(e.target.value)}/>
                            <br/>
                            <textarea  cols="30" rows="10" id="isiFakta" name="isiFakta" type="text" placeholder=" Masukkan isi" className="rounded-lg" value={isiFakta} onChange={(e) => setIsiFakta(e.target.value)}/>
                            <br/>
                            <input id="sumberFakta" name="sumberFakta" type="text" placeholder=" Masukkan sumber" className="rounded-lg" value={sumberFakta} onChange={(e) => setSumberFakta(e.target.value)}/> 
                            <div className="pt-6 flex gap-2 float-right">   
                            <span className="close cursor-pointer bg-blue-400 px-2 rounded" onClick={closeModal}>close</span>
                            <button onClick={handleSubmit} className="bg-green-400 px-2 rounded">submit</button>
                            </div> 
                            </div>
                        </div>
                        </div> 
                    )}


                    </div>
 )

}



  
  