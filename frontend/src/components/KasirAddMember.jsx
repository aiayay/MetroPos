import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../features/constants";
import "../index.css";

const KasirAddMember = () => {
  const [nama_member, setNama_member] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jk, setJk] = useState("");
  const [no_telepon, setNo_telepon] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const simpanMember = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log({ nama_member, alamat, jk, no_telepon });
    try {
      await axios.post(API_URL + "member", {
        nama_member: nama_member,
        alamat: alamat,
        jk: jk,
        no_telepon: no_telepon,
      });
      navigate("/kasir");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <h1 className="title">Member</h1>
      <h2 className="subtitle">Tambah Member</h2>
      <div className="card is-shadowless">
        <div className="card-content has-background-light">
          <div className="content">
            <form className="box has-background-light" onSubmit={simpanMember}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Kode Member</label>
                <div className="control">
                  <input type="text" className="input" readOnly />
                </div>
              </div>
              <div className="field">
                <label className="label">Nama Member</label>
                <div className="control">
                  <input type="text" className="input" placeholder="Nama Member" value={nama_member} onChange={(e) => setNama_member(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Nomor Telepon</label>
                <div className="control">
                  <input type="number" className="input" placeholder="Nomor Telepon" value={no_telepon} onChange={(e) => setNo_telepon(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Alamat</label>
                <div className="control">
                  <input type="text" className="input" placeholder="Alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Jenis Kelamin</label>
                <div className="control">
                  <label className="radio">
                    <input type="radio" name="jk" value="Laki-laki" onChange={(e) => setJk(e.target.value)} />
                    Laki-laki
                  </label>
                  <label className="radio">
                    <input type="radio" name="jk" value="Perempuan" onChange={(e) => setJk(e.target.value)} />
                    Perempuan
                  </label>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Simpan
                  </button>
                  <Link to="/kasir" className="button is-danger mb-2">
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

export default KasirAddMember;
