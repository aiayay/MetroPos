import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../features/constants";
import "../index.css";
import { IoTrash } from "react-icons/io5";
import { FaPenToSquare } from "react-icons/fa6";

const ProductList = () => {
  const [produk, setProduk] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getProduk();
  }, []);

  const getProduk = async () => {
    const response = await axios.get(API_URL + "produk");
    setProduk(response.data);
  };

  const deleteProduk = async (id_produk) => {
    await axios.delete(API_URL + "produk/" + id_produk);
    getProduk();
  };

  return (
    <div className="mt-5">
      <h1 className="title">Produk</h1>
      <h2 className="subtitle">Data Barang</h2>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
        <div className="navbar-item">
  <div className="buttons" style={{ display: 'flex', alignItems: 'center' }}>
    <Link to="/produk/add" className="button is-success">
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
        <table className="table" style={{ minWidth: "600px" }}>
          <thead>
            <tr>
              <th>No</th>
              {/* <th>Kode Produk</th> */}
              <th>Nama Produk</th>
              <th>Kategori</th>
              <th>Harga Jual</th>
              <th>Merk</th>
              <th>Stok</th>
              <th>Satuan</th>
              <th>Foto Produk</th>
              <th>Diskon</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {produk
              .filter((produk) => {
                return search.toLowerCase() === "" ? produk : produk.nmproduk.toLowerCase().includes(search);
              })
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((produk, index) => (
                <tr key={produk.id_produk}>
                  <td>{index + 1}</td>
                  {/* <td>{produk.id_produk}</td> */}
                  <td>{produk.nmproduk}</td>
                  <td>{produk.kategori.nama_kategori}</td>
                  <td>{produk.harga_jual}</td>
                  <td>{produk.merk}</td>
                  <td>{produk.stok}</td>
                  <td>{produk.satuan}</td>
                  <td>
                    <img src={produk.foto_produk} alt="Foto Produk" style={{ width: "100px", height: "100px" }} />
                  </td>
                  <td>{produk.diskon}</td>
                  {/* <td>
                    <Link to={`/produk/edit/${produk.id_produk}`} className="button is-small is-info">
                      Edit
                    </Link>
                    <button onClick={() => deleteProduk(produk.id_produk)} className="button is-small is-danger">
                      Delete
                    </button>
                  </td> */}
                  <td>
  <Link to={`/produk/edit/${produk.id_produk}`} className="button is-small is-info button-spacing">
    <FaPenToSquare className="icon-spacing" />
  </Link>
  <button 
    onClick={() => deleteProduk(produk.id_produk)}
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

export default ProductList;
