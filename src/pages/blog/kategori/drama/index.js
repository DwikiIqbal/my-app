import { useEffect, useState } from "react";
import { useStore } from "@/components/StoreProvider";
import Format from "@/layout/format";
import Link from "next/link";

export default function Drama() {
  const store = useStore();
  const [dramaArtikel, setDramaArtikel] = useState([]);

  useEffect(() => {
    loadDramaArtikel();
  }, []);

  const loadDramaArtikel = async () => {
  try {
    const artikel = await store.artikel.getArtikel();
    const dramaArtikelData = artikel.body.data.filter((artikel) => {
      if (Array.isArray(artikel.kategoriArtikel)) {
        return artikel.kategoriArtikel.includes('drama');
      } else {
        return artikel.kategoriArtikel === 'drama';
      }
    });
    setDramaArtikel(dramaArtikelData);
    console.log(dramaArtikelData);
  } catch (error) {
    console.log(error, 'err');
  }
};

  return (
    <>
    <Format>
    <div className="xl:container mx-auto max-w-screen-xl px-20 pt-32 pb-44">
    <h1 className="text-4xl pb-4">Drama Cerpen</h1>
      <div className="bg-gray-50 p-8">
      
      {dramaArtikel.map((artikel) => (
        <div key={artikel.id} className="pb-20">
          <h4 className="text-2xl font-bold">{artikel.judulArtikel}</h4>
          <p className="text-amber-500">{artikel.kategoriArtikel.join(', ')}</p>
          <br />
          <p className="line-clamp-[10]">{artikel.isiArtikel}</p>
          <div className="float-right pt-4">
          <Link  href={{ pathname: '/blog/[slug]', query: { id: artikel.id } }} as={`/blog/${artikel.id}`} className="text-blue-500 my-4 hover:text-blue-600 transition duration-300 ease-in-out">Baca lanjutan ceritanya...</Link>
          </div> 
        </div>
      ))}
      </div>
      </div>
      </Format>
    </>
  );
}
