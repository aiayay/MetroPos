import React from "react";
import "../index.css";

const FormEditSupplier = () => {
  return (
    <div>
      <h1 className="title">Supplier</h1>
      <h2 className="subtitle">Tambah Supplier</h2>
      <div className="card is-shadowless">
        <div className="card-content has-background-light">
          <div className="content">
            <form className="box has-background-light">
              <div className="field">
                <label className="label">Kode Supplier</label>
                <div className="control">
                  <input type="text" className="input" readOnly />
                </div>
              </div>
              <div className="field">
                <label className="label">Nama Supplier</label>
                <div className="control">
                  <input type="text" className="input" placeholder="Nama Supplier" />
                </div>
              </div>
              <div className="field">
                <label className="label">Nomor Telepon</label>
                <div className="control">
                  <input type="number" className="input" placeholder="Nomor Telepon" />
                </div>
              </div>
              <div className="field">
                <label className="label">Alamat</label>
                <div className="control">
                  <input type="text" className="input" placeholder="Alamat" />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button className="button">Simpan</button>
                  <button className="button is-danger">Cancle</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditSupplier;
