import React from "react";
import "../index.css";

const FormEditKategori = () => {
  return (
    <div>
      <h1 className="title">Kategori</h1>
      <h2 className="subtitle">Edit Kategori</h2>
      <div className="card is-shadowless">
        <div className="card-content has-background-light">
          <div className="content">
            <form className="box has-background-light">
              <div className="field">
                <label className="label">Kode Kategori</label>
                <div className="control">
                  <input type="text" className="input" readOnly />
                </div>
              </div>
              <div className="field">
                <label className="label">Nama Kategori</label>
                <div className="control">
                  <input type="text" className="input" placeholder="nama kategori" />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button className="button is-success">Edit</button>
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

export default FormEditKategori;
