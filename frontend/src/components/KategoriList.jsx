import React, { useState, useEffect } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../features/constants";

const KategoriList = () => {
  const [kategori, setKategori] = useState([]);

  useEffect(() => {
    getKategori();
  }, []);
  const getKategori = async () => {
    const response = await axios.get(API_URL + "kategori");
    setKategori(response.data);
  };

  //metod delete kategori

  const deleteKategori = async (id_kategori) => {
    await axios.delete(API_URL + "kategori/" + id_kategori);
    getKategori();
  };
  return (
    <div>
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
        </div>
      </div>
      <div>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Kode Kategori</th>
              <th>Nama Kategori</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {kategori.map((kategori, index) => (
              <tr key={kategori.id_kategori}>
                <td>{index + 1}</td>
                <td>{kategori.id_kategori}</td>
                <td>{kategori.nmkategori}</td>
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
