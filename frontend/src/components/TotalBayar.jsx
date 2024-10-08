import React, { useState, useEffect } from "react";
import { numberWithCommas } from "../features/utils";
import axios from "axios";
import { API_URL } from "../features/constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const TotalBayar = ({ keranjang, tanggal }) => {
  const { user } = useSelector((state) => state.auth);
  const [potongan, setPotongan] = useState(0);
  const [bayar, setBayar] = useState(""); // Ubah menjadi string
  const [metode_bayar, setMetode_bayar] = useState("");
  const [total_bayar, setTotal_bayar] = useState(0);
  const [kembalian, setKembalian] = useState(0);

  const navigate = useNavigate();

  const calculateTotalBayar = () => {
    const totalBayar = keranjang.reduce((result, item) => {
      return result + item.total_harga;
    }, 0);
    return totalBayar;
  };

  useEffect(() => {
    setTotal_bayar(calculateTotalBayar());
  }, [keranjang]);

  // Update kembalian setiap kali bayar atau total bayar berubah
  useEffect(() => {
    const bayarValue = bayar ? Number(bayar) : 0; // Jika bayar belum diisi, gunakan 0
    setKembalian(bayarValue - total_bayar);
  }, [bayar, total_bayar]);

  const submitTotalBayar = async (event) => {
    event.preventDefault();

    const id_member = keranjang[0]?.member?.id_member || null;

    const transaksi = {
      id_member: id_member,
      id_user: user?.id_user || "",
      nama_kasir: user?.nama_lengkap || "",
      nama_member: keranjang[0]?.member?.nama_member || "Umum",
      total_bayar: total_bayar,
      bayar: Number(bayar), // Pastikan nilai bayar dikirim sebagai number
      potongan: Number(potongan),
      metode_bayar: metode_bayar,
      tanggal: tanggal,
      detailTransaksi: keranjang.map((item) => ({
        id_produk: item.produk.id_produk,
        nmproduk: item.produk.nmproduk,
        harga_produk: item.produk.harga_jual,
        kuantitas: item.kuantitas,
        catatan: item.catatan,
        total_harga: item.total_harga,
        potongan: item.potongan || 0,
      })),
    };

    console.log("Data transaksi yang dikirim:", transaksi);

    try {
      const res = await axios.post(API_URL + "transaksi", transaksi);
      navigate("/sukses");
    } catch (error) {
      console.error("Error saat membuat transaksi:", error.response?.data || error.message);
    }
  };

  return (
    <div className="fixed-bottom mr-5 ml-3">
      <h3><strong className="text-black">Total Pembayaran : </strong></h3>
      <div className="total-bayar">
        Rp {numberWithCommas(total_bayar)}
      </div>

      <form onSubmit={submitTotalBayar}>
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
          <label className="form-label" htmlFor="bayar">Bayar:</label>
          <input
            type="number"
            className="form-control"
            name="bayar"
            value={bayar} // Tetap menggunakan string untuk input
            onChange={(e) => setBayar(e.target.value)} // Simpan sebagai string
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="kembalian">Kembalian:</label>
          <input
            type="text"
            className="form-control"
            name="kembalian"
            value={`Rp ${numberWithCommas(kembalian)}`} // Tampilkan kembalian
            readOnly
            disabled={metode_bayar !== "cash"} // Disable jika metode bayar bukan cash
          />
        </div>

        <div className="is-flex is-justify-content-center">
          <button type="submit" className="button is-success">
            Proses Pembayaran
          </button>
        </div>
      </form>
    </div>
  );
};

export default TotalBayar;
