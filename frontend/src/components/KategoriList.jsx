import React from "react";

const KategoriList = () => {
  return (
    <div>
      <h1 className="title">Kategori</h1>
      <h2 className="subtitle">Data Kategori</h2>
      <button className="button is-success">Tambah Data +</button>
      <div>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Kategori</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
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

export default KategoriList;
