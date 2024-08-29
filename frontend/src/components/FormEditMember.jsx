import React from "react";
import "../index.css";

const FormEditMember = () => {
  return (
    <div>
      <h1 className="title">Member</h1>
      <h2 className="subtitle">Edit Member</h2>
      <div className="card is-shadowless">
        <div className="card-content has-background-light">
          <div className="content">
            <form className="box has-background-light">
              <div className="field">
                <label className="label">Kode Member</label>
                <div className="control">
                  <input type="text" className="input" readOnly />
                </div>
              </div>
              <div className="field">
                <label className="label">Nama Member</label>
                <div className="control">
                  <input type="text" className="input" placeholder="Nama Member" />
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
                <label className="label">Jenis Kelamin</label>
                <div className="control">
                  <label className="radio">
                    <input type="radio" name="jk" value="Laki-laki" />
                    Laki-laki
                  </label>
                  <label className="radio">
                    <input type="radio" name="jk" value="Perempuan" />
                    Perempuan
                  </label>
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

export default FormEditMember;
