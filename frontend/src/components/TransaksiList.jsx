import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const TransaksiList = () => {
  return (
    <div>
      <h1 className="title">Product</h1>
      <h2 className="subtitle">Barang Terjual</h2>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button className="button is-success">Cetak</button>
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
                <button className="button ungu">Detail</button>
                <button className="button is-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransaksiList;
