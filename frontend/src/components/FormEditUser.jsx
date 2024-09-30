import React, { useState, useEffect } from "react";
import { API_URL } from "../features/constants";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../index.css";

const FormEditUser = () => {
  const [username, setUsername] = useState("");
  const [nama_lengkap, setNama_lengkap] = useState("");
  const [notlp, setNotlp] = useState("");
  const [jk, setJk] = useState("");
  const [level, setLevel] = useState("");
  const [foto, setFoto] = useState(null); // Ubah awal state menjadi null
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id_user } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(API_URL + "user/users/"+id_user);
        
        setUsername(response.data.data.username);
        setNama_lengkap(response.data.data.nama_lengkap);
        setNotlp(response.data.data.notlp);
        setJk(response.data.data.jk);
        setLevel(response.data.data.level);
        setFoto(response.data.data.foto);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.message || error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id_user]);

  const editUser = async (e) => {
    e.preventDefault();
    setMsg(""); // Reset pesan error sebelum melakukan permintaan

    try {
      // Langkah 1: Mengedit data pengguna
      await axios.put(API_URL + "user/" + id_user, {
        username,
        nama_lengkap,
        notlp,
        jk,
        level
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      // Langkah 2: Mengupload foto jika ada perubahan
      if (foto && typeof foto !== "string") { // Cek apakah ada file baru yang dipilih
        const formData = new FormData();
        formData.append("foto", foto);

        await axios.post(API_URL + "user/upload-foto/" + id_user, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
      }

      // Navigasi setelah berhasil mengedit
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message || error.response.data.msg || "Terjadi kesalahan");
      } else {
        setMsg("Terjadi kesalahan pada server");
      }
    }
  };

  return (
    <div>
      <h1 className="title">User</h1>
      <h2 className="subtitle">Edit user</h2>
      <div className="card is-shadowless">
        <div className="card-content has-background-light">
          <div className="content">
            <form className="box has-background-light" onSubmit={editUser}>
              {msg && <p className="has-text-centered has-text-danger">{msg}</p>}
              <div className="field">
                <label className="label">Kode User</label>
                <div className="control">
                  <input type="text" className="input" readOnly value={id_user || ""} />
                </div>
              </div>
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Username"
                    value={username || ""}
                    onChange={(e) => setUsername(e.target.value)}
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
                    value={nama_lengkap || ""}
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
                    value={notlp || ""}
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
                      value={level || ""}
                      onChange={(e) => setLevel(e.target.value)}
                      className="text-black"
                      required
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
                    accept="image/*"
                    onChange={(e) => setFoto(e.target.files[0])}
                  />
                  {foto && typeof foto !== "string" && (
                    <p className="mt-2">Foto yang dipilih: {foto.name}</p>
                  )}
                  {foto && typeof foto === "string" && (
                    <p className="mt-2">Foto saat ini: <img src={foto} alt="User Foto" width="100" /></p>
                  )}
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Edit
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

export default FormEditUser;
