import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../features/constants"; // Pastikan API_URL sudah terdefinisi dengan benar
import "../index.css";
import { IoTrash } from "react-icons/io5";
import { FaPenToSquare } from "react-icons/fa6";

const SupplierList = () => {
  const [supplier, setSupplier] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getSupplier();
  }, []);

  const getSupplier = async () => {
    try {
      const response = await axios.get(API_URL + "supplier");
      if (response.data && Array.isArray(response.data.data)) {
        setSupplier(response.data.data);
      } else {
        setSupplier([]);
      }
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      setSupplier([]);
    }
  };

  const deleteSupplier = async (id_supplier) => {
    try {
      await axios.delete(API_URL + "supplier/" + id_supplier);
      getSupplier(); // Refresh supplier list after deletion
    } catch (error) {
      console.error("Error deleting supplier:", error);
    }
  };

  return (
    <div className="mt-5">
      <h1 className="title">Supplier</h1>
      <h2 className="subtitle">Data Supplier</h2>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
        <div className="navbar-item">
  <div className="buttons" style={{ display: 'flex', alignItems: 'center' }}>
    <Link to="/supplier/add" className="button is-success">
      Tambah Data +
    </Link>
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
      <div className="table-container" style={{ overflowX: 'auto' }}>
      <table className="table is-fullwidth" style={{ minWidth: "600px" }}>
          <thead>
            <tr>
              <th>No</th>
              {/* <th>Kode Supplier</th> */}
              <th>Nama Supplier</th>
              <th>Alamat</th>
              <th>No Telepon</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {supplier
              .filter((s) => {
                return (
                  search.toLowerCase() === "" ||
                  s.nmsupplier.toLowerCase().includes(search.toLowerCase())
                );
              })
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((s, index) => (
                <tr key={s.id_supplier}>
                  <td>{index + 1}</td>
                  {/* <td>{s.id_supplier}</td> */}
                  <td>{s.nmsupplier}</td>
                  <td>{s.alamat}</td>
                  <td>{s.notlp}</td>
                  {/* <td>
                    <Link to={`/supplier/edit/${s.id_supplier}`} className="button is-small is-info">
                      Edit
                    </Link>
                    <button onClick={() => deleteSupplier(s.id_supplier)} className="button is-small is-danger">
                      Delete
                    </button>
                  </td> */}
                  <td>
  <Link to={`/supplier/edit/${s.id_supplier}`} className="button is-small is-info button-spacing">
    <FaPenToSquare className="icon-spacing" />
  </Link>
  <button 
    onClick={() => deleteSupplier(s.id_supplier)}
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

export default SupplierList;
