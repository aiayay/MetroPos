import React, { useState, useEffect } from "react";
import "../index.css";
import axios from "axios";
import { API_URL } from "../features/constants";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const Welcome = () => {
  const [transaksi, setTransaksi] = useState([]);
  // const [search, setSearch] = useState("");
  // console.log(search);

  useEffect(() => {
    getTransaksi();
  }, []);
  const getTransaksi = async () => {
    const response = await axios.get(API_URL + "transaksi");
    setTransaksi(response.data);
  };

  return (
    <div>
      <h1 className="title">Dashboard</h1>
      <h2 className="subtitle">Welcome Back...</h2>

      <ResponsiveContainer width="100%" aspect={3}>
        <BarChart data={transaksi}>
          <XAxis dataKey="tanggal" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total_bayar" fill="red" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Welcome;
