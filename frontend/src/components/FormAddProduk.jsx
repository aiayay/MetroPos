import React, { useState, useEffect } from "react";
import { API_URL } from "../features/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../index.css";

const FormAddProduk = () => {
  const [nmproduk, setNmproduk] = useState("");
  const [harga_jual, setHarga_jual] = useState("");
  const [stok, setStok] = useState("");
  const [satuan, setSatuan] = useState("");
  const [merk, setMerk] = useState("");
  const [nama_kategori, setNamaKategori] = useState(""); // Menggunakan nama_kategori

  // const [foto_produk, setFoto_produk] = useState("");
  const [diskon, setDiskon] = useState("");
  const [msg, setMsg] = useState("");
  const [kategoriList, setKategoriList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getKategori = async () => {
      try {
        const response = await axios.get(API_URL + "kategori");
        setKategoriList(response.data.data); // Set daftar kategori dari response API
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    getKategori();
  }, []);

  const simpanProduk = async (e) => {
    e.preventDefault();

    // Validasi data sebelum dikirim
    if (!nama_kategori) {
      setMsg("Kategori harus dipilih.");
      return;
    }

    const data = {
      nmproduk: nmproduk,
      harga_jual: harga_jual,
      stok: stok,
      satuan: satuan,
      merk: merk,
      nama_kategori: nama_kategori, // Pastikan ini adalah id_kategori
      diskon: diskon,
    };

    console.log("Data yang dikirim: ", data); // Log data sebelum dikirim
    try {
      await axios.post(API_URL + "produk", data);
      navigate("/produk");
    } catch (error) {
      if (error.response) {
        console.error("Error response: ", error.response.data); // Log error detail
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Produk</h1>
      <h2 className="subtitle">Tambah Produk</h2>
      <div className="card is-shadowless">
        <div className="card-content has-background-light">
          <div className="content">
            <form className="box has-background-light" onSubmit={simpanProduk}>
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
                  <input type="text" className="input" placeholder="Nama Produk" value={nmproduk} onChange={(e) => setNmproduk(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Harga Jual</label>
                <div className="control">
                  <input type="number" className="input" placeholder="Harga Jual" value={harga_jual} onChange={(e) => setHarga_jual(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Stok</label>
                <div className="control">
                  <input type="number" className="input" placeholder="stok" value={stok} onChange={(e) => setStok(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Satuan</label>
                <div className="control">
                  <input type="text" className="input" placeholder="Satuan" value={satuan} onChange={(e) => setSatuan(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Merk</label>
                <div className="control">
                  <input type="text" className="input" placeholder="Merk" value={merk} onChange={(e) => setMerk(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Kategori</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select value={nama_kategori} onChange={(e) => setNamaKategori(e.target.value)}>
                      <option value="">Pilih Kategori</option>
                      {kategoriList.map((kat) => (
                        <option key={kat.id_kategori} value={kat.id_kategori}>
                          {kat.nama_kategori}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              {/* <div className="field">
                <label className="label">Foto Produk</label>
                <div className="control">
                  <input type="file" className="input" placeholder="foto" value={foto_produk} onChange={(e) => setFoto_produk(e.target.value)} />
                </div>
              </div> */}
              <div className="field">
                <label className="label">Diskon</label>
                <div className="control">
                  <input type="text" className="input" placeholder="diskon" value={diskon} onChange={(e) => setDiskon(e.target.value)} />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Simpan
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

export default FormAddProduk;
