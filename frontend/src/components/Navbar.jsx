import React, { useState } from "react";
import "../index.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isDropdownActive, setDropdownActive] = useState(false);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownActive(!isDropdownActive);
  };

  return (
    <div>
      <nav className="navbar is-fixed-top has-shadow" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <NavLink className="navbar-item" to="/dashboard">
            <h1>Metro Pos</h1>
          </NavLink>
          <a href="!#" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            {/* <div className="navbar-item has-dropdown is-hoverable">
              {user && (
                <div onClick={toggleDropdown} className={`dropdown ${isDropdownActive ? 'is-active' : ''}`}>
                  <div className="dropdown-trigger">
                    <img src={user.foto || "default.jpg"} width="50" height="28" alt="" className="profile-pic" />
                  </div>

                  <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                      <div className="dropdown-item">
                        <strong>{user.nama_lengkap}</strong>
                      </div>
                      <hr className="dropdown-divider" />
                     
                    </div>
                  </div>
                </div>
              )}
            </div> */}
             {/* <button onClick={logout} className="button is-danger">
                        Logout
                      </button> */}

                      <div className="buttons">
                {/* Menampilkan tanggal otomatis */}
                {/* <h2>{today}</h2> */}
                {/* <h1>nama</h1>
                <img src={logo} width="50" height="28" alt="" className="profile-pic" /> */}
                {/* Tombol Logout */}
                <button className="button is-danger" onClick={logout}>
                  Logout
                </button>
              </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
