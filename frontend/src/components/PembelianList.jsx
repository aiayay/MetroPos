import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../features/constants";
import "../index.css";
const PembelianList = () => {
  const [pembelian, setPembelian] = useState([]);

  useEffect(() => {
    getPembelian();
  }, []);
  const getPembelian = async () => {
    const response = await axios.get(API_URL + "pembelian");
    console.log(response.data); // Tambahkan ini untuk cek data
    setPembelian(response.data);
  };

  //metod delete pembelian

  const deletePembelian = async (id_pembelian) => {
    await axios.delete(API_URL + "pembelian/" + id_pembelian);
    getPembelian();
  };
  return (
    <div>
      <h1 className="title">Pembelian</h1>
      <h2 className="subtitle">Barang Masuk</h2>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link to="/pembelian/add" className="button is-primary mb-2">
                Tambah Data +
              </Link>
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
      <div>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Kode Pembelian</th>
              <th>Nama Produk</th>
              <th>Nama Supplier</th>
              <th>Kuantitas</th>
              <th>Harga Beli</th>
              <th>Tanggal Beli</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pembelian.map((pembelian, index) => (
              <tr key={pembelian.id_pembelian}>
                <td>{index + 1}</td>
                <td>{pembelian.id_pembelian}</td>
                <td>{pembelian.produk.nmproduk}</td>
                <td>{pembelian.supplier.nmsupplier}</td>
                <td>{pembelian.kuantitas}</td>
                <td>{pembelian.harga_beli}</td>
                <td>{pembelian.tanggal}</td>
                <td>
                  <Link to={`/pembelian/edit/${pembelian.id_pembelian}`} className="button is-small is-info">
                    Edit
                  </Link>
                  <button onClick={() => deletePembelian(pembelian.id_pembelian)} className="button is-small is-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PembelianList;
