import React from "react";

const FormEditProduk = () => {
  return (
    <div>
      <h1 className="title">Produk</h1>
      <h2 className="subtitle">Edit Produk</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form>
              <div className="field">
                <label className="label">Kode Produk</label>
                <div className="control">
                  <input type="text" className="input" readOnly />
                </div>
              </div>
              <div className="field">
                <label className="label">Nama Produk</label>
                <div className="control">
                  <input type="text" className="input" placeholder="Nama Produk" />
                </div>
              </div>
              <div className="field">
                <label className="label">Harga Jual</label>
                <div className="control">
                  <input type="number" className="input" placeholder="Harga Jual" />
                </div>
              </div>
              <div className="field">
                <label className="label">Harga Beli</label>
                <div className="control">
                  <input type="number" className="input" placeholder="Harga Beli" />
                </div>
              </div>
              <div className="field">
                <label className="label">Stok</label>
                <div className="control">
                  <input type="number" className="input" placeholder="stok" />
                </div>
              </div>
              <div className="field">
                <label className="label">Satuan</label>
                <div className="control">
                  <input type="text" className="input" placeholder="Satuan" />
                </div>
              </div>
              <div className="field">
                <label className="label">Merk</label>
                <div className="control">
                  <input type="text" className="input" placeholder="Merk" />
                </div>
              </div>
              <div className="field">
                <label className="label">Kategori</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select>
                      <option value="">Pilih Kategori</option>
                      <option value="id_kategori">Makanan</option>
                      <option value="id_kategori">Minuman</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Foto Produk</label>
                <div className="control">
                  <input type="file" className="input" placeholder="foto" />
                </div>
              </div>
              <div className="field">
                <label className="label">Diskon</label>
                <div className="control">
                  <input type="text" className="input" placeholder="diskon" />
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

export default FormEditProduk;
