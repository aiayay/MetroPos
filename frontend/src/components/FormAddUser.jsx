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
  const [foto, setFoto] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const addUser = async (e) => {
    e.preventDefault();
    setMsg(""); // Reset pesan error sebelum melakukan permintaan
  
    try {
      // Deklarasi formData untuk foto
      const formData = new FormData(); 
      
      // Log data yang dikirim
      console.log("Data yang dikirim:", {
        username,
        password,
        nama_lengkap,
        notlp,
        jk,
        level
      });
  
      // Langkah 1: Tambah user
      const response = await axios.post(API_URL + "user/register", {
        username,
        password,
        nama_lengkap,
        notlp,
        jk,
        level
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      const id_user = response.data.data.id_user; // Dapatkan ID user yang baru ditambahkan
  
      // Langkah 2: Jika ada foto, upload foto
      if (foto) {
        formData.append("foto", foto); // Append file foto ke formData
  
        await axios.post(API_URL + "user/upload-foto/" + id_user, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
      }
  
      // Navigasi ke halaman users setelah berhasil menambahkan user
      navigate("/users");
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        setMsg(error.response.data.message || error.response.data.msg || "Terjadi kesalahan");
      } else {
        setMsg("Terjadi kesalahan pada server");
      }
    }
  };
  
  

  return (
    <div className="mt-5">
      <h1 className="title">User</h1>
      <h2 className="subtitle">Tambah user</h2>
      <div className="card is-shadowless">
        <div className="card-content has-background-light">
          <div className="content">
            <form className="box has-background-light" onSubmit={addUser}>
              {msg && <p className="has-text-centered has-text-danger">{msg}</p>}
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Username"
                    value={username }
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Nama Lengkap</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Nama Lengkap"
                    value={nama_lengkap }
                    onChange={(e) => setNama_lengkap(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Nomor Telepon</label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    placeholder="Nomor Telepon"
                    value={notlp }
                    onChange={(e) => setNotlp(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Jenis Kelamin</label>
                <div className="control">
                  <label className="radio">
                    <input
                      type="radio"
                      name="jk"
                      value="Laki-laki"
                      checked={jk === "Laki-laki"}
                      onChange={(e) => setJk(e.target.value)}
                      required
                    />
                    Laki-laki
                  </label>
                  <label className="radio ml-3">
                    <input
                      type="radio"
                      name="jk"
                      value="Perempuan"
                      checked={jk === "Perempuan"}
                      onChange={(e) => setJk(e.target.value)}
                      required
                    />
                    Perempuan
                  </label>
                </div>
              </div>
              <div className="field">
                <label className="label">Level</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={level }
                      onChange={(e) => setLevel(e.target.value)}
                      required className="text-black"
                    >
                      <option value="">Pilih Level</option>
                      <option value="admin">Admin</option>
                      <option value="kasir">Kasir</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
  <label className="label">Foto</label>
  <div className="control">
    <input
      type="file"
      className="input"
      onChange={(e) => setFoto(e.target.files[0])}
    />
  </div>
</div>


              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Tambah
                  </button>
                  <Link to="/users" className="button is-danger ml-2">
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
