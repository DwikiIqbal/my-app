import { useState } from "react"
import { useRouter } from "next/router"
import Format from "@/layout/format"

export default function AddFact() {
    const [judulFakta, setJudulFakta] = useState('')
    const [isiFakta, setIsiFakta] = useState('')
    const [sumberFakta, setSumberFakta] = useState('')
    const [showModal, setShowModal] = useState(false)
    const router = useRouter()

    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const handleSubmit = async (e) => {
    e.preventDefault()
    

    const data = {
        judulFakta: document.getElementById("judul").value,
        isiFakta: document.getElementById("isi").value,
        sumberFakta: document.getElementById("sumber").value,
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
            const result = await response.json()
            router.push('/blog')

            if (result) {
                alert("Cerpen berhasil dibuat!")
              }
        } catch (error) {
            console.error(error)
          }
 };

 return (
      <Format>
        <div className="pt-44">test
      <button onClick={handleSubmit}>Submit</button>

      <button onClick={openModal}>Buka Modal</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <input
                  id="judul"
                  name="judul"
                  type="text"
                  placeholder="Masukkan Judul"
                  className="bg-transparent hover:border-amber-200 hover:shadow-lg transition duration-300 ease-in-out border-b border-gray-400 focus:outline-none focus:border-amber-200"
                  value={judulFakta}
                  onChange={(e) => setJudulFakta(e.target.value)}
                />
            {/* <p>{data.isiFakta}</p>
            <p>Sumber: {data.sumberFakta}</p> */}
          </div>
        </div> 
      )}
      </div>
      </Format>  
 )
}
