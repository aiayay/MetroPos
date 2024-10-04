import React, { useState } from "react";
import { API_URL } from "../features/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../index.css";

const FormAddKategori = () => {
  const [nama_kategori, setNama_kategori] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const simpanKategori = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL + "kategori", {
        nama_kategori: nama_kategori,
      });
      navigate("/kategori");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <h1 className="title">Kategori</h1>
      <h2 className="subtitle">Tambah Kategori</h2>
      <div className="card is-shadowless">
        <div className="card-content has-background-light">
          <div className="content">
            <form className="box has-background-light" onSubmit={simpanKategori}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Nama Kategori</label>
                <div className="control">
                  <input type="text" className="input" placeholder="nama kategori" value={nama_kategori} onChange={(e) => setNama_kategori(e.target.value)} />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Simpan
                  </button>
                  <Link to="/kategori" className="button is-danger mb-2">
                    Cancel
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddKategori;
