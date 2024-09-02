import React, { useState, useEffect } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../features/constants";
const DetailTransaksi = () => {
  return (
    <div>
      <h1 className="title">Transaksi</h1>
      <h2 className="subtitle">Detail Transaksi</h2>
      <div>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Produk</th>
              <th>Harga</th>
              <th>Kuantitas</th>
              <th>Total Harga</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailTransaksi;
