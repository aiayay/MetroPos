import React, { useState, useEffect } from "react";
import "../index.css";
import { NavLink } from "react-router-dom";
import logo from "../logo.jpeg";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../features/constants";

const KasirNavbarBawah = ({ pilihMember }) => {
  const [member, setMember] = useState([]);
  const [produk, setProduk] = useState([]); // Untuk data produk/menu
  const [search, setSearch] = useState("");

  useEffect(() => {
    getMember();
    getProduk(); // Tambahkan jika ingin cari produk
  }, []);

  const getMember = async () => {
    const response = await axios.get(API_URL + "member");
    if (response.data && Array.isArray(response.data.data)) {
      setMember(response.data.data);
    } else {
      setMember([]);
    }
  };

  const getProduk = async () => {
    const response = await axios.get(API_URL + "produk");
    setProduk(response.data);
  };

  // Fungsi untuk menambahkan member ke keranjang
 

  return (
    <div>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <h1 className="text-black">Cari Member</h1>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="field has-addons">
                <div className="control is-expanded">
                  <input type="text" className="input" placeholder="Cari member.." value={search} onChange={(event) =>{
                    setSearch(event.target.value);
                  }} />
                </div>
                {/* <div className="control">
                  <button type="submit" className="button is-info">
                    search
                  </button>
                </div> */}
              </div>
            </form>
            <div className="buttons">
              <Link to="/kasirmember/add" className="button ungu mb-2">
                Tambah Member
              </Link>
              <Link to="/kasirtransaksi" className="button is-success mb-2">
                Riwayat Transaksi
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        {search ? (
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>No</th>
                <th>Kode Member</th>
                <th>Nama Member</th>
                <th>No Telepon</th>
                <th>Alamat</th>
                <th>Jenis Kelamin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {member
                .filter((member) => {
                  return search.toLowerCase() === "" ? member : member.nama_member.toLowerCase().includes(search);
                })
                .map((member, index) => (
                  <tr key={member.id_member}>
                    <td>{index + 1}</td>
                    <td>{member.id_member}</td>
                    <td>{member.nama_member}</td>
                    <td>{member.no_telepon}</td>
                    <td>{member.alamat}</td>
                    <td>{member.jk}</td>
                    <td>
                      <button className="button is-primary" onClick={() => pilihMember(member.id_member)}>Pilih</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
};

export default KasirNavbarBawah;
