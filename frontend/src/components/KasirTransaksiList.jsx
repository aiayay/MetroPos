import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../features/constants";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { IoTrash, IoEyeOutline } from "react-icons/io5";
import {jsPDF} from "jspdf";
import "jspdf-autotable";

const KasirTransaksiList = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getTransaksi();
  }, []);

  const getTransaksi = async () => {
    const response = await axios.get(API_URL + "transaksi");
    setTransaksi(response.data);
  };

  const deleteTransaksi = async (id_transaksi) => {
    await axios.delete(API_URL + "transaksi/" + id_transaksi);
    getTransaksi();
  };
  const exportPdf = async () => {
    const doc = new jsPDF({ orientation: "landscape" });
  
    const title = "Laporan Transaksi";
    const periode = `Periode: ${startDate ? startDate : '-'} sampai ${endDate ? endDate : '-'}`;
  
    doc.setFontSize(16);
    doc.text(title, 14, 15);  // Menambahkan judul laporan
    doc.setFontSize(12);
    doc.text(periode, 14, 25);  // Menambahkan rentang periode yang diambil dari input tanggal
    
    // Header tabel
    const headers = [["ID Transaksi", "Nama Member", "Nama Kasir", "Total Bayar", "Potongan", "Metode Bayar", "Tanggal"]];
  
    // Data yang akan dimasukkan ke dalam tabel
    const tableData = transaksi.map((row) => [
      row.id_transaksi,
      row.nama_member,
      row.nama_kasir,
      row.total_bayar,
      row.potongan,
      row.metode_bayar,
      row.tanggal,
    ]);
  
    // Menggunakan autoTable untuk menampilkan data
    doc.autoTable({
      startY: 30,
      head: headers,
      body: tableData,
    });
  
    // Simpan file PDF
    doc.save("data.pdf");
  };
  

  const handleFilter = (transaksi) => {
    let filtered = transaksi;

    // Filter berdasarkan nama member yang dicari
    if (search) {
      filtered = filtered.filter((item) => item.nama_member.toLowerCase().includes(search.toLowerCase()));
    }

    // Filter berdasarkan rentang tanggal
    if (startDate && endDate) {
      filtered = filtered.filter((item) => {
        const transaksiDate = new Date(item.tanggal);
        return transaksiDate >= new Date(startDate) && transaksiDate <= new Date(endDate);
      });
    }

    return filtered;
  };

  return (
    <div className="mt-5">
      <h1 className="title ml-5">Transaksi</h1>
      <h2 className="subtitle ml-5">Barang Terjual</h2>

      {/* <Link to="/kasir" className="button is-danger mb-2 ml-5">
        Kembali
      </Link> */}
      <div id="navbarBasicExample" className="navbar-menu">
        <nav className="breadcrumb ml-5" aria-label="breadcrumbs">
          <ul>
            <li>
              <a href="/kasir">Kembali</a>
            </li>
            <li className="is-active">
              <a href="#" aria-current="page">
                Transaksi List
              </a>
            </li>
          </ul>
        </nav>
        <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
        <div className="navbar-item">
        <div className="buttons" style={{ display: 'flex', alignItems: 'center' }}>
        <button className="button is-success" onClick={exportPdf}>Cetak</button>
          <form action="" style={{ display: 'flex', marginLeft: '10px' }}>
            <div className="field has-addons">
              <div className="control is-expanded">
                <input type="text" className="input" placeholder="cari.." onChange={(e) => setSearch(e.target.value)} />
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

      <p className="tanggal ml-5">
    Dari
    <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
    />
    Sampai
    <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
    />
</p>

      <div className="table-container ml-5" style={{ overflowX: 'auto' }}>
      <table className="table is-fullwidth" style={{ minWidth: "600px" }}>
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
            {handleFilter(transaksi).map((transaksi, index) => (
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
                <button 
                  onClick={() => navigate(`/transaksi/detail/${transaksi.id_transaksi}`)}
                  className="button is-small mb-2 is-primary is-info button-spacing"
                >
                  <IoEyeOutline className="icon-spacing" />
                </button>
                <button 
                  onClick={() => deleteTransaksi(transaksi.id_transaksi)}
                  className="button is-small is-danger button-spacing"
                >
                  <IoTrash className="icon-spacing" />
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

export default KasirTransaksiList;
