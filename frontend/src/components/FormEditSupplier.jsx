import React, { useState, useEffect } from "react";
import { API_URL } from "../features/constants";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../index.css";

const FormEditSupplier = () => {
  const [nmsupplier, setNmsupplier] = useState("");
  const [notlp, setNotlp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id_supplier } = useParams();

  useEffect(() => {
    // console.log(id_supplier); // Pastikan id_supplier tidak undefined
    const getSupplierById = async () => {
      try {
        const response = await axios.get(API_URL + "supplier/" + id_supplier);
        // console.log(response.data); // Tambahkan log ini
        setNmsupplier(response.data.data.nmsupplier);
        setNotlp(response.data.data.notlp);
        setAlamat(response.data.data.alamat);

        // Tambahkan log setelah setState
        // console.log("Nama Supplier:", response.data.nmsupplier);
        // console.log("Nomor Telepon:", response.data.notlp);
        // console.log("Alamat:", response.data.alamat);
        // console.log(id_supplier);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getSupplierById();
  }, [id_supplier]);

  const editSupplier = async (e) => {
    e.preventDefault();
    try {
      await axios.put(API_URL + "supplier/" + id_supplier, {
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
    <div className="mt-5">
      <h1 className="title">Supplier</h1>
      <h2 className="subtitle">Tambah Supplier</h2>
      <div className="card is-shadowless">
        <div className="card-content has-background-light">
          <div className="content">
            <form className="box has-background-light" onSubmit={editSupplier}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Kode Supplier</label>
                <div className="control">
                  <input type="text" className="input" readOnly value={id_supplier || ""} />
                </div>
              </div>
              <div className="field">
                <label className="label">Nama Supplier</label>
                <div className="control">
                  <input type="text" className="input" placeholder="Nama Supplier" value={nmsupplier || ""} onChange={(e) => setNmsupplier(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Nomor Telepon</label>
                <div className="control">
                  <input type="number" className="input" placeholder="Nomor Telepon" value={notlp || ""} onChange={(e) => setNotlp(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Alamat</label>
                <div className="control">
                  <input type="text" className="input" placeholder="Alamat" value={alamat || ""} onChange={(e) => setAlamat(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Edit
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

export default FormEditSupplier;
