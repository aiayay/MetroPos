import React, { useState, useEffect } from "react";
import { API_URL } from "../features/constants";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../index.css";

const FormEditMember = () => {
  const [nama_member, setNama_member] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jk, setJk] = useState("");
  const [no_telepon, setNo_telepon] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id_member } = useParams();

  useEffect(() => {
    // console.log(id_member); // Pastikan id_supplier tidak undefined
    const getMemberById = async () => {
      try {
        const response = await axios.get(API_URL + "member/" + id_member);
        // console.log(response.data); // Tambahkan log ini
        setNama_member(response.data.data.nama_member);
        setAlamat(response.data.data.alamat);
        setJk(response.data.data.jk);
        setNo_telepon(response.data.data.no_telepon);

        // Tambahkan log setelah setState
        // console.log("Nama member:", response.data.nama_member);
        // console.log("alamat:", response.data.alamat);
        // console.log("jk:", response.data.jk);
        // console.log("notelp:", response.data.no_telepon);
        // console.log(id_supplier);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getMemberById();
  }, [id_member]);

  const editMember = async (e) => {
    e.preventDefault();
    try {
      await axios.put(API_URL + "member/" + id_member, {
        nama_member: nama_member,
        alamat: alamat,
        jk: jk,
        no_telepon: no_telepon,
      });
      navigate("/member");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div className="mt-5">
      <h1 className="title">Member</h1>
      <h2 className="subtitle">Edit Member</h2>
      <div className="card is-shadowless">
        <div className="card-content has-background-light">
          <div className="content">
            <form className="box has-background-light" onSubmit={editMember}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Kode Member</label>
                <div className="control">
                  <input type="text" className="input" readOnly value={id_member || ""} />
                </div>
              </div>
              <div className="field">
                <label className="label">Nama Member</label>
                <div className="control">
                  <input type="text" className="input" placeholder="Nama Member" value={nama_member || ""} onChange={(e) => setNama_member(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Nomor Telepon</label>
                <div className="control">
                  <input type="number" className="input" placeholder="Nomor Telepon" value={no_telepon || ""} onChange={(e) => setNo_telepon(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Alamat</label>
                <div className="control">
                  <input type="text" className="input" placeholder="Alamat" value={alamat || ""} onChange={(e) => setAlamat(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Jenis Kelamin</label>
                <div className="control">
                  <label className="radio">
                    <input type="radio" name="jk" value="laki-laki" checked={jk === "laki-laki"} onChange={(e) => setJk(e.target.value)} />
                    Laki-laki
                  </label>
                  <label className="radio">
                    <input type="radio" name="jk" value="perempuan" checked={jk === "perempuan"} onChange={(e) => setJk(e.target.value)} />
                    Perempuan
                  </label>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Edit
                  </button>
                  <Link to="/member" className="button is-danger mb-2">
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

export default FormEditMember;
