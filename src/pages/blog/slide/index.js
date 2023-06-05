import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useStore } from "@/components/StoreProvider";
import { useEffect, useState } from "react";
import { Carousel } from 'antd';
import Format from "@/layout/format";

const Section = observer((props) => {
  const store = useStore();
  const [dataArtikel, setDataArtikel] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const artikel = await store.artikel.getArtikel();
      setDataArtikel(artikel.body.data);
    } catch (error) {
      console.log(error, "err");
    }
  };

  const onChange = (currentSlide) => {
    setCurrentId(dataArtikel[currentSlide].id);
  };

  return (
    <Format>
     
    <Carousel 
      afterChange={onChange}
      className="custom-carousel"
    >
      {dataArtikel.map((item) => (
        <div key={item.id} className="">
          <div className="px-10 pt-20">
            <h1 className="text-xl font-bold text-center py-3 sm:py-5">
              {item.judulArtikel}
            </h1>
            <div className="">
              <p className="italic pb-2">
                Genre :{" "}
                <span className="text-amber-500">
                  {item.kategoriArtikel.join(", ")}
                </span>
              </p>
              <p className="text-none">{item.isiArtikel}</p>
            </div>
            <div className="py-10 flex float-right">
            <Link href={"/blog"} className="text-blue-500 hover:text-blue-700 text-center rounded-md p-[3px]">
                Kembali ke halaman pertama. . .
          </Link>
            </div>
          </div>
         
        </div>
      ))}
    </Carousel>
   
    </Format>
  );
});

export default Section;
