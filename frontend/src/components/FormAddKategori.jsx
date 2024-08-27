import React from "react";

const FormAddKategori = () => {
  return (
    <div>
      <h1 className="title">Kategori</h1>
      <h2 className="subtitle">Tambah Kategori</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form>
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
                  <button className="button is-success">Simpan</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddKategori;
