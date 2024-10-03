import React, { useState } from "react";
import { API_URL } from "../features/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../index.css";

const FormAddUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nama_lengkap, setNama_lengkap] = useState("");
  const [notlp, setNotlp] = useState("");
  const [jk, setJk] = useState("");
  const [level, setLevel] = useState("");
  const [foto, setFoto] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const simpanUser = async (e) => {
    e.preventDefault();
    try {
      // Membuat objek form data untuk mengirim file dan data lainnya
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("nama_lengkap", nama_lengkap);
      formData.append("notlp", notlp);
      formData.append("jk", jk);
      formData.append("level", level);
      if (foto) formData.append("foto", foto); // Menambahkan file foto ke form data
  
      await axios.post(API_URL + "user/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Mengatur header agar sesuai dengan pengiriman file
        },
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <h1 className="title">User</h1>
      <h2 className="subtitle">Tambah user</h2>
      <div className="card is-shadowless">
        <div className="card-content has-background-light">
          <div className="content">
            <form className="box has-background-light" onSubmit={simpanUser}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Kode User</label>
                <div className="control">
                  <input type="text" className="input" readOnly />
                </div>
              </div>
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input type="text" className="input" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input type="password" className="input" placeholder="*****" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Nama Lengkap</label>
                <div className="control">
                  <input type="text" className="input" placeholder="Nama Lengkap" value={nama_lengkap} onChange={(e) => setNama_lengkap(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Nomor Telepon</label>
                <div className="control">
                  <input type="number" className="input" placeholder="Nomor Telepon" value={notlp} onChange={(e) => setNotlp(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Jenis Kelamin</label>
                <div className="control">
                  <label className="radio">
                    <input type="radio" name="jk" value="Laki-laki" checked={jk === "Laki-laki"} onChange={(e) => setJk(e.target.value)} />
                    Laki-laki
                  </label>
                  <label className="radio">
                    <input type="radio" name="jk" value="Perempuan" checked={jk === "Perempuan"} onChange={(e) => setJk(e.target.value)} />
                    Perempuan
                  </label>
                </div>
              </div>
              <div className="field">
                <label className="label">Level</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select value={level} onChange={(e) => setLevel(e.target.value)} className="text-black">
                      <option value="">Pilih Level</option>
                      <option value="admin">Admin</option>
                      <option value="kasir">Kasir</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* // Ubah bagian input file di FormAddUser.jsx */}
<div className="field">
  <label className="label">Foto</label>
  <div className="control">
    <input
      type="file"
      className="input"
      onChange={(e) => setFoto(e.target.files[0])} // Simpan objek File
    />
  </div>
</div>


              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Simpan
                  </button>
                  <Link to="/users" className="button is-danger mb-2">
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

export default FormAddUser;
