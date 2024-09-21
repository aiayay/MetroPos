import React, { useState, useEffect } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom"; // Untuk mengambil parameter dari URL
import { API_URL } from "../features/constants";
const DetailTransaksi = () => {
  const { id_transaksi } = useParams(); // Ambil id_transaksi dari URL
  const [detail, setDetail] = useState([]);
  const [search, setSearch] = useState("");
  // console.log(search);

  useEffect(() => {
    getDetail();
  }, []);
  const getDetail = async () => {
    const response = await axios.get(API_URL + "detailtransaksi");
    setDetail(response.data);
  };

  //metod delete detail

  const deleteDetail = async (id_detailtrans) => {
    await axios.delete(API_URL + "detailtransaksi/" + id_detailtrans);
    getDetail();
  };
  return (
    <div>
      <h1 className="title">Transaksi</h1>
      <h2 className="subtitle">Detail Transaksi</h2>
      <div>
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Produk</th>
              <th>Harga</th>
              <th>Kuantitas</th>
              <th>Catatan</th>
              {/* <th>Total Harga</th> */}
            </tr>
          </thead>
          <tbody>
            {detail
              .map((detail, index) => (
                <tr key={detail.id_detailtrans}>
                  <td>{index + 1}</td>
                  <td>{detail.nmproduk}</td>
                  <td>{detail.harga_produk}</td>
                  <td>{detail.kuantitas}</td>
                  <td>{detail.catatan}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailTransaksi;
