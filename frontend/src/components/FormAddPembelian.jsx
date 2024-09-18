import React, { useState, useEffect } from "react";
import { API_URL } from "../features/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../index.css";

const FormAddPembelian = () => {
  const [nmproduk, setNmproduk] = useState("");
  const [supplier, setSupplier] = useState("");
  const [stok, setStok] = useState("");
  const [harga_beli, setHarga_beli] = useState("");
  const [kuantitas, setKuantitas] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [msg, setMsg] = useState("");
  const [supplierList, setSupplierList] = useState([]);
  const [produkList, setProdukList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getSupplier = async () => {
      try {
        const response = await axios.get(API_URL + "supplier");
        setSupplierList(response.data.data);
      } catch (error) {
        console.error("erro fetching supplier", error);
      }
    };
    getSupplier();
  }, []);

  useEffect(() => {
    const getProduk = async () => {
      try {
        const response = await axios.get(API_URL + "produk");
        console.log(response.data); // Cek apakah data produk muncul
        setProdukList(response.data.data || []); // Default ke array kosong jika data tidak ada
      } catch (error) {
        console.error("Error fetching produk", error);
      }
    };
    getProduk();
  }, []);

  const simpanPembelian = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL + "pembelian", {
        nmproduk: nmproduk,
        nmsupplier: supplier,
        stok: stok,
        harga_beli: harga_beli,
        kuantitas: kuantitas,
        tanggal: tanggal,
      });
      navigate("/pembelian");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <h1 className="title">Pembelian</h1>
      <h2 className="subtitle">Tambah Pembelian</h2>
      <div className="card is-shadowless">
        <div className="card-content has-background-light">
          <div className="content">
            <form className="box has-background-light" onSubmit={simpanPembelian}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Kode Pembelian</label>
                <div className="control">
                  <input type="text" className="input" readOnly />
                </div>
              </div>
              <div className="field">
                <label className="label">Nama Produk</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select value={nmproduk} onChange={(e) => setNmproduk(e.target.value)}>
                      <option value="">Pilih Produk</option>
                      {
                      produkList.map((getproduk) => (
                        <option key={getproduk.id_produk} value={getproduk.id_produk}>
                          {getproduk.nmproduk}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Nama Supplier</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select value={supplier} onChange={(e) => setSupplier(e.target.value)}>
                      <option value="">Pilih supplier</option>
                      {supplierList.map((supplier) => (
                        <option key={supplier.id_supplier} value={supplier.id_supplier}>
                          {supplier.nmsupplier}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Stok Awal</label>
                <div className="control">
                  <input type="number" className="input" readOnly value={stok} onChange={(e) => setStok(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Harga Beli</label>
                <div className="control">
                  <input type="number" className="input" placeholder="Harga Beli" value={harga_beli} onChange={(e) => setHarga_beli(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Kuantitas</label>
                <div className="control">
                  <input type="number" className="input" placeholder="kuantitas" value={kuantitas} onChange={(e) => setKuantitas(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Tanggal</label>
                <div className="control">
                  <input type="date" className="input" placeholder="tanggal" value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Simpan
                  </button>
                  <Link to="/pembelian" className="button is-danger mb-2">
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

export default FormAddPembelian;
