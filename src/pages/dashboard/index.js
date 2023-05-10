import { useEffect, useState } from "react";
import Layout from "@/layout/format";
import { useStore } from "@/components/StoreProvider";
import { observer } from "mobx-react-lite";
import Link from "next/link";



  const Home = observer((props) => {
  const store = useStore()
  const [data, setData] = useState([])

  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    try {
      const data = await store.toko.getToko();
      setData(data.body.data)
    } catch (error) {
      console.log(error, 'err');
    }
  }

  // const {data} = tokoRepository.hooks.useGetToko()

  console.log(data, 'list');

  const greeting = () => {
    return (
      <p className="text-black text-2xl">HALOOOO</p>
    )
  }

  return (
    <>
    <section>
      <Layout/>
    
      <form action="" className="">
      <div className="p-10 columns-1 bg-slate-100 ">
        <p className="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore earum eos explicabo. Possimus sit fugit laudantium aperiam, iure cum voluptatem iusto itaque assumenda totam unde quis, quidem cupiditate voluptas enim! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam alias reprehenderit modi unde, minus accusantium soluta iure dicta quasi nesciunt temporibus delectus. Eveniet autem dolorem ratione quas quae, consequuntur tempora! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi illo sequi quo autem voluptatem expedita quos iste recusandae neque repellendus, eos veritatis asperiores iusto, quod exercitationem aut cumque facilis labore.</p>
        
        <br/>

      <div className="flex inline-grid grid-cols-3 gap-4">
        {data.map((item) => (
            <div key={item.id} className="bg-amber-400 rounded-lg w-70 px-5">
                <p class="text-xl font-medium text-gray-800 pt-2">{item.namaBarang}</p>
                <p class="text-gray-600">{item.jenisBarang} - Rp {item.hargaBarang}</p>
                <li className="list-none bg-amber-100 rounded-lg text-center w-16 my-2"><Link href={'/info'}>Edit</Link></li>
            </div>
          ))}
      </div>

       
      </div>
      </form>
    </section>
    
    </>
  )
})

export default Home