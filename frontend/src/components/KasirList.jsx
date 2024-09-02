import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../features/constants";
import "../index.css";

const KasirList = () => {
  return (
    <div>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          {/* search */}
          <div className="container mt-5">
            <div className="columns">
              <div className="kolom is-centered">
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
              </div>
            </div>
          </div>
          <div className="navbar-item">
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
      <div></div>
    </div>
  );
};

export default KasirList;
