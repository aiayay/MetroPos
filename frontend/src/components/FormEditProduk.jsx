import React, { useState, useEffect } from "react";
import { API_URL } from "../features/constants";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../index.css";

const FormEditProduk = () => {
  const [nmproduk, setNmproduk] = useState("");
  const [harga_jual, setHarga_jual] = useState("");
  const [stok, setStok] = useState("");
  const [satuan, setSatuan] = useState("");
  const [merk, setMerk] = useState("");
  const [id_kategori, setKategori] = useState("");
  const [foto_produk, setFoto_produk] = useState(""); // URL foto yang ada
  const [fileFoto, setFileFoto] = useState(null); // File baru yang diunggah
  const [diskon, setDiskon] = useState("");
  const [daftarKategori, setDaftarKategori] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id_produk } = useParams();

  useEffect(() => {
    const getKategori = async () => {
      try {
        const response = await axios.get(`${API_URL}kategori`);
        const data = Array.isArray(response.data) ? response.data : response.data.data;
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
        const response = await axios.get(`${API_URL}produk/${id_produk}`);
        const produk = response.data;
        setNmproduk(produk.nmproduk);
        setHarga_jual(produk.harga_jual);
        setStok(produk.stok);
        setSatuan(produk.satuan);
        setMerk(produk.merk);
        setKategori(produk.id_kategori);
        setFoto_produk(produk.foto_produk);
        setDiskon(produk.diskon);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.error || "Produk tidak ditemukan.");
        } else {
          setMsg("Terjadi kesalahan saat mengambil data produk.");
        }
      }
    };
    getProdukById();
  }, [id_produk]);

  const editProduk = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('nmproduk', nmproduk);
      formData.append('harga_jual', harga_jual);
      formData.append('stok', stok);
      formData.append('satuan', satuan);
      formData.append('merk', merk);
      formData.append('id_kategori', id_kategori);
      formData.append('diskon', diskon);
      
      if (fileFoto) {
        formData.append('foto_produk', fileFoto);
      }

      const response = await axios.put(`${API_URL}produk/${id_produk}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate("/produk");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.error || 'Terjadi kesalahan saat mengedit produk.');
      } else {
        setMsg('Terjadi kesalahan saat mengedit produk.');
      }
    }
  };

  const handleFileChange = (e) => {
    setFileFoto(e.target.files[0]);
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
                  <input
                    type="text"
                    className="input"
                    placeholder="Nama Produk"
                    value={nmproduk || ""}
                    onChange={(e) => setNmproduk(e.target.value)}
                    required
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
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Stok</label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    placeholder="Stok"
                    value={stok || ""}
                    onChange={(e) => setStok(e.target.value)}
                    required
                  />
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
                    required
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
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Kategori</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={id_kategori || ""}
                      onChange={(e) => setKategori(e.target.value)}
                      className="text-black"
                      required
                    >
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
                    <div className="image-container mb-2">
                      <img
                        src={foto_produk}
                        alt="Foto Produk"
                        style={{ maxWidth: "200px", maxHeight: "200px" }}
                      />
                    </div>
                  )}
                  <input type="file" className="input" onChange={handleFileChange} accept="image/*" />
                </div>
              </div>
              <div className="field">
                <label className="label">Diskon</label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    placeholder="Diskon"
                    value={diskon || ""}
                    onChange={(e) => setDiskon(e.target.value)}
                  />
                </div>
              </div>

              <div className="field is-grouped">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Edit
                  </button>
                </div>
                <div className="control">
                  <Link to="/produk" className="button is-danger">
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
