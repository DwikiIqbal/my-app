import { useState, useEffect } from "react";
import { useStore } from "./StoreProvider";
import { useRouter } from "next/router";
import { Button, Modal, message, Space, Form, Input} from "antd";

export default function ModalFakta() {
  // Properti Post Modal untuk Fact
  const store = useStore();
  const router = useRouter();
  const [judulFakta, setJudulFakta] = useState("");
  const [isiFakta, setIsiFakta] = useState("");
  const [sumberFakta, setSumberFakta] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);

  const [dataFact, setDataFact] = useState([]);
  const [factData, setFactData] = useState({});

  const [form] = Form.useForm();

  const handleCancel = () => {
    setJudulFakta("");
    setIsiFakta("");
    setSumberFakta("");
    setShowModal(false);
    setShowModalDetail(false)
  };

  // Mengambil semua data fact
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const fact = await store.fact.getFact();
      setDataFact(fact.body.data);
    } catch (error) {
      console.log(error, "err");
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  // Fungsi untuk membuka modal detail dengan data fakta yang sesuai
  const openModalDetail = (item) => {
    setFactData(item);
    setShowModalDetail(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!judulFakta || !isiFakta || !sumberFakta){
      message.error("Pastikan semua diisi dengan lengkap");
      return;
    }

    const data = {
      judulFakta,
      isiFakta,
      sumberFakta,
    };

    try {
      const result = await store.fact.createFact(data);
      console.log(result);

      if (result) {
        // Munculkan pesan sukses
        message.success('Fakta berhasil ditambahkan!');
        // setiap nilai state menjadi kosong
        setJudulFakta("");
        setIsiFakta("");
        setSumberFakta("");

        closeModal();

        // tambahkan data yang baru ke dalam array dataFact
        setDataFact([...dataFact, data]);

        // simpan data ke localStorage
        localStorage.setItem("factData", JSON.stringify(result.body.data));
      } else {

      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="max-w-lg w-[280px] bg-gray-50 px-2 rounded-lg flex-col pb-4">
        {/* Mengambil data yang berada di dataFact lalu dipetakan sampai seluruhnya berhasil di ambil */}
        <div className="text-center text-2xl py-10 font-bold">
          <h1>Funfact</h1>
        </div>
        {dataFact.map((item) => (
          <div className="mb-8 flex justify-center align-center">
            <div className="max-w-lg w-[160px] border-black bg-white px-2 py-2 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out overflow-hidden">
              <h1 className="text-xl font-bold text-center py-2 px-2">
                {item.judulFakta}
              </h1>
              <div className="px-[3px] line-clamp-[3]">
                <p>{item.isiFakta}</p>
                <br />
              </div>
              <div className="text-center flex justify-center my-2 cursor-pointer">
                <a
                  type=""
                  className="text-blue-500 hover:text-blue-800 transition duration-300 ease-in-out"
                  onClick={() => openModalDetail(item)}
                >
                  Read Me
                </a>
              </div>
            </div>
          </div>
        ))}

        {showModalDetail && (
          <Modal open={showModalDetail} onCancel={handleCancel} footer={null}>
            <div className="text-3xl font-bold mb-2">{factData.judulFakta}</div>
            <p className=" text-xl text-gray-700 text-base pt-4">
              {factData.isiFakta}
            </p>
            <br />
            <p className=" text-gray-700 text-base">
              Sumber: {factData.sumberFakta}
            </p>
          </Modal>
        )}

        {/* Membuat dataFact sesuai value nya */}
        <div className="text-center mt-auto px-2 pt-8">
          <button
            onClick={() => setShowModal(true)}
            className="w-[200px] p-2 bg-blue-500 rounded-lg hover:bg-blue-400 text-zinc-100 transition duration-500 ease-in-out"
          >
            Tambahkan Fakta Menarik Lainnya...
          </button>
        </div>

        {/* Menampilkan form untuk Funfact yang ditampilkan berupa modal */}
        {showModal && (
            <Modal
            visible={showModal}
            title="Buat Funfact Kamu"
            onCancel={handleCancel}
            footer={null}
            destroyOnClose
          >
            <Form layout="vertical" className="pt-2">
              <input
                  type="text"
                  value={judulFakta}
                  className="rounded-lg bg-stone-100 border-line w-full h-10 pl-2"
                  placeholder="Masukkan Judul"
                  required
                  onChange={(e) => setJudulFakta(e.target.value)}
              />
              <br/>
              <br/>
            
              <textarea
                  value={isiFakta}
                  rows="7"
                  id="isiFakta"
                  name="isiFakta"
                  type="text"
                  placeholder="Masukkan Isi"
                  className="rounded-lg bg-stone-100 w-full pl-2 py-2"
                  onChange={(e) => setIsiFakta(e.target.value)}
                  required
              />
              <br/>
              <br/>

              <input
                   type="text"
                   value={sumberFakta}
                   className="rounded-lg bg-stone-100 w-full h-10 pl-2"
                   placeholder="Masukkan Sumbernya"
                   onChange={(e) => setSumberFakta(e.target.value)}
                   required
              />
                 <div className="pt-6">
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="bg-green-400 px-2 rounded  hover:bg-green-500 transition duration-500 ease-in-out"
                  >
                    Tambah
                  </button>
                  </div>
            </Form>
          </Modal>
           
        )}
      </div>
    </>
  );
}
