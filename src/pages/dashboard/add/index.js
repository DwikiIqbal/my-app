"use client"
import React from "react";
import Layout from "@/layout/format";
import { useState, useEffect } from "react";

const { TokoStore } = require("@/store/toko");


const tokoStore = new TokoStore();

// DIGUNAKAN UNTUK MENGAMBIL DATA DARI SERVER DAN MEMPERBARUI STATE "data" DI "TokoStore"
export async function getStaticProps() {
    const data = await tokoStore.getToko();
    const jsonData = JSON.parse(JSON.stringify(data));
    return {
      props: { data: jsonData }
    }
  }



export default function AddToko({data}){
    const [newToko, setNewToko] = useState({namaBarang:'', jenisBarang:'', hargaBarang:0});

    useEffect(() => {
        setNewToko({ namaBarang: '', jenisBarang: '', hargaBarang: 0 });
      }, []);

      const createToko = async () => {
        try {
            const response = await fetch('/api/toko', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newToko)
            });

            const data = await response.json();

            if (response.status === 201) {
                console.log("barang berhasil dibuat");
                console.log("Data toko terbaru", data);
                tokoStore.data.push(data);
                setNewToko({ namaBarang: "", jenisBarang: "", hargaBarang: 0 });
            } else {
                console.log("Terjadi kesalahan saat membuat toko: ", data.message)
            }
        } catch (error) {
            console.log("Terjadi kesalahan saat membuat toko: ", error);
        }
    };

    console.log("data: ", data);

    useEffect(() => {
        // memperbarui data toko setelah membuat toko baru
        tokoStore.getToko().then((data) => {
            const jsonData = JSON.parse(JSON.stringify(data));
            tokoStore.data = jsonData;
        });
    }, []);

    return (
        <>
        <Layout/>
        <script src="https://kit.fontawesome.com/7a8cedecc8.js" crossorigin="anonymous"></script>
            <div className="p-10 columns-1 bg-slate-100 h-screen font-serif">
                <div>Data Barang Kelontong</div>

                {/* digunakan agar bisa menjalankan data.map  */}
                {data && data.length > 0 ? (
            <ul>
             {data.map((item) => (
                 <li key={item.id}>
                 {item.namaBarang} - {item.jenisBarang} - {item.hargaBarang}
                 </li>
             ))}
            </ul>
        ) : (
          <div>Tidak ada data barang kelontong.</div>
        )}
             <br/>   
             <br/>   
             <br/>   
        <div className="text-center text-xl pb-4">Menambahkan Barang Kelontong</div>
            <form action="" method="post" className="box-border rounded-lg max-w-2xl px-8 py-5  mx-auto flex flex-col">
                <div className="grid w-56 ">
                <label htmlfor="namaBarang-input"><i class="fa fa-thin fa-crate-apple"/> Nama Barang</label>
                <input type="text" placeholder="Masukkan nama barang" className="hover:border-blue-500 hover:shadow-lg transition duration-300 ease-in-out bg-slate-100 border-b border-gray-400 focus:outline-none focus:border-blue-500" id="namaBarang-input" value={newToko.namaBarang} onChange={(e) => setNewToko({...newToko, namaBarang: e.target.value})}/>
                <br/> 

                <label htmlfor="jenisBarang-input"> Jenis Barang</label>
                <input type="text" placeholder="Masukkan jenis barang" className="hover:border-blue-500 hover:shadow-lg transition duration-300 ease-in-out bg-slate-100 border-b border-gray-400 focus:outline-none focus:border-blue-500" id="jenisBarang-input" value={newToko.jenisBarang} onChange={(e) => setNewToko({...newToko, jenisBarang: e.target.value})}/>
                <br/> 
                
                <label htmlfor="hargaBarang-input"> Harga Barang</label>
                <input type="text" className="hover:border-blue-500 hover:shadow-lg transition duration-300 ease-in-out bg-slate-100 border-b border-gray-400 focus:outline-none focus:border-blue-500" id="hargaBarang-input" value={newToko.hargaBarang} onChange={(e) => setNewToko({...newToko, hargaBarang: e.target.value})}/>
                <br/>
                <button onClick={createToko} className="bg-amber-400 w-24 rounded-lg">Membuat</button>
                </div>
                </form>
            </div>
         </>
    )
}

