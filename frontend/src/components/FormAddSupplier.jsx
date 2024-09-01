import React, { useState } from "react";
import { API_URL } from "../features/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../index.css";

const FormAddSupplier = () => {
  const [nmsupplier, setNmsupplier] = useState("");
  const [notlp, setNotlp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const simpanSupplier = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL + "supplier", {
        nmsupplier: nmsupplier,
        notlp: notlp,
        alamat: alamat,
      });
      navigate("/supplier");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <h1 className="title">Supplier</h1>
      <h2 className="subtitle">Tambah Supplier</h2>
      <div className="card is-shadowless">
        <div className="card-content has-background-light">
          <div className="content">
            <form className="box has-background-light" onSubmit={simpanSupplier}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Kode Supplier</label>
                <div className="control">
                  <input type="text" className="input" readOnly />
                </div>
              </div>
              <div className="field">
                <label className="label">Nama Supplier</label>
                <div className="control">
                  <input type="text" className="input" placeholder="Nama Supplier" value={nmsupplier} onChange={(e) => setNmsupplier(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Nomor Telepon</label>
                <div className="control">
                  <input type="number" className="input" placeholder="Nomor Telepon" value={notlp} onChange={(e) => setNotlp(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Alamat</label>
                <div className="control">
                  <input type="text" className="input" placeholder="Alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Simpan
                  </button>
                  <Link to="/supplier" className="button is-danger mb-2">
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

export default FormAddSupplier;
