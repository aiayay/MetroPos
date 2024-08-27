import React from "react";

const FormEditPembelian = () => {
  return (
    <div>
      <h1 className="title">Pembelian</h1>
      <h2 className="subtitle">Edit Pembelian</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form>
              <div className="field">
                <label className="label">Kode Pembelian</label>
                <div className="control">
                  <input type="text" className="input" readOnly />
                </div>
              </div>
              <div className="field">
                <label className="label">Nama Produk</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select>
                      <option value="">Pilih Produk</option>
                      <option value="id_kategori">Makanan</option>
                      <option value="id_kategori">Minuman</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Nama Supplier</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select>
                      <option value="">Pilih Supplier</option>
                      <option value="id_kategori">Makanan</option>
                      <option value="id_kategori">Minuman</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Stok Awal</label>
                <div className="control">
                  <input type="number" className="input" placeholder="stok awal" />
                </div>
              </div>
              <div className="field">
                <label className="label">Harga Beli</label>
                <div className="control">
                  <input type="number" className="input" placeholder="Harga Beli" />
                </div>
              </div>
              <div className="field">
                <label className="label">Kuantitas</label>
                <div className="control">
                  <input type="number" className="input" placeholder="kuantitas" />
                </div>
              </div>
              <div className="field">
                <label className="label">Tanggal</label>
                <div className="control">
                  <input type="date" className="input" placeholder="tanggal" />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button className="button is-success">Edit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditPembelian;
