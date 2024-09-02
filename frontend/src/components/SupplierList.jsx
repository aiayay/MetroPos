import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../features/constants";
import "../index.css";

const SupplierList = () => {
  const [supplier, setSupplier] = useState([]);

  useEffect(() => {
    getSupplier();
  }, []);
  const getSupplier = async () => {
    const response = await axios.get(API_URL + "supplier");
    setSupplier(response.data);
  };

  //metod delete supplier

  const deleteSupplier = async (id_supplier) => {
    await axios.delete(API_URL + "supplier/" + id_supplier);
    getSupplier();
  };
  return (
    <div>
      <h1 className="title">Supplier</h1>
      <h2 className="subtitle">Data Supplier</h2>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link to="/supplier/add" className="button is-primary mb-2">
                Tambah Data +
              </Link>
            </div>
          </div>
          {/* search */}
          <div className="container mt-5">
            <div className="columns">
              <div className="kolom is-centered">
                <form action="">
                  <div className="field has-addons">
                    <div className="control is-expanded">
                      <input type="text" className="input" placeholder="cari.." />
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
      <div>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Kode Supplier</th>
              <th>Nama Supplier</th>
              <th>Alamat</th>
              <th>No Telepon</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {supplier.map((supplier, index) => (
              <tr key={supplier.id_supplier}>
                <td>{index + 1}</td>
                <td>{supplier.id_supplier}</td>
                <td>{supplier.nmsupplier}</td>
                <td>{supplier.alamat}</td>
                <td>{supplier.notlp}</td>
                <td>
                  <Link to={`/supplier/edit/${supplier.id_supplier}`} className="button is-small is-info">
                    Edit
                  </Link>
                  <button onClick={() => deleteSupplier(supplier.id_supplier)} className="button is-small is-danger">
                    Delete
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
