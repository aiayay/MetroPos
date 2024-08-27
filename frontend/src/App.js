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

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/kategori" element={<Kategori />} />
          <Route path="/member" element={<Member />} />
          <Route path="/pembelian" element={<Pembelian />} />
          <Route path="/pembelian/add" element={<AddPembelian />} />
          <Route path="/pembelian/edit/:id" element={<EditPembelian />} />
          <Route path="/produk" element={<Produk />} />
          <Route path="/supplier" element={<Supplier />} />
          <Route path="/transaksi" element={<Transaksi />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
