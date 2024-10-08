import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../features/constants";
import "../index.css";
import { IoTrash } from "react-icons/io5";
import { FaPenToSquare } from "react-icons/fa6";

const MemberList = () => {
  const [member, setMember] = useState([]);
  const [search, setSearch] = useState("");
  // console.log(search);

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

  //metod delete member

  const deleteMember = async (id_member) => {
    await axios.delete(API_URL + "member/" + id_member);
    getMember();
  };
  return (
    <div className="mt-5">
      <h1 className="title">Member</h1>
      <h2 className="subtitle">Data Member</h2>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
        <div className="navbar-item">
  <div className="buttons" style={{ display: 'flex', alignItems: 'center' }}>
    <Link to="/member/add" className="button is-success">
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
              {/* <th>Kode Member</th> */}
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
                return search.toLowerCase() === "" ? member : member.nama_member.toLowerCase().includes(search);
              })
              .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))

              .map((member, index) => (
                <tr key={member.id_member}>
                  <td>{index + 1}</td>
                  {/* <td>{member.id_member}</td> */}
                  <td>{member.nama_member}</td>
                  <td>{member.no_telepon}</td>
                  <td>{member.alamat}</td>
                  <td>{member.jk}</td>
                  {/* <td>
                    <Link to={`/member/edit/${member.id_member}`} className="button is-small is-info">
                      Edit
                    </Link>
                    <button onClick={() => deleteMember(member.id_member)} className="button is-small is-danger">
                      Delete
                    </button>
                  </td> */}
                  <td>
  <Link to={`/member/edit/${member.id_member}`} className="button is-small is-info button-spacing">
    <FaPenToSquare className="icon-spacing" />
  </Link>
  <button 
    onClick={() => deleteMember(member.id_member)}
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

export default MemberList;
