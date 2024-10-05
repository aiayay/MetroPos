import React, { useState, useEffect } from "react";
import { API_URL } from "../features/constants";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../index.css";

const FormEditProduk = () => {
  const [nmproduk, setNmproduk] = useState("");
  const [harga_jual, setHarga_jual] = useState("");
  const [stok, setStok] = useState("");
  const [satuan, setSatuan] = useState("");
  const [merk, setMerk] = useState("");
<<<<<<< HEAD
  const [nama_kategori, setNamaKategori] = useState(""); // Menggunakan nama_kategori
  const [foto_produk, setFoto_produk] = useState(null); // State untuk foto produk
=======
  const [id_kategori, setKategori] = useState("");
  const [foto_produk, setFoto_produk] = useState(""); // URL untuk foto produk
  const [fileFoto, setFileFoto] = useState(null); // State untuk file foto
>>>>>>> 8ac51bf2a7f050b677e1e04c39da0c781c8cbf02
  const [diskon, setDiskon] = useState("");
  const [msg, setMsg] = useState("");
  const [kategoriList, setKategoriList] = useState([]);
  const navigate = useNavigate();
  const { id_produk } = useParams();

  useEffect(() => {
    const getKategori = async () => {
      try {
        const response = await axios.get(API_URL + "kategori");
<<<<<<< HEAD
        setKategoriList(response.data.data); // Set daftar kategori dari response API
=======
        const data = Array.isArray(response.data.data) ? response.data.data : [];
        setDaftarKategori(data);
>>>>>>> 8ac51bf2a7f050b677e1e04c39da0c781c8cbf02
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    getKategori();
  }, []);

  useEffect(() => {
    const getProdukById = async () => {
      try {
        const response = await axios.get(API_URL + "produk/" + id_produk);
        setNmproduk(response.data.nmproduk);
        setHarga_jual(response.data.harga_jual);
        setStok(response.data.stok);
        setSatuan(response.data.satuan);
        setMerk(response.data.merk);
        setNamaKategori(response.data.id_kategori);
        setFoto_produk(response.data.foto_produk);
        setDiskon(response.data.diskon);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProdukById();
  }, [id_produk]);

  const editProduk = async (e) => {
    e.preventDefault();
<<<<<<< HEAD

    if (!nama_kategori) {
      setMsg("Kategori harus dipilih.");
      return;
    }

    const formData = new FormData(); // Membuat FormData untuk mengirimkan file dan data lainnya
=======
    const formData = new FormData();
  
    // Tambahkan semua data ke formData
>>>>>>> 8ac51bf2a7f050b677e1e04c39da0c781c8cbf02
    formData.append("nmproduk", nmproduk);
    formData.append("harga_jual", harga_jual);
    formData.append("stok", stok);
    formData.append("satuan", satuan);
    formData.append("merk", merk);
<<<<<<< HEAD
    formData.append("nama_kategori", nama_kategori);
    formData.append("diskon", diskon);
    if (foto_produk) {
      formData.append("foto_produk", foto_produk); // Menambahkan file gambar jika ada
    }

    try {
      await axios.post(API_URL + "produk", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Mengirimkan sebagai multipart form
=======
    formData.append("id_kategori", id_kategori);
    formData.append("diskon", diskon);
  
    // Tambahkan foto_produk hanya jika ada file yang dipilih
    if (fileFoto) {
      formData.append("foto_produk", fileFoto);
    }
  
    try {
      await axios.put(API_URL + "produk/" + id_produk, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Pastikan Content-Type yang benar
>>>>>>> 8ac51bf2a7f050b677e1e04c39da0c781c8cbf02
        },
      });
      navigate("/produk");
    } catch (error) {
      if (error.response) {
        console.error("Error response: ", error.response.data);
        setMsg(error.response.data.error || error.response.data.msg);
      }
    }
  };
  
  const handleFileChange = (e) => {
    setFoto_produk(e.target.files[0]); // Mengambil file yang dipilih
  };
  return (
    <div>
      <h1 className="title">Produk</h1>
      <h2 className="subtitle">Tambah Produk</h2>
      <div className="card is-shadowless">
        <div className="card-content has-background-light">
          <div className="content">
          <form className="box has-background-light" onSubmit={editProduk}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Kode Produk</label>
                <div className="control">
                  <input type="text" className="input" readOnly />
                </div>
              </div>
              <div className="field">
                <label className="label">Nama Produk</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Nama Produk"
                    value={nmproduk || ""}
                    onChange={(e) => setNmproduk(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Harga Jual</label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    placeholder="Harga Jual"
                    value={harga_jual || ""}
                    onChange={(e) => setHarga_jual(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Stok</label>
                <div className="control">
<<<<<<< HEAD
                  <input
                    type="number"
                    className="input"
                    placeholder="Stok"
                    value={stok || ""} 
                    onChange={(e) => setStok(e.target.value)}
                  />
=======
                  <input type="number" className="input" placeholder="Stok" value={stok || ""} onChange={(e) => setStok(e.target.value)} />
>>>>>>> 8ac51bf2a7f050b677e1e04c39da0c781c8cbf02
                </div>
              </div>
              <div className="field">
                <label className="label">Satuan</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Satuan"
                    value={satuan || ""}
                    onChange={(e) => setSatuan(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Merk</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Merk"
                    value={merk || ""}
                    onChange={(e) => setMerk(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Kategori</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={nama_kategori || ""}
                      onChange={(e) => setNamaKategori(e.target.value)}
                    className="text-black" >
                      <option value="">Pilih Kategori</option>
                      {kategoriList.map((kat) => (
                        <option key={kat.id_kategori} value={kat.nama_kategori}>
                          {kat.nama_kategori}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Foto Produk</label>
                <div className="control">
                  <input
                    type="file"
                    className="input"
                    onChange={handleFileChange} // Menangani perubahan input file
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Diskon</label>
                <div className="control">
<<<<<<< HEAD
                  <input
                    type="text"
                    className="input"
                    placeholder="Diskon"
                    value={diskon || ""}
                    onChange={(e) => setDiskon(e.target.value)}
                  />
=======
                  <input type="text" className="input" placeholder="Diskon" value={diskon || ""} onChange={(e) => setDiskon(e.target.value)} />
>>>>>>> 8ac51bf2a7f050b677e1e04c39da0c781c8cbf02
                </div>
              </div>

              <div className="field">
                <div className="control">
                <button type="submit" className="button is-success">
                    Edit
                  </button>

                  <Link to="/produk" className="button is-danger mb-2">
                    Cancel
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditProduk;
