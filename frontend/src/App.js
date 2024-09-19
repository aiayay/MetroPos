import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import KasirAddMember from "./components/KasirAddMember";
import KasirTransaksi from "./pages/KasirTransaksi";
import Sukses from "./pages/Sukses";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/kasir" element={<Kasir />} />
          <Route path="/sukses" element={<Sukses />} />
          <Route path="/kasirmember/add" element={<KasirAddMember />} />
          <Route path="/kasirtransaksi" element={<KasirTransaksi />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id_user" element={<EditUser />} />
          <Route path="/kategori" element={<Kategori />} />
          <Route path="/kategori/add" element={<AddKategori />} />
          <Route path="/kategori/edit/:id_kategori" element={<EditKategori />} />
          <Route path="/member" element={<Member />} />
          <Route path="/member/add" element={<AddMember />} />
          <Route path="/member/edit/:id_member" element={<EditMember />} />
          <Route path="/pembelian" element={<Pembelian />} />
          <Route path="/pembelian/add" element={<AddPembelian />} />
          <Route path="/pembelian/edit/:id_pembelian" element={<EditPembelian />} />
          <Route path="/produk" element={<Produk />} />
          <Route path="/produk/add" element={<AddProduk />} />
          <Route path="/produk/edit/:id_produk" element={<EditProduk />} />
          <Route path="/supplier" element={<Supplier />} />
          <Route path="/supplier/add" element={<AddSupplier />} />
          <Route path="/supplier/edit/:id_supplier" element={<EditSupplier />} />
          <Route path="/transaksi" element={<Transaksi />} />
          <Route path="/transaksi/detail/:id_transaksi" element={<TransaksiDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
