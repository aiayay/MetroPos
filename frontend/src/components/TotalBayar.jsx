import React, { useState, useEffect } from "react";
import { numberWithCommas } from "../features/utils";
import axios from "axios";
import { API_URL } from "../features/constants";
import { useNavigate } from "react-router-dom";

const TotalBayar = ({ keranjang }) => {
  const [id_user, setId_user] = useState("");
  const [nama_lengkap, setNama_lengkap] = useState("");
  const [potongan, setPotongan] = useState(0);
  const [bayar, setBayar] = useState(0);
  const [tanggal, setTanggal] = useState("");
  const [metode_bayar, setMetode_bayar] = useState("");
  const [total_bayar, setTotal_bayar] = useState(0);

  const navigate = useNavigate();

  // Hitung total bayar
  const calculateTotalBayar = () => {
    const totalBayar = keranjang.reduce((result, item) => {
      return result + item.total_harga;
    }, 0);
    return totalBayar;
  };

  useEffect(() => {
    setTotal_bayar(calculateTotalBayar());
  }, [keranjang]);

  // Submit transaksi
  const submitTotalBayar = async (event) => {
    event.preventDefault(); // Mencegah halaman reload
  
    const id_member = keranjang[0]?.member?.id_member || null;
  
    const transaksi = {
      id_member: id_member, // ID member jika ada, jika tidak, null
      id_user: id_user, // ID pengguna
      nama_kasir: nama_lengkap, // Nama kasir
      nama_member: keranjang[0]?.member?.nama_member || "Umum", // Nama member
      total_bayar: total_bayar, // Total bayar
      bayar: bayar, // Jumlah yang dibayar
      potongan: potongan, // Potongan
      metode_bayar: metode_bayar, // Metode pembayaran
      tanggal: tanggal, // Tanggal transaksi
      detailTransaksi: keranjang.map((item) => ({
        id_produk: item.produk.id_produk, // ID produk
        nmproduk: item.produk.nmproduk, // Nama produk
        harga_produk: item.produk.harga_jual, // Harga produk
        kuantitas: item.kuantitas, // Kuantitas
        total_harga: item.total_harga, // Total harga
        potongan: item.potongan || 0, // Potongan jika ada
      })),
    };
  
    try {
      const res = await axios.post(API_URL + "transaksi", transaksi);
      navigate("/sukses"); // Pindah ke halaman sukses setelah transaksi selesai
    } catch (error) {
      console.error("Error saat membuat transaksi:", error.response?.data || error.message);
    }
  };
  

  return (
    <div className="fixed-bottom">
      <h3><strong className="text-black">Total Pembayaran : </strong></h3>
      <div className="total-bayar">
        Rp {numberWithCommas(total_bayar)}
      </div>

      <form onSubmit={submitTotalBayar}>
        <div className="form-group">
          <label className="form-label" htmlFor="id_kasir">Id Kasir:</label>
          <input
            type="text"
            name="id_user"
            value={id_user}
            onChange={(e) => setId_user(e.target.value)}
            placeholder="Masukkan id_user"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="nama_lengkap">Nama Lengkap Kasir:</label>
          <input
            type="text"
            name="nama_lengkap"
            value={nama_lengkap}
            onChange={(e) => setNama_lengkap(e.target.value)}
            placeholder="Masukkan nama lengkap"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="bayar">Bayar:</label>
          <input
            type="number"
            className="form-control"
            name="bayar"
            value={bayar}
            onChange={(e) => setBayar(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="potongan">Potongan:</label>
          <input
            type="number"
            className="form-control"
            name="potongan"
            value={potongan}
            onChange={(e) => setPotongan(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="metode_bayar">Metode Pembayaran:</label>
          <select
            name="metode_bayar"
            className="form-control"
            value={metode_bayar}
            onChange={(e) => setMetode_bayar(e.target.value)}
            required
          >
            <option value="" disabled>Pilih Metode</option>
            <option value="cash">Cash</option>
            <option value="kartu">Kartu</option>
            <option value="transfer">Transfer</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="tanggal">Tanggal Transaksi:</label>
          <input
            type="date"
            className="form-control"
            name="tanggal"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TotalBayar; 