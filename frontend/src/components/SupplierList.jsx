import React from "react";
import "../index.css";

const SupplierList = () => {
  return (
    <div>
      <h1 className="title">Supplier</h1>
      <h2 className="subtitle">Data Supplier</h2>
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
              <th>Kode Supplier</th>
              <th>Nama Supplier</th>
              <th>Alamat</th>
              <th>No Telepon</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>jdhh</td>
              <td>kode</td>
              <td>swww</td>
              <td>sd</td>
              <td>jshdf</td>
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

export default SupplierList;
