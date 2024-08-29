import React from "react";
import "../index.css";
const PembelianList = () => {
  return (
    <div>
      <h1 className="title">Pembelian</h1>
      <h2 className="subtitle">Barang Masuk</h2>
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
              <th>Nama Produk</th>
              <th>Nama Supplier</th>
              <th>Jumlah</th>
              <th>Harga Beli</th>
              <th>Tanggal Beli</th>
              <th>Harga Beli</th>
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
              <td>
                <button className="button is-success pr-10">Edit</button>
                <button className="button is-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PembelianList;
