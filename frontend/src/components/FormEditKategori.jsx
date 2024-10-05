import React, { useState, useEffect } from "react";
import { API_URL } from "../features/constants";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../index.css";

const FormEditKategori = () => {
  const [nama_kategori, setNama_kategori] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id_kategori } = useParams();

  // useEffect(() => {
  //   getKategoriById();
  // }, []);

  // const editKategori = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.patch(API_URL + "kategori/" + id_kategori, {
  //       nama_kategori,
  //     });
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const getKategoriById = async () => {
  //   const response = await axios.get(API_URL + "kategori/" + id_kategori);
  //   setNama_kategori(response.data.nama_kategori);
  // };

  useEffect(() => {
    const getKategoriById = async () => {
      try {
        const response = await axios.get(API_URL + "kategori/" + id_kategori);
        setNama_kategori(response.data.data.nama_kategori);
        // console.log("ID Kategori:", id_kategori);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getKategoriById();
  }, [id_kategori]);

  const editKategori = async (e) => {
    e.preventDefault();
    try {
      await axios.put(API_URL + "kategori/" + id_kategori, {
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
    <div className="mt-5">
      <h1 className="title">Kategori</h1>
      <h2 className="subtitle">Edit Kategori</h2>
      <div className="card is-shadowless">
        <div className="card-content has-background-light">
          <div className="content">
            <form className="box has-background-light" onSubmit={editKategori}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Kode Kategori</label>
                <div className="control">
                  <input type="text" className="input" readOnly value={id_kategori || ""} />
                </div>
              </div>
              <div className="field">
                <label className="label">Nama Kategori</label>
                <div className="control">
                  <input type="text" className="input" placeholder="nama kategori" value={nama_kategori || ""} onChange={(e) => setNama_kategori(e.target.value)} />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Edit
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

export default FormEditKategori;
