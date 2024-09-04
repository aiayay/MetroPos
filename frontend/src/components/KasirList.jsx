import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Card } from "react-bootstrap";
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
      <div className="row">
        <div className="col-lg-8">
          <div className="col-lg-4">
            <div className="border">
              <div className="container">
                <div className="columns mt-5 is-8 is-variable">
                  <div className="columna is-4-tablet is-3-desktop">
                    <div className="card">
                      <div className="card-image has-text-centered px-6">
                        <img src="assets/images/foto.png" alt="" />
                      </div>
                      <div className="card-content">
                        <p>1311333</p>
                        <p className="title is-size-5">aini</p>
                      </div>
                    </div>
                  </div>
                  <div className="columna is-4-tablet is-3-desktop">
                    <div className="card">
                      <div className="card-image has-text-centered px-6">
                        <img src="assets/images/foto.png" alt="" />
                      </div>
                      <div className="card-content">
                        <p>1311333</p>
                        <p className="title is-size-5">aini</p>
                      </div>
                    </div>
                  </div>
                  <div className="columna is-4-tablet is-3-desktop">
                    <div className="card">
                      <div className="card-image has-text-centered px-6">
                        <img src="assets/images/foto.png" alt="" />
                      </div>
                      <div className="card-content">
                        <p>1311333</p>
                        <p className="title is-size-5">aini</p>
                      </div>
                    </div>
                  </div>
                  <div className="columna is-4-tablet is-3-desktop">
                    <div className="card">
                      <div className="card-image has-text-centered px-6">
                        <img src="assets/images/foto.png" alt="" />
                      </div>
                      <div className="card-content">
                        <p>1311333</p>
                        <p className="title is-size-5">aini</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <h1>tanggal</h1>
          <p>Tanggal</p>
          <p>Kasir</p>
          <p>Kode Transaksi</p>
          <p>Member</p>
          <div className="table-responsive bg-dark">
            <table className="table table-responsive table-dark table-hover">
              <thead>
                <tr>
                  <td>No</td>
                  <td>Produk</td>
                  <td>Harga</td>
                  <td>Qty</td>
                  <td>Total</td>
                  <td>Aksi</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Pizza</td>
                  <td>Rp. 2020900202220</td>
                  <td>100</td>
                  <td>Rp.1872830000</td>
                  <td>
                    <button className="btn btn-danger btn-sm">batal</button>
                    <button className="btn btn-success btn-sm">update</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>Total Bayar</p>
          <p>Disc Member</p>
          <p>Catatan</p>
          <p>Tunai</p>
          <p>Kembali</p>
          <p>Metode Bayar</p>
          <button>Proses Pembayaran</button>
        </div>
      </div>
    </div>
  );
};

export default KasirList;
