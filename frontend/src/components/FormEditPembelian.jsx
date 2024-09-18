import React, { useState, useEffect } from "react";
import { API_URL } from "../features/constants";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../index.css";

const FormEditPembelian = () => {
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
  const { id_pembelian } = useParams();

  useEffect(() => {
    const getPembelianById = async () => {
      try {
        const response = await axios.get(API_URL + "pembelian/" + id_pembelian);

        const pembelianData = response.data.data;
        setNmproduk(pembelianData.produk.id_produk); // Nama produk
        setSupplier(pembelianData.supplier.id_supplier); // Nama supplier
        setStok(pembelianData.produk.stok); // Stok produk
        setHarga_beli(pembelianData.harga_beli); // Harga beli
        setKuantitas(pembelianData.kuantitas); // Kuantitas
        setTanggal(pembelianData.tanggal.split("T")[0]);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getPembelianById();
  }, [id_pembelian]);

  useEffect(() => {
    const getSupplier = async () => {
      try {
        const response = await axios.get(API_URL + "supplier");
        //  console.log(response.data.data); // Periksa data di sini
        const data = Array.isArray(response.data.data) ? response.data.data : [];
        setSupplierList(data);
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
        setProdukList(response.data || []); // Default ke array kosong jika data tidak ada
      } catch (error) {
        console.error("Error fetching produk", error);
      }
    };
    getProduk();
  }, []);

  const editPembelian = async (e) => {
    e.preventDefault();
    try {
      await axios.put(API_URL + "pembelian/" + id_pembelian, {
        nmproduk: nmproduk,
        id_supplier: supplier, // ID supplier yang benar
        stok: stok,
        harga_beli: harga_beli,
        kuantitas: kuantitas,
        tanggal: tanggal,
      });

      // await axios.put(API_URL + "pembelian/" + id_pembelian, {
      //   id_produk: nmproduk,
      //   kuantitas,
      //   id_supplier: supplier,
      //   tanggal,
      //   harga_beli,
      // });
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
      <h2 className="subtitle">Edit Pembelian</h2>
      <div className="card is-shadowless">
        <div className="card-content has-background-light">
          <div className="content">
            <form className="box has-background-light" onSubmit={editPembelian}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Kode Pembelian</label>
                <div className="control">
                  <input type="text" className="input" readOnly value={id_pembelian || ""} />
                </div>
              </div>
              <div className="field">
                <label className="label">Nama Produk</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select value={nmproduk || ""} onChange={(e) => setNmproduk(e.target.value)}>
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
                    <select value={supplier || ""} onChange={(e) => setSupplier(e.target.value)}>
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
                  <input type="number" className="input" readOnly value={stok || ""} onChange={(e) => setStok(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Harga Beli</label>
                <div className="control">
                  <input type="number" className="input" placeholder="Harga Beli" value={harga_beli || ""} onChange={(e) => setHarga_beli(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Kuantitas</label>
                <div className="control">
                  <input type="number" className="input" placeholder="kuantitas" value={kuantitas || ""} onChange={(e) => setKuantitas(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Tanggal</label>
                <div className="control">
                  <input type="date" className="input" placeholder="tanggal" value={tanggal || ""} onChange={(e) => setTanggal(e.target.value)} />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Edit
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

export default FormEditPembelian;
