import React, { useState, useEffect } from "react";
import "../index.css";
import axios from "axios";
import { useParams } from "react-router-dom"; // Untuk mengambil parameter dari URL
import { API_URL } from "../features/constants";
import { Link } from "react-router-dom";


const KasirTransaksiDetail = () => {
  const { id_transaksi } = useParams(); // Ambil id_transaksi dari URL
  const [detail, setDetail] = useState([]);
  
  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    try {
      // Mengambil detail transaksi berdasarkan id_transaksi
      const response = await axios.get(API_URL + "detailtransaksi/" + id_transaksi);
      setDetail(response.data.detailTransaksi);
    } catch (error) {
      console.error("Error fetching detail transaksi:", error);
    }
  };

  const deleteDetail = async (id_detailtrans) => {
    try {
      await axios.delete(`${API_URL}detailtransaksi/${id_detailtrans}`);
      getDetail(); // Refresh data setelah penghapusan
    } catch (error) {
      console.error("Error deleting detail transaksi:", error);
    }
  };

  return (
    <div className="mt-5">
      <h1 className="title ml-5">Transaksi</h1>
      <h2 className="subtitle ml-5">Detail Transaksi</h2>
      <Link to="/kasir" className="button is-danger mb-2 ml-5">
        Kembali
      </Link>
      <div>
        <table className="table is-fullwidth ml-5">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Produk</th>
              <th>Harga</th>
              <th>Kuantitas</th>
              <th>Catatan</th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {detail.map((detailItem, index) => (
              <tr key={detailItem.id_detailtrans}>
                <td>{index + 1}</td>
                <td>{detailItem.nmproduk}</td>
                <td>{detailItem.harga_produk}</td>
                <td>{detailItem.kuantitas}</td>
                <td>{detailItem.catatan}</td>
                {/* <td>
                  <button
                    onClick={() => deleteDetail(detailItem.id_detailtrans)}
                    className="button is-danger"
                  >
                    Delete
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KasirTransaksiDetail;
