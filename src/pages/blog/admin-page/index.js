import HeaderAdmin from "@/components/header-admin";
import { useStore } from "@/components/StoreProvider";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, message, Popconfirm } from "antd";
import { MdModeEditOutline, MdOutlineModeEdit } from "react-icons/md";
import { BsFillTrash3Fill, BsTrash } from "react-icons/bs";

export default function Admin() {
  // store digunakan untuk menyimpan setiap class yang sudah dibuat. Contoh nya seperti class pada artikel dan fact
  const store = useStore();
  // membuat state dataArtikel
  const [dataArtikel, setDataArtikel] = useState([]);
  const [dataFact, setDataFact] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const router = useRouter();

  // menjalankan fungsi loadInitialData yang didalamnya ada function untuk artikel
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if(!storedToken){
      router.push('/blog/admin-login')
    } else {
      loadInitialData();
    }
    
  }, []);

  const loadInitialData = async () => {
    // data yang diperoleh dari kedua function tersebut akan disimpan ke dalam dataArtikel dan dataFact menggunakan function setDataArtikel dan setDataFact. lalu disimpan kedalam body
    try {
       // Lakukan permintaan data ke API dengan menyertakan token di header
       const token = localStorage.getItem('token');
       const headers = {
         Authorization: `Bearer ${token}`,
       };

      const artikel = await store.artikel.getArtikel();
      setDataArtikel(artikel.body.data);

      const fact = await store.fact.getFact();
      setDataFact(fact.body.data);

    } catch (error) {
      console.log(error, "err");
    }
  };

  // METHOD DELETE
  const deleteArtikel = async (id) => {
    try {
      await store.artikel.deleteArtikel(id);
      const updatedData = dataArtikel.filter((item) => item.id !== id);
      setDataArtikel(updatedData);
      localStorage.removeItem("artikelData");
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDeleteArtikel = (id) => {
    deleteArtikel(id);
    const artikel = dataArtikel.find((item) => item.id === id);
    if (artikel) {
      message.success(
        `Cerpen berjudul "${artikel.judulArtikel}" berhasil terhapus`
      );
    }
  };

  const deleteFact = async (id) => {
    try {
      await store.fact.deleteFact(id);
      const updatedData = dataFact.filter((item) => item.id !== id);
      setDataFact(updatedData);
      localStorage.removeItem("factData");
      // router.push('/blog/admin');
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDeleteFakta = (id) => {
    deleteFact(id);
    const fakta = dataFact.find((item) => item.id === id);
    if (fakta) {
      message.success(
        `Fakta berjudul "${fakta.judulFakta}" berhasil terhapus`
      );
    }
  };

  const cancelDelete = () => {
    setShowDescription(false);
    message.error("Delete canceled");
  };

  const handleDeleteButtonClick = (id) => {
    setShowDescription(true);
  };

  return (
    <>
    <HeaderAdmin></HeaderAdmin>
        <div className="xl:container mx-auto max-w-screen-xl px-16 pt-10 pb-44 bg-white">
          <div className="">
            <div className="xl:contanier xl:mx-auto flex flex-col items-center sm:flex-row sm:justify-between  py-3">
              <h3 className="text-2xl pb-4">Data Cerpen</h3>
              <div className="">
                <Link
                  href={"/blog/add-artikel"}
                  className="p-2 bg-blue-500 rounded-md hover:bg-blue-400 text-zinc-100 transition duration-500 ease-in-out"
                >
                  Tambah
                </Link>
              </div>
            </div>
            <table class="min-w-full">
              <thead>
                <tr>
                  <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Judul
                  </th>
                  <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Isi
                  </th>
                  <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pembuat
                  </th>
                  <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Navigasi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-cover bg-center divide-y divide-gray-200">
                {dataArtikel.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.judulArtikel}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.kategoriArtikel.join(", ")}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis"
                      style={{ maxWidth: "250px" }}
                    >
                      {item.isiArtikel}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis"
                      style={{ maxWidth: "300px" }}
                    >
                      {item.pembuatArtikel}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-2 justify-center">
                      <Link
                        href={{
                          pathname: "/blog/update/[slug]",
                          query: { id: item.id },
                        }}
                        as={`/blog/update/${item.id}`}
                        className=" bg-amber-400 hover:bg-amber-500 transition duration-500 ease-in-out rounded-md px-2 py-2 mr-2"
                      >
                        <MdOutlineModeEdit className="" />
                      </Link>

                      <Popconfirm
                        title="Hapus Cerpen ini?"
                        onConfirm={() => confirmDeleteArtikel(item.id)}
                        onCancel={cancelDelete}
                        okText={<span className="text-black">Yes</span>}
                        cancelText="No"
                      >
                        <button
                          className="bg-red-500 hover:bg-red-600 transition duration-500 ease-in-out rounded-md px-2 py-2 mr-2"
                          onClick={() => handleDeleteButtonClick(item.id)}
                        >
                          <BsTrash />
                        </button>
                      </Popconfirm>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-32 ">
            <h3 className="text-2xl pb-4">Data Fakta</h3>
            <table class="min-w-full">
              <thead>
                <tr>
                  <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Judul
                  </th>
                  <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Isi
                  </th>
                  <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sumber
                  </th>
                  <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Navigasi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-cover bg-center divide-y divide-gray-200">
                {dataFact.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.judulFakta}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis"
                      style={{ maxWidth: "300px" }}
                    >
                      {item.isiFakta}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis"
                      style={{ maxWidth: "300px" }}
                    >
                      {item.sumberFakta}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                      <Popconfirm
                        title="Hapus Fakta ini?"
                        onConfirm={() => confirmDeleteFakta(item.id)}
                        onCancel={cancelDelete}
                        okText={<span className="text-black">Yes</span>}
                        cancelText="No"
                      >
                        <button
                          className="bg-red-500 hover:bg-red-600 transition duration-500 ease-in-out rounded-md px-2 py-2 mr-2"
                          onClick={() => handleDeleteButtonClick(item.id)}
                        >
                          <BsTrash />
                        </button>
                      </Popconfirm>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      
    </>
  );
}
