import React from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate
import "../index.css";
import logo from "../logo.jpeg";
import { useDispatch } from 'react-redux';
import { reset } from '../features/authSlice';


const KasirNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Mendapatkan tanggal hari ini
  const today = new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Fungsi logout
  const handleLogout = () => {
    // Hapus token atau sesi login
    console.log("Token sebelum dihapus:", localStorage.getItem("token"));
    localStorage.removeItem("token"); // Contoh jika menggunakan JWT
console.log("Token setelah dihapus:", localStorage.getItem("token")); // Harus null


dispatch(reset());
    // Arahkan ke halaman beranda
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar is-fixed-top has-shadow" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <NavLink className="navbar-item" to="">
            <h1>Metro Pos</h1>
          </NavLink>
          <a href="!#" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {/* Menampilkan tanggal otomatis */}
                {/* <h2>{today}</h2> */}
                {/* <h1>nama</h1>
                <img src={logo} width="50" height="28" alt="" className="profile-pic" /> */}
                {/* Tombol Logout */}
                <button className="button is-danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default KasirNavbar;
