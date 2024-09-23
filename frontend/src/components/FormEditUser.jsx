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
  const [foto, setFoto] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id_user } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(API_URL + "user/users/" + id_user);
        
        setUsername(response.data.data.username);
        setNama_lengkap(response.data.data.nama_lengkap);
        setNotlp(response.data.data.notlp);
        setJk(response.data.data.jk);
        setLevel(response.data.data.level);
        setFoto(response.data.foto);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id_user]);

  const editUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(API_URL + "user/users/" + id_user, {
        username: username,
        nama_lengkap: nama_lengkap,
        notlp: notlp,
        jk: jk,
        level: level,
        foto: foto,
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
      <h2 className="subtitle">Edit user</h2>
      <div className="card is-shadowless">
        <div className="card-content has-background-light">
          <div className="content">
            <form className="box has-background-light" onSubmit={editUser}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Kode User</label>
                <div className="control">
                  <input type="text" className="input" readOnly value={id_user || ""} />
                </div>
              </div>
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input type="text" className="input" placeholder="username" value={username || ""} onChange={(e) => setUsername(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Nama Lengkap</label>
                <div className="control">
                  <input type="text" className="input" placeholder="Nama Lengkap" value={nama_lengkap || ""} onChange={(e) => setNama_lengkap(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Nomor Telepon</label>
                <div className="control">
                  <input type="number" className="input" placeholder="Nomor Telepon" value={notlp || ""} onChange={(e) => setNotlp(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Jenis Kelamin</label>
                <div className="control">
                  <label className="radio">
                    <input type="radio" name="jk" value="l" checked={jk === "l"} onChange={(e) => setJk(e.target.value)} />
                    Laki-laki
                  </label>
                  <label className="radio">
                    <input type="radio" name="jk" value="p" checked={jk === "p"} onChange={(e) => setJk(e.target.value)} />
                    Perempuan
                  </label>
                </div>
              </div>
              <div className="field">
                <label className="label">Level</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select value={level || ""} onChange={(e) => setLevel(e.target.value)} className="text-black">
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
                  <input type="file" className="input" placeholder="foto" value={foto || ""} onChange={(e) => setFoto(e.target.value)} />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Edit
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

export default FormEditUser;
