import { observer } from "mobx-react-lite"
import Link from "next/link"
import { useStore } from "./StoreProvider"
import { useEffect, useState } from "react"

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

    console.log(dataFact, 'list')
    return (
        <section className="py-16">
          
             {/* CONTAINER Judul*/}
            <div className="container mx-auto md:px-24">
                <h1 className="font-bold text-4xl py-12 text-center">Page</h1>
                
                {/* Pembungkus Container Artikel */}
                <div className="xl:container mx-auto max-w-screen-xl">
                 <div className="flex flex-col sm:flex-row sm:justify-between gap-5">

                  {/* Artikel Utama  */}
                  
                  <div className="bg-gray-50 p-10 w-full">
                  <div className="text-2xl font-bold ">
                  <h1>
                    <span className=" hover:text-teal-400 transition duration-300 ease-in-out text-shadow">Kumpulan Cerpen Terbaru</span> 
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
                        <a href={{ pathname: '/blog/[slug]', query: { id: item.id } }} as={`/blog/${item.id}`} className="block mx-auto text-center text-blue-500 my-4">
                          Read Me
                        </a>
                      </div>
                    </div>
                  ))}
                  <div className="mt-auto object-bottom pt-80 text-center "> 
                  <button href={'blog/'} className="p-2 bg-blue-500 rounded-lg hover:bg-blue-400 text-zinc-100 transition duration-500 ease-in-out">Tambah Fakta Menarik Lainnya...</button>
                  </div>

                  </div> 
                </div>
              </div>
            </div>
        </section>
    )
})

export default Section