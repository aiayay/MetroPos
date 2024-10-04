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
  const [id_kategori, setKategori] = useState("");
  const [foto_produk, setFoto_produk] = useState(""); // URL untuk foto produk
  const [fileFoto, setFileFoto] = useState(null); // State untuk file foto
  const [diskon, setDiskon] = useState("");
  const [daftarKategori, setDaftarKategori] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id_produk } = useParams();

  useEffect(() => {
    const getKategori = async () => {
      try {
        const response = await axios.get(API_URL + "kategori");
        const data = Array.isArray(response.data.data) ? response.data.data : [];
        setDaftarKategori(data);
      } catch (error) {
        console.error("Gagal mengambil kategori:", error);
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
        setKategori(response.data.id_kategori);
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
    const formData = new FormData();
  
    // Tambahkan semua data ke formData
    formData.append("nmproduk", nmproduk);
    formData.append("harga_jual", harga_jual);
    formData.append("stok", stok);
    formData.append("satuan", satuan);
    formData.append("merk", merk);
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
        },
      });
      navigate("/produk");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  
  const handleFileChange = (e) => {
    setFileFoto(e.target.files[0]); // Ambil file yang dipilih
  };

  return (
    <div>
      <h1 className="title">Produk</h1>
      <h2 className="subtitle">Edit Produk</h2>
      <div className="card is-shadowless">
        <div className="card-content has-background-light">
          <div className="content">
            <form className="box has-background-light" onSubmit={editProduk}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Kode Produk</label>
                <div className="control">
                  <input type="text" className="input" readOnly value={id_produk || ""} />
                </div>
              </div>
              <div className="field">
                <label className="label">Nama Produk</label>
                <div className="control">
                  <input type="text" className="input" placeholder="Nama Produk" value={nmproduk || ""} onChange={(e) => setNmproduk(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Harga Jual</label>
                <div className="control">
                  <input type="number" className="input" placeholder="Harga Jual" value={harga_jual || ""} onChange={(e) => setHarga_jual(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Stok</label>
                <div className="control">
                  <input type="number" className="input" placeholder="Stok" value={stok || ""} onChange={(e) => setStok(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Satuan</label>
                <div className="control">
                  <input type="text" className="input" placeholder="Satuan" value={satuan || ""} onChange={(e) => setSatuan(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Merk</label>
                <div className="control">
                  <input type="text" className="input" placeholder="Merk" value={merk || ""} onChange={(e) => setMerk(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Kategori</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select value={id_kategori || ""} onChange={(e) => setKategori(e.target.value)} className="text-black">
                      <option value="">Pilih Kategori</option>
                      {daftarKategori.map((kat) => (
                        <option key={kat.id_kategori} value={kat.id_kategori}>
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
                  {foto_produk && (
                    <div className="image-container">
                      <img src={foto_produk} alt="Foto Produk" style={{ maxWidth: "200px", maxHeight: "200px" }} />
                    </div>
                  )}
                  <input type="file" className="input" onChange={handleFileChange} />
                </div>
              </div>
              <div className="field">
                <label className="label">Diskon</label>
                <div className="control">
                  <input type="text" className="input" placeholder="Diskon" value={diskon || ""} onChange={(e) => setDiskon(e.target.value)} />
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
