import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../features/constants";
import "../index.css";

const Userlist = () => {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  // console.log(search);

  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const response = await axios.get(API_URL + "user/users");
    // console.log("Data received:", response.data); // Log response data
    if (response.data && Array.isArray(response.data)) {
      setUser(response.data);
    } else {
      setUser([]);
    }
  };

  //metod delete user

  const deleteUser = async (id_user) => {
    await axios.delete(API_URL + "user/users/" + id_user);
    getUser();
  };
  return (
    <div className="mt-5">
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Data Admin dan Kasir</h2>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link to="/users/add" className="button is-primary mb-2">
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
      </div>
      <div className="table-container" style={{ overflowX: 'auto' }}>
        <table className="table is-fullwidth" style={{ minWidth: "600px" }}>
          <thead>
            <tr>
              <th>No</th>
              <th>Kode User</th>
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
            {user
              .filter((user) => {
                return search.toLowerCase() === "" ? user : user.nama_lengkap.toLowerCase().includes(search);
              })
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((user, index) => (
                <tr key={user.id_user}>
                  <td>{index + 1}</td>
                  <td>{user.id_user}</td>
                  <td>{user.username}</td>
                  <td>{user.nama_lengkap}</td>
                  <td>{user.notlp}</td>
                  <td>{user.jk}</td>
                  <td>{user.level}</td>
                  <td>
                    <img src={user.foto} style={{ width: "100px", height: "100px" }} />
                  </td>
                  <td>
                    <Link to={`/users/edit/${user.id_user}`} className="button is-small is-info">
                      Edit
                    </Link>
                    <button onClick={() => deleteUser(user.id_user)} className="button is-small is-danger">
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

export default Userlist;
