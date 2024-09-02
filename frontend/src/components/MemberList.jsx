import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../features/constants";
import "../index.css";

const MemberList = () => {
  const [member, setMember] = useState([]);

  useEffect(() => {
    getMember();
  }, []);
  const getMember = async () => {
    const response = await axios.get(API_URL + "member");
    setMember(response.data);
  };

  //metod delete member

  const deleteMember = async (id_member) => {
    await axios.delete(API_URL + "member/" + id_member);
    getMember();
  };
  return (
    <div>
      <h1 className="title">Member</h1>
      <h2 className="subtitle">Data Member</h2>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link to="/member/add" className="button is-primary mb-2">
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
              <th>Kode Member</th>
              <th>Nama Member</th>
              <th>No Telepon</th>
              <th>Alamat</th>
              <th>Jenis Kelamin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {member.map((member, index) => (
              <tr key={member.id_member}>
                <td>{index + 1}</td>
                <td>{member.id_member}</td>
                <td>{member.nama_member}</td>
                <td>{member.no_telepon}</td>
                <td>{member.alamat}</td>
                <td>{member.jk}</td>
                <td>
                  <Link to={`/member/edit/${member.id_member}`} className="button is-small is-info">
                    Edit
                  </Link>
                  <button onClick={() => deleteMember(member.id_member)} className="button is-small is-danger">
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

export default MemberList;
