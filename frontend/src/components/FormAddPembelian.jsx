import React, { useState, useEffect } from "react";
import { API_URL } from "../features/constants";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../index.css";

const FormAddPembelian = () => {
  const [nmproduk, setNmproduk] = useState("");
  const [supplier, setSupplier] = useState("");
  const [stok, setStok] = useState(0); // Inisialisasi sebagai number
  const [harga_beli, setHarga_beli] = useState(0); // Inisialisasi sebagai number
  const [kuantitas, setKuantitas] = useState(0); // Inisialisasi sebagai number
  const [tanggal, setTanggal] = useState("");
  const [msg, setMsg] = useState("");
  const [supplierList, setSupplierList] = useState([]);
  const [produkList, setProdukList] = useState([]);
  const [selectedProduk, setSelectedProduk] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSupplier = async () => {
      try {
        const response = await axios.get(API_URL + "supplier");
        setSupplierList(response.data.data);
      } catch (error) {
        console.error("Error fetching supplier", error);
      }
    };
    getSupplier();
  }, []);

  useEffect(() => {
    const getProduk = async () => {
      try {
        const response = await axios.get(API_URL + "produk");
        console.log(response.data); // Cek apakah data produk muncul
        setProdukList(response.data || []); // Default ke array kosong jika data tidak ada
      } catch (error) {
        console.error("Error fetching produk", error);
      }
    };
    getProduk();
  }, []);

  useEffect(() => {
    const fetchStok = async () => {
      if (nmproduk) {
        try {
          const response = await axios.get(`${API_URL}produk/${nmproduk}`);
          setSelectedProduk(response.data);
          setStok(Number(response.data.stok) || 0); // Pastikan stok adalah number
          setHarga_beli(Number(response.data.harga_beli) || 0); // Pastikan harga_beli adalah number
        } catch (error) {
          console.error("Error fetching produk details", error);
        }
      } else {
        setSelectedProduk(null);
        setStok(0);
        setHarga_beli(0);
      }
    };
    fetchStok();
  }, [nmproduk]);

  const simpanPembelian = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL + "pembelian", {
        id_produk: nmproduk,  // Ganti dengan id_produk
        id_supplier: supplier, // Ganti dengan id_supplier
        kuantitas: Number(kuantitas),  // Konversi ke number
        harga_beli: Number(harga_beli), // Konversi ke number
        tanggal: tanggal        // Tidak perlu diubah
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
                <label className="label">Nama Produk</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select value={nmproduk} onChange={(e) => setNmproduk(e.target.value)} className="text-black">
                      <option value="">Pilih Produk</option>
                      {produkList.map((produk) => (
                        <option key={produk.id_produk} value={produk.id_produk}>
                          {produk.nmproduk}
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
                    <select value={supplier} onChange={(e) => setSupplier(e.target.value)} className="text-black">
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
                  <input type="number" className="input" readOnly value={stok} />
                </div>
              </div>
              <div className="field">
                <label className="label">Harga Beli</label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    placeholder="Harga Beli"
                    value={harga_beli}
                    onChange={(e) => setHarga_beli(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Kuantitas</label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    placeholder="Kuantitas"
                    value={kuantitas}
                    onChange={(e) => setKuantitas(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Tanggal</label>
                <div className="control">
                  <input
                    type="date"
                    className="input"
                    placeholder="Tanggal"
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                  />
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
