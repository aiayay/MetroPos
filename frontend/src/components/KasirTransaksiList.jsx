import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../features/constants";
import "../index.css";

const KasirTransaksiList = () => {
  const [transaksi, setTransaksi] = useState([]);

  useEffect(() => {
    getTransaksi();
  }, []);
  const getTransaksi = async () => {
    const response = await axios.get(API_URL + "transaksi");
    setTransaksi(response.data);
  };

  //metod delete transaksi

  const deleteTransaksi = async (id_transaksi) => {
    await axios.delete(API_URL + "transaksi/" + id_transaksi);
    getTransaksi();
  };
  return (
    <div>
      <h1 className="title">Transaksi</h1>
      <h2 className="subtitle">Barang Terjual</h2>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button className="button is-success">Cetak</button>
            </div>
          </div>
          {/* search */}
          <div className="container mt-5">
            <div className="columns">
              <div className="kolom is-centered">
                <form action="">
                  <div className="field has-addons">
                    <div className="control is-expanded">
                      <input type="text" className="input" placeholder="cari.." />
                    </div>
                    <div className="control">
                      <button type="submit" className="button is-info">
                        search
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="tanggal">
        Dari <input type="date" /> sampai <input type="date" name="" id="" />
        <button className="button ungu">Filter</button>
      </p>
      <div>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Produk</th>
              <th>Stok</th>
              <th>Satuan</th>
              <th>Foto Produk</th>
              <th>Merk</th>
              <th>Harga Beli</th>
              <th>Harga Jual</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <Link to="/transaksi/detail" className="button is-primary mb-2">
                  Detail
                </Link>
                <button onClick={() => deleteTransaksi(transaksi.id_transaksi)} className="button is-danger mb-2">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KasirTransaksiList;
