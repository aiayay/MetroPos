import React, { useState, useEffect } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../features/constants";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    const response = await axios.get(API_URL + "produk");
    setProducts(response.data);
  };
  return (
    <div>
      <h1 className="title">Produk</h1>
      <h2 className="subtitle">Data Barang</h2>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button className="button is-success">Tambah Data +</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Kode Produk</th>
              <th>Nama Produk</th>
              <th>Kategori</th>
              <th>Harga Beli</th>
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
            {products.map((produk, index) => (
              <tr key={produk.id_produk}>
                <td>{index + 1}</td>
                <td>{produk.id_produk}</td>
                <td>{produk.nmproduk}</td>
                <td></td>
                <td>{produk.harga_beli}</td>
                <td>{produk.harga_jual}</td>
                <td>{produk.merk}</td>
                <td>{produk.stok}</td>
                <td>{produk.satuan}</td>
                <td>{produk.foto_produk}</td>
                <td>{produk.diskon}</td>
                <td>
                  <Link to={`/products/edit/${produk.id_produk}`} className="button is-small is-info">
                    Edit
                  </Link>
                  {/* <button className="button is-success pr-10">Edit</button> */}
                  <button onClick={() => deleteProduct(produk.id_produk)} className="button is-small is-danger">
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

export default ProductList;
