import { useState } from "react";
import Format from "../../../layout/format";
import { useRouter } from "next/router";
import { Alert, Checkbox } from 'antd';

export default function Add() {
    const [judulArtikel, setJudulArtikel] = useState("")
    const [kategoriArtikel, setKategoriArtikel] = useState([]);
    const [isiArtikel, setIsiArtikel] = useState("")
    const [pembuatArtikel, setPembuatArtikel] = useState("")
    const [showAlert, setShowAlert] = useState(false)
    const router = useRouter()


    const handleSubmit = async (e) => {
      e.preventDefault();
      
      // Get data from the form.
      const data = {
        judulArtikel: document.getElementById("judul").value,
        isiArtikel: document.getElementById("isi").value,
        pembuatArtikel: document.getElementById("pembuat").value,
        kategoriArtikel: kategoriArtikel,
      }
    
      // Send the data to the server in JSON format.
      try {
        const JSONdata = JSON.stringify(data)
        const endpoint = 'http://localhost:4000/artikel'
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSONdata,
        }
        console.log(options);
        // Send the form data to our forms API on Vercel and get a response.
        //   const response = await store.artikel.createArtikel(options)
        const response = await fetch(endpoint, options)
        console.log(response);
        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json();
      setShowAlert(true); // Show the alert before navigating

      setTimeout(() => {
        // Navigate to another page after a delay
        router.push('/blog/admin-page');
      }, 2000); // Delay in milliseconds (adjust as needed)
      } catch (error) {
        console.error(error)
      }
    };

    const handleCheckboxChange = (event) => {
      const selectedKategori = event.target.value.toLowerCase();
      const value = event.target.value;
      const isChecked = event.target.checked;
  
      if (isChecked) {
        setKategoriArtikel([...kategoriArtikel, value]);
      } else {
        setKategoriArtikel(kategoriArtikel.filter((category) => category !== value));
      }
    };
    
    return (
        <>
        <Format>
        <div className="pt-12">
        <div className="xl:container mx-auto max-w-screen-xl ">
        <div className="px-44">

            <h1 className="pt-12 text-center text-2xl pt-10 pb-24">BUAT ARTIKEL MU!</h1>
            <form
              onSubmit={handleSubmit}
              className="rounded-lg w-full flex flex-col"
            >
              <div className="grid w-full text-lg">
                <label htmlFor="" className="text-xl font-bold">
                  📌 JUDUL ARITKEL
                </label>
                <br />
                <input
                  id="judul"
                  name="judul"
                  type="text"
                  placeholder="Masukkan Judul"
                  className="bg-transparent hover:border-amber-200 hover:shadow-lg transition duration-300 ease-in-out border-b border-gray-400 focus:outline-none focus:border-amber-200"
                  value={judulArtikel}
                  onChange={(e) => setJudulArtikel(e.target.value)}
                />
                <br />
                <br />

                <label htmlFor="" className="text-xl font-bold">
                🔖  KATEGORI ARTIKEL
                </label>
                <br />
                <div className="grid grid-cols-3 gap-4 w-[360px]">
                  <div>
                   <Checkbox id="drama" name="kategoriArtikel[]" type="checkbox" value="drama" className="mr-2" onChange={handleCheckboxChange}/>
                   <label htmlFor="drama">Drama</label>
                  </div>
                  <div>
                  <Checkbox id="komedi" name="kategoriArtikel[]" type="checkbox" value="komedi" className="mr-2" onChange={handleCheckboxChange}/>
                  <label htmlFor="komedi">Komedi</label>
                  </div>
                  <div>
                  <Checkbox id="religi" name="kategoriArtikel[]" type="checkbox" value="religi" className="mr-2" onChange={handleCheckboxChange}/>
                  <label htmlFor="religi">Religi</label>
                  </div>
                  <div>
                  <Checkbox id="misteri" name="kategoriArtikel[]" type="checkbox" value="misteri" className="mr-2" onChange={handleCheckboxChange}/>
                  <label htmlFor="misteri">Misteri</label>
                  </div>
                  <div>
                  <Checkbox id="romantis" name="kategoriArtikel[]" type="checkbox" value="romantis" className="mr-2" onChange={handleCheckboxChange}/>
                  <label htmlFor="romantis">Romantis</label>
                  </div>
                  <div>
                  <Checkbox id="aksi" name="kategoriArtikel[]" type="checkbox" value="aksi" className="mr-2" onChange={handleCheckboxChange}/>
                  <label htmlFor="aksi">Aksi</label>
                  </div>
                </div>
                <br />
                <br />
                <label htmlFor="" className="text-xl font-bold">
                  📝 ISI ARTIKEL{" "}
                </label>
                <br />
                <textarea
                  name="isi"
                  id="isi"
                  cols="30"
                  rows="15"
                  className="bg-transparent hover:border-amber-200 hover:shadow-lg transition duration-300 ease-in-out border-b border-gray-400 focus:outline-none focus:border-amber-200"
                  value={isiArtikel}
                  onChange={(e) => setIsiArtikel(e.target.value)}
                ></textarea>
                <br />
                <br />

                <label htmlFor="" className="text-xl font-bold">
                  👤 PEMBUAT{" "}
                </label>
                <br />
                <input
                  id="pembuat"
                  name="pembuat"
                  type="text"
                  placeholder="Masukkan Pembuat"
                  className="bg-transparent hover:border-amber-200 hover:shadow-lg transition duration-300 ease-in-out border-b border-gray-400 focus:outline-none focus:border-amber-200"
                  value={pembuatArtikel}
                  onChange={(e) => setPembuatArtikel(e.target.value)}
                />
                <br />
                <div className="pt-10">
                  <button
                    type="submit"
                    className="bg-amber-400 w-24 rounded-lg float-right hover:bg-amber-300 transition duration-300 ease-in-out"
                    onClick={() => setShowAlert(true)}
                  >
                    Membuat
                  </button>
                  <div className="fixed top-4 right-4 z-50">
                    {showAlert && (
                      <Alert
                        message="Berhasil Membuat"
                        type="success"
                        showIcon
                        closable
                        onClose={() => setShowAlert(false)}
                      />
                    )}
                  </div>

                </div>

              </div>
            </form>
                <br/>
                <br/>
                <br/>
                </div>
                </div>
                </div>
                </Format>
        </>
    )
}