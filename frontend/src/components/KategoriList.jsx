import React, { useState, useEffect } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../features/constants";

const KategoriList = () => {
  const [kategori, setKategori] = useState([]);
  const [search, setSearch] = useState("");
  // console.log(search);

  useEffect(() => {
    getKategori();
  }, []);
  const getKategori = async () => {
    const response = await axios.get(API_URL + "kategori");
    if (response.data && Array.isArray(response.data.data)) {
      setKategori(response.data.data);
    } else {
      setKategori([]);
    }
  };

  //metod delete kategori

  const deleteKategori = async (id_kategori) => {
    await axios.delete(API_URL + "kategori/" + id_kategori);
    getKategori();
  };
  return (
    <div className="mt-5">
      <h1 className="title">Kategori</h1>
      <h2 className="subtitle">Data Kategori</h2>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link to="/kategori/add" className="button is-primary mb-2">
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
              <th>Kode Kategori</th>
              <th>Nama Kategori</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {kategori
              .filter((kategori) => {
                return search.toLowerCase() === "" ? kategori : kategori.nama_kategori.toLowerCase().includes(search);
              })
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((kategori, index) => (
                <tr key={kategori.id_kategori}>
                  <td>{index + 1}</td>
                  <td>{kategori.id_kategori}</td>
                  <td>{kategori.nama_kategori}</td>
                  <td>
                    <Link to={`/kategori/edit/${kategori.id_kategori}`} className="button is-small is-info">
                      Edit
                    </Link>
                    <button onClick={() => deleteKategori(kategori.id_kategori)} className="button is-small is-danger">
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

export default KategoriList;
