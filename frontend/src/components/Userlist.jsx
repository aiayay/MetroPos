import React from "react";

const Userlist = () => {
  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Data Admin dan Kasir</h2>
      <button className="button is-success">Tambah Data +</button>
      <div>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Username</th>
              <th>Nama Lengkap</th>
              <th>No Telepon</th>
              <th>Jenis Kelamin</th>
              <th>Level</th>
              <th>Foto</th>
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

export default Userlist;
