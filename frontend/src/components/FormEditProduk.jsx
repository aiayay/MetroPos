import React, { useState, useEffect } from "react";
import { API_URL } from "../features/constants";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../index.css";

const FormEditProduk = () => {
  const [nmproduk, setNmproduk] = useState("");
  const [harga_jual, setHarga_jual] = useState("");
  const [harga_beli, setHarga_beli] = useState("");
  const [stok, setStok] = useState("");
  const [satuan, setSatuan] = useState("");
  const [merk, setMerk] = useState("");
  const [kategori, setKategori] = useState("");
  const [foto_produk, setFoto_produk] = useState("");
  const [diskon, setDiskon] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id_produk } = useParams();

  useEffect(() => {
    const getProdukById = async () => {
      try {
        const response = await axios.get(API_URL + "produk/" + id_produk);
        setNmproduk(response.data.nmproduk);
        setHarga_jual(response.data.harga_jual);
        setHarga_beli(response.data.harga_beli);
        setStok(response.data.stok);
        setSatuan(response.data.satuan);
        setMerk(response.data.merk);
        setKategori(response.data.kategori);
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
    try {
      await axios.patch(API_URL + "produk/" + id_produk, {
        nmproduk: nmproduk,
        harga_jual: harga_jual,
        harga_beli: harga_beli,
        stok: stok,
        satuan: satuan,
        merk: merk,
        kategori: kategori,
        foto_produk: foto_produk,
        diskon: diskon,
      });
      navigate("/produk");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
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
                  <input type="text" className="input" readOnly />
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
                <label className="label">Harga Beli</label>
                <div className="control">
                  <input type="number" className="input" placeholder="Harga Beli" value={harga_beli || ""} onChange={(e) => setHarga_beli(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Stok</label>
                <div className="control">
                  <input type="number" className="input" placeholder="stok" value={stok || ""} onChange={(e) => setStok(e.target.value)} />
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
                    <select value={kategori || ""} onChange={(e) => setKategori(e.target.value)}>
                      <option value="">Pilih Kategori</option>
                      <option value="id_kategori">Makanan</option>
                      <option value="id_kategori">Minuman</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Foto Produk</label>
                <div className="control">
                  <input type="file" className="input" placeholder="foto" value={foto_produk || ""} onChange={(e) => setFoto_produk(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Diskon</label>
                <div className="control">
                  <input type="text" className="input" placeholder="diskon" value={diskon || ""} onChange={(e) => setDiskon(e.target.value)} />
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
