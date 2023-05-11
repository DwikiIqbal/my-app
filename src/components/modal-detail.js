import { useState, useEffect } from "react";
import { useStore } from "./StoreProvider";

export default function ModalDetail({id}) {
  const [dataFact, setDataFact] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const store = useStore();

  useEffect(() => {
    async function fetchData() {
      try { 
        const fact = await store.fact.getFactById(id);
        setDataFact(fact.body.data);
      } catch (error) {
        console.log(error, 'err');
      }
    }
    fetchData();
  }, [id]);

  const openModal = (id) => {
    setIsOpen(true);
    setDataFact(store.fact.getFactById(id))
  }

  const closeModal = () => {
    setIsOpen(false);
  }
  
  return (
    <>
      <button onClick={openModal} className="block mx-auto text-center text-blue-500 my-4" >Read Me</button>
      {isOpen && Object.keys(dataFact).length > 0 && (
        <div className="">
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-gray-100 p-8 rounded-lg shadow-lg grid w-1/4">
              <div className="font-bold text-xl pb-4">
                <h1>{dataFact.judul}</h1>
              </div>
              <p>{dataFact.isi}</p>
              <p className="text-sm text-gray-600">{dataFact.sumber}</p>
              <div className="pt-6 flex gap-2 float-right">   
                <span className="close cursor-pointer bg-blue-400 px-2 rounded" onClick={closeModal}>close</span>
              </div> 
            </div>
          </div>
        </div> 
      )}
    </>
  )
}
