import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../features/constants";
import "../index.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TransaksiList = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getTransaksi();
  }, []);

  const getTransaksi = async () => {
    const response = await axios.get(API_URL + "transaksi");
    setTransaksi(response.data);
  };

  // Metode untuk menghapus transaksi
  const deleteTransaksi = async (id_transaksi) => {
    await axios.delete(API_URL + "transaksi/" + id_transaksi);
    getTransaksi();
  };

  // Fungsi untuk memfilter transaksi berdasarkan tanggal
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div>
      <h1 className="title">Transaksi</h1>
      <h2 className="subtitle">Barang Terjual</h2>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button className="button is-success">Cetak</button>
            </div>
          </div>
          {/* Date range picker */}
          <div className="container mt-5">
            <div className="columns">
              <div className="column is-centered">
              <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} />
              </div>
              <div className="column is-centered">
  
              </div>
            </div>
            {/* Search bar */}
            <div className="columns">
              <div className="kolom is-centered">
                <form action="">
                  <div className="field has-addons">
                    <div className="control is-expanded">
                      <input
                        type="text"
                        className="input"
                        placeholder="cari.."
                        onChange={(e) => setSearch(e.target.value)}
                      />
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
        </div>
      </div>

      <p className="tanggal">
        <button className="button ungu">Filter</button>
      </p>
      <div>
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Kode Transaksi</th>
              <th>Nama Member</th>
              <th>Nama Kasir</th>
              <th>Total harga</th>
              <th>Total Bayar</th>
              <th>Bayar</th>
              <th>Potongan</th>
              <th>Metode Bayar</th>
              <th>Tanggal</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {transaksi
              .filter((transaksi) => {
                return search.toLowerCase() === "" ? transaksi : transaksi.nama_member.toLowerCase().includes(search);
              }).map((transaksi, index) => (
              <tr key={transaksi.id_transaksi}>
                <td>{index + 1}</td>
                <td>{transaksi.id_transaksi}</td>
                <td>{transaksi.nama_member}</td>
                <td>{transaksi.nama_kasir}</td>
                <td>{transaksi.total_harga}</td>
                <td>{transaksi.total_bayar}</td>
                <td>{transaksi.bayar}</td>
                <td>{transaksi.potongan}</td>
                <td>{transaksi.metode_bayar}</td>
                <td>{transaksi.tanggal}</td>
                <td>
                  <Link
                    to={`/transaksi/detail/${transaksi.id_transaksi}`}
                    className="button is-primary is-info"
                  >
                    Detail
                  </Link>
                  <button
                    onClick={() => deleteTransaksi(transaksi.id_transaksi)}
                    className="button is-danger mb-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransaksiList;
