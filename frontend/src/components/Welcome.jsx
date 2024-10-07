import React, { useState, useEffect } from "react";
import "../index.css";
import axios from "axios";
import { API_URL } from "../features/constants";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  const [transaksi, setTransaksi] = useState([]);
  const [pembelian, setPembelian] = useState([]);
  const [pembelianHariIni, setPembelianHariIni] = useState(0);
  const [pendapatanHariIni, setPendapatanHariIni] = useState(0);
  const [totalTransaksiHariIni, setTotalTransaksiHariIni] = useState(0);

  useEffect(() => {
    getTransaksi();
    getPembelian();
  }, []);

  const getTransaksi = async () => {
    const response = await axios.get(API_URL + "transaksi");
    setTransaksi(response.data);
    hitungPendapatanHariIni(response.data);
    hitungTotalTransaksiHariIni(response.data);
  };

  const hitungPendapatanHariIni = (data) => {
    const today = new Date().toISOString().split("T")[0];
    const totalPendapatan = data.reduce((total, transaksi) => {
      if (transaksi.tanggal.split("T")[0] === today) {
        return total + transaksi.total_bayar;
      }
      return total;
    }, 0);
    setPendapatanHariIni(totalPendapatan);
  };

  const hitungTotalTransaksiHariIni = (data) => {
    const today = new Date().toISOString().split("T")[0];
    const totalTransaksi = data.reduce((total, transaksi) => {
      if (transaksi.tanggal.split("T")[0] === today) {
        return total + 1;
      }
      return total;
    }, 0);
    setTotalTransaksiHariIni(totalTransaksi);
  };

  const getPembelian = async () => {
    const response = await axios.get(API_URL + "pembelian");
    setPembelian(response.data);
    hitungPembelianHariIni(response.data.data);
  };

  const hitungPembelianHariIni = (data) => {
    const today = new Date().toISOString().split("T")[0];
    const totalPembelian = data.reduce((total, pembelian) => {
      if (pembelian.tanggal.split("T")[0] === today) {
        return total + Number(pembelian.harga_beli);
      }
      return total;
    }, 0);
    setPembelianHariIni(totalPembelian);
  };

  const formatTanggalHariIni = () => {
    const today = new Date();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return today.toLocaleDateString('id-ID', options);
  };

  return (
    <div className="mt-5">
      <h1 className="title">Dashboard</h1>
      <h2 className="subtitle mt-3">
        Welcome Back, <strong className="text-black">{user && user.nama_lengkap}</strong>
      </h2>

      {/* Container untuk card */}
      <div className="card-container">
        {/* transaksi hari ini */}
        <div className="card" style={{ backgroundColor: "#FFD688" }}>
          <header className="card-header">
            <p className="card-header-title white-text">Transaksi Hari Ini</p>
            <button className="card-header-icon" aria-label="more options">
              <span className="icon">
                <i className="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </header>
          <div className="card-content">
            <div className="content">
              <time className="white-text" dateTime={formatTanggalHariIni()}>Tanggal : {formatTanggalHariIni()}</time>
              <br />
              <p className="white-text">Jumlah : {totalTransaksiHariIni}</p>
          <footer className="card-footer transaksi">
            <Link to="/transaksi" className="card-footer-item">Lihat Detail</Link>
          </footer>
            </div>
          </div>
        </div>

        {/* pendapatan hari ini */}
        <div className="card" style={{ backgroundColor: "#9FC695" }}>
          <header className="card-header">
            <p className="card-header-title white-text">Pendapatan Hari Ini</p>
            <button className="card-header-icon" aria-label="more options">
              <span className="icon">
                <i className="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </header>
          <div className="card-content">
            <div className="content">
              <time className="white-text" dateTime={formatTanggalHariIni()}>Tanggal : {formatTanggalHariIni()}</time>
              <br />
              <p className="white-text">Rp. {pendapatanHariIni.toLocaleString('id-ID')}</p>
          <footer className="card-footer pendapatan">
            <Link to="/transaksi" className="card-footer-item">Lihat Detail</Link>
          </footer>
            </div>
          </div>
        </div>

        {/* pengeluaran hari ini */}
        <div className="card" style={{ backgroundColor: "#FF926F" }}>
          <header className="card-header">
            <p className="card-header-title white-text">Pengeluaran Hari Ini</p>
            <button className="card-header-icon" aria-label="more options">
              <span className="icon">
                <i className="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </header>
          <div className="card-content">
            <div className="content">
              <time className="white-text" dateTime={formatTanggalHariIni()}>Tanggal : {formatTanggalHariIni()}</time>
              <br />
              <p className="white-text">Rp. {pembelianHariIni.toLocaleString('id-ID')}</p>
          <footer className="card-footer pembelian">
            <Link to="/pembelian" className="card-footer-item">Lihat Detail</Link>
          </footer>
            </div>
          </div>
        </div>
      </div>

      <br />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h3 className="title">Grafik Pendapatan</h3>
        <ResponsiveContainer width="100%" aspect={3}>
          <BarChart data={transaksi}>
            <XAxis dataKey="tanggal" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total_bayar" fill="#42921C" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Welcome;
