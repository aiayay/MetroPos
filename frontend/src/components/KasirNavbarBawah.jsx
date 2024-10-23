import React, { useState, useEffect } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../features/constants";

const KasirNavbarBawah = ({ pilihMember }) => {
  const [member, setMember] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getMember();
  }, []);

  const getMember = async () => {
    const response = await axios.get(API_URL + "member");
    if (response.data && Array.isArray(response.data.data)) {
      setMember(response.data.data);
    } else {
      setMember([]);
    }
  };

  return (
    <div className="container is-fullwidth">
      <div id="navbarBasicExample" className="navbar-menu is-mobile">
        <div className="navbar-end">
          <div className="navbar-item">
            <form onSubmit={(e) => e.preventDefault()} className="is-flex is-flex-direction-column is-align-items-center is-fullwidth">
              <div className="field has-addons is-fullwidth mt-3">
                <div className="control is-expanded">
                  <input
                    type="text"
                    className="input is-fullwidth"
                    placeholder="Cari member.."
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                    }}
                  />
                </div>
              </div>
            </form>
            <div className="buttons is-flex is-justify-content-center mt-3">
              <Link to="/kasirmember/add" className="button ungu is-light mr-2">
                Tambah Member
              </Link>
              <Link to="/kasirtransaksi" className="button is-success">
                Riwayat Transaksi
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="table-container is-scrollable mt-4">
        {search && (
          <table className="table is-fullwidth is-striped is-hoverable">
            <thead>
              <tr>
                <th>No</th>
                <th>Kode Member</th>
                <th>Nama Member</th>
                <th>No Telepon</th>
                <th>Alamat</th>
                <th>Jenis Kelamin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {member
                .filter((member) => {
                  return search.toLowerCase() === ""
                    ? member
                    : member.nama_member.toLowerCase().includes(search);
                })
                .map((member, index) => (
                  <tr key={member.id_member}>
                    <td>{index + 1}</td>
                    <td>{member.id_member}</td>
                    <td>{member.nama_member}</td>
                    <td>{member.no_telepon}</td>
                    <td>{member.alamat}</td>
                    <td>{member.jk}</td>
                    <td>
                      <button className="button is-primary" onClick={() => pilihMember(member.id_member)}>
                        Pilih
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default KasirNavbarBawah;
