import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../features/constants";
import "../index.css";
import { IoTrash } from "react-icons/io5";
const PembelianList = () => {
  const [pembelian, setPembelian] = useState([]);
  const [search, setSearch] = useState("");
  console.log(search);

  useEffect(() => {
    getPembelian();
  }, []);
  const getPembelian = async () => {
    const response = await axios.get(API_URL + "pembelian");
    if (response.data && Array.isArray(response.data.data)) {
      setPembelian(response.data.data);
    } else {
      setPembelian([]);
    }
  };

  //metod delete pembelian

  const deletePembelian = async (id_pembelian) => {
    await axios.delete(API_URL + "pembelian/" + id_pembelian);
    getPembelian();
  };
  return (
    <div className="mt-5">
      <h1 className="title">Pembelian</h1>
      <h2 className="subtitle">Barang Masuk</h2>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
        <div className="navbar-item">
  <div className="buttons" style={{ display: 'flex', alignItems: 'center' }}>
    <Link to="/pembelian/add" className="button is-success">
      Tambah Data +
    </Link>
    <form action="" style={{ display: 'flex', marginLeft: '10px' }}>
      <div className="field has-addons">
        <div className="control is-expanded">
          <input type="text" className="input" placeholder="cari.." onChange={(e) => setSearch(e.target.value)} />
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
      <div className="table-container" style={{ overflowX: 'auto' }}>
        <table className="table is-fullwidth" style={{ minWidth: "600px" }}>
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
            {pembelian
              .filter((pembelian) => {
                return search.toLowerCase() === "" ? pembelian : pembelian.produk.nmproduk.toLowerCase().includes(search);
              })
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((pembelian, index) => (
                <tr key={pembelian.id_pembelian}>
                  <td>{index + 1}</td>
                  <td>{pembelian.id_pembelian}</td>
                  <td>{pembelian.produk.nmproduk}</td>
                  <td>{pembelian.supplier.nmsupplier}</td>
                  <td>{pembelian.kuantitas}</td>
                  <td>{pembelian.harga_beli}</td>
                  <td>{pembelian.tanggal}</td>
                  {/* <td>
               
                    <button onClick={() => deletePembelian(pembelian.id_pembelian)} className="button is-small is-danger">
                      Delete
                    </button>
                  </td> */}
                  <td>
  {/* <Link to={`/supplier/edit/${s.id_supplier}`} className="button is-small is-info button-spacing">
    <FaPenToSquare className="icon-spacing" />
  </Link> */}
  <button 
    onClick={() => deletePembelian(pembelian.id_pembelian)}
    className="button is-small is-danger button-spacing"
  >
    <IoTrash className="icon-spacing" />
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
