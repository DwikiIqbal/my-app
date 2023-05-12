import { observer } from "mobx-react-lite"
import Link from "next/link"
import { useStore } from "./StoreProvider"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Modal from "./modal"
import ModalDetail from "./modal-detail"


const Section = observer((props) => {
    // store digunakan untuk menyimpan setiap class yang sudah dibuat. Contoh nya seperti class pada artikel dan fact
    const store = useStore()
    // membuat state dataArtikel 
    const [dataArtikel, setDataArtikel] = useState([])
    const [dataFact, setDataFact] = useState([])

    // menjalankan fungsi loadInitialData yang didalamnya ada function untuk artikel 
    useEffect(() => {
      loadInitialData()
    }, [])

    const loadInitialData = async () => {
      // data yang diperoleh dari kedua function tersebut akan disimpan ke dalam dataArtikel dan dataFact menggunakan function setDataArtikel dan setDataFact. lalu disimpan kedalam body
        try {
            const artikel = await store.artikel.getArtikel();
            setDataArtikel(artikel.body.data)
            const fact = await store.fact.getFact()
            setDataFact(fact.body.data)
        } catch (error) {
            console.log(error, 'err');
        }
    }

    return (
        <section className="py-16">
          
             {/* CONTAINER Judul*/}
             <div className="">
               
                </div>
            <div className="container mx-auto md:px-24">
            
                
                <h1 className="font-bold text-5xl py-12 w-1/2">
                <span className=" hover:text-amber-500 transition duration-300 ease-in-out text-shadow">We </span> 
                <span className=" hover:text-amber-500 transition duration-300 ease-in-out text-shadow">Present </span> 
                <span className=" hover:text-amber-500 transition duration-300 ease-in-out text-shadow">The </span>  
                <span className=" hover:text-amber-500 transition duration-300 ease-in-out text-shadow">Best </span> 
                <span className=" hover:text-amber-500 transition duration-300 ease-in-out text-shadow">Collection </span> 
                <span className=" hover:text-amber-500 transition duration-300 ease-in-out text-shadow">of </span> 
                <span className=" hover:text-amber-500 transition duration-300 ease-in-out text-shadow">Short </span> 
                <span className=" hover:text-amber-500 transition duration-300 ease-in-out text-shadow">Stories </span> 
                </h1>
               
                
                
                {/* Pembungkus Container Artikel */}
                <div className="xl:container mx-auto max-w-screen-xl">
                  <div className="pb-20 flex overflow-hidden sm:w-full sm:px-auto">
                <img src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfDF8MHx8&auto=format&fit=crop&w=500&q=60" className="w-1/2  mx-auto h-[450px]" alt=""/>
                <img src="https://images.unsplash.com/photo-1630343710506-89f8b9f21d31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGJvb2t8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" className="w-1/2  mx-auto h-[450px]" alt=""/> 
                <img src="https://images.unsplash.com/photo-1529590003495-b2646e2718bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGJvb2t8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" className="w-1/2 pr-4 mx-auto h-[450px]"/>
                </div> 
                 <div className="flex flex-col sm:flex-row sm:justify-between gap-5">

                  {/* Artikel Utama  */}
                  
                  <div className="bg-gray-50 p-10 w-full">
                  <div className="text-2xl font-bold ">
                  <h1>
                    <span className=" hover:text-amber-500 transition duration-300 ease-in-out text-shadow">Kumpulan </span> 
                    <span className=" hover:text-amber-500 transition duration-300 ease-in-out text-shadow">Cerpen </span>
                    <span className=" hover:text-amber-500 transition duration-300 ease-in-out text-shadow">Terbaru</span> 
                  </h1>
                </div>
                <div className="pb-16">
                  <p className="text-lg"> Baca kumpulan cerpen terbaru dan terbaik yang akan membuatmu terbawa suasana. Temukan macam macam kategori disini dan nikmati pengalaman membaca yang mengesankan di <span className="hover:text-amber-500 transition duration-300 ease-in-out text-shadow">CerpenBlog</span> .</p>
                </div>

                  <div className="pb-10 px-[5px] rounded-xl grid gap-10 md:grid-cols-2 grid-rows-2 overflow-hidden ">

                    {/* Menangkap data sesuai fungsi nya, mengembalikan elemen-elemen dalam bentuk elemen HTML sesuai dengan data yang diterima, dan akan terus dilooping sesuai dengan data pada setiap elemen Array */}

                  {dataArtikel.map((item) => (
                      <div className="sm:w-full sm:w-auto bg-white px-3 rounded-lg shadow-lg hover:shadow-amber-200/50 transition duration-300 ease-in-out ">
                      {/* <img className="w-full" src="gambar.jpg" alt="gambar" /> */}
                      <h1 className="text-xl font-bold text-center py-3 sm:py-5">{item.judulArtikel}</h1>

                      <div className="line-clamp-[7]"> 
                      <p className="italic pb-2 ">Genre : <span className="text-amber-500">{item.kategoriArtikel.join(", ")}</span></p> 
                    
                      <p>{item.isiArtikel}</p> 
                      </div>
                      <Link href={{ pathname: '/blog/[slug]', query: { id: item.id } }} as={`/blog/${item.id}`} className="block w-44 mx-auto text-center text-blue-500 my-4 hover:text-blue-300 transition duration-300 ease-in-out">
                       Read Me
                      </Link>
                      </div>
                  ))}
                     
                     </div>
                   </div>
                   
                  <Modal/>
                </div>
                
                </div>
              </div>
            
        </section>
    )
})

export default Section