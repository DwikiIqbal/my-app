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
    // membuat state pada setiap data 
    const [dataArtikel, setDataArtikel] = useState([])
    const [dataFact, setDataFact] = useState([])

    // menjalankan fungsi loadInitialData yang didalamnya  terdapat dua function async yaitu artikel dan fact
    useEffect(() => {
      loadInitialData()
    }, [])

    const loadInitialData = async () => {
      // data yang diperoleh dari kedua function tersebut akan disimpan ke dalam dataArtikel dan dataFact menggunakan function setDataArtikel dan setDataFact. lalu disimpan kedalam body
        try {
            const artikel = await store.artikel.getArtikel();
            setDataArtikel(artikel.body.data)
            const fact = await store.fact.getFact();
            setDataFact(fact.body.data)
        } catch (error) {
            console.log(error, 'err');
        }
    }

    // useEffect(() => {
    //   async function fetchData() {
    //     try { 
    //       const fact = await store.fact.getFact();
    //       setDataFact(fact.body.data);
    //     } catch (error) {
    //       console.log(error, 'err');
    //     }
    //   }
    //   fetchData();
    // }, []);
   
    console.log()
    return (
        <section className="py-16">
          
             {/* CONTAINER Judul*/}
             <div className="">
                {/* <img src="https://img.celebrities.id/okz/900/O972jg/master_2d14B0O5uQ_1426_contoh_cerpen_tentang_diri_sendiri.jpg" className="w-full h-[500px] mx-auto" alt=""> 
                </img> */}
                </div>
            <div className="container mx-auto md:px-24">
                <h1 className="font-bold text-4xl py-12 text-center">Page</h1>
                
                
                
                {/* Pembungkus Container Artikel */}
                <div className="xl:container mx-auto max-w-screen-xl">
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




                  {/* Side Artikel (artikel pendek) */}
                 

                   
                  <Modal/>
                </div>
              </div>
            </div>
        </section>
    )
})

export default Section