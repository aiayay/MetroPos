import React from "react";
import "../index.css";
import { NavLink } from "react-router-dom";
import logo from "../logo.jpeg";
import { Link } from "react-router-dom";

const KasirNavbarBawah = () => {
  return (
    <div>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <form action="">
              <div className="field has-addons">
                <div className="control is-expanded">
                  <input type="text" className="input" placeholder="cari.." />
                </div>
                <div className="control">
                  <button type="submit" className="button is-info">
                    search
                  </button>
                </div>
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
    </div>
  );
};

export default KasirNavbarBawah;
