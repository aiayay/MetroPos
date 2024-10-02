import React, { useEffect } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux"; // Untuk mengambil state auth dari redux
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import Transaksi from "./pages/Transaksi";
import Supplier from "./pages/Supplier";
import Produk from "./pages/Produk";
import Pembelian from "./pages/Pembelian";
import Member from "./pages/Member";
import Kategori from "./pages/Kategori";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddPembelian from "./pages/AddPembelian";
import EditPembelian from "./pages/EditPembelian";
import AddKategori from "./pages/AddKategori";
import EditKategori from "./pages/EditKategori";
import AddMember from "./pages/AddMember";
import EditMember from "./pages/EditMember";
import AddProduk from "./pages/AddProduk";
import EditProduk from "./pages/EditProduk";
import AddSupplier from "./pages/AddSupplier";
import EditSupplier from "./pages/EditSupplier";
import TransaksiDetail from "./pages/TransaksiDetail";
import Kasir from "./pages/Kasir";
import KasirTransaksi from "./pages/KasirTransaksi";
import Sukses from "./pages/Sukses";
import AddMemberKasir from "./pages/AddMemberKasir";
import { AdminRoute, KasirRoute } from "./components/ProtectedRoute"; // Sesuaikan path jika perlu

// import ProtectedRoute from "./pages/ProtectedRoute"

function App() {
  useEffect(() => {
    // Ambil token dari localStorage
    const token = localStorage.getItem('token');
    // Jika ada token, tambahkan ke default header Axios
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          
          {/* Rute untuk kasir */}
          <Route path="/kasir" element={<KasirRoute><Kasir /></KasirRoute>} />
          <Route path="/kasirmember/add" element={<KasirRoute><AddMemberKasir /></KasirRoute>} />
          <Route path="/kasirtransaksi" element={<KasirRoute><KasirTransaksi /></KasirRoute>} />
          <Route path="/sukses" element={<KasirRoute><Sukses /></KasirRoute>} />

          {/* Rute untuk admin */}
          <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
          <Route path="/users" element={<AdminRoute><Users /></AdminRoute>} />
          <Route path="/users/add" element={<AdminRoute><AddUser /></AdminRoute>} />
          <Route path="/users/edit/:id_user" element={<AdminRoute><EditUser /></AdminRoute>} />
          <Route path="/kategori" element={<AdminRoute><Kategori /></AdminRoute>} />
          <Route path="/kategori/add" element={<AdminRoute><AddKategori /></AdminRoute>} />
          <Route path="/kategori/edit/:id_kategori" element={<AdminRoute><EditKategori /></AdminRoute>} />
          <Route path="/member" element={<AdminRoute><Member /></AdminRoute>} />
          <Route path="/member/add" element={<AdminRoute><AddMember /></AdminRoute>} />
          <Route path="/member/edit/:id_member" element={<AdminRoute><EditMember /></AdminRoute>} />
          <Route path="/pembelian" element={<AdminRoute><Pembelian /></AdminRoute>} />
          <Route path="/pembelian/add" element={<AdminRoute><AddPembelian /></AdminRoute>} />
          <Route path="/pembelian/edit/:id_pembelian" element={<AdminRoute><EditPembelian /></AdminRoute>} />
          <Route path="/produk" element={<AdminRoute><Produk /></AdminRoute>} />
          <Route path="/produk/add" element={<AdminRoute><AddProduk /></AdminRoute>} />
          <Route path="/produk/edit/:id_produk" element={<AdminRoute><EditProduk /></AdminRoute>} />
          <Route path="/supplier" element={<AdminRoute><Supplier /></AdminRoute>} />
          <Route path="/supplier/add" element={<AdminRoute><AddSupplier /></AdminRoute>} />
          <Route path="/supplier/edit/:id_supplier" element={<AdminRoute><EditSupplier /></AdminRoute>} />
          <Route path="/transaksi" element={<AdminRoute><Transaksi /></AdminRoute>} />
          <Route path="/transaksi/detail/:id_transaksi" element={<AdminRoute><TransaksiDetail /></AdminRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;