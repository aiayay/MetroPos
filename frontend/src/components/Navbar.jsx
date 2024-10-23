import React, { useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
//import poslogo from "../assets/images/poslogo.png"; // pastikan path ini benar sesuai dengan struktur proyek



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

  // Pastikan user login tersedia sebelum menampilkan data user
  const userName = user ? user.nama_lengkap : "Guest";
  const userProfilePic = user && user.foto ? user.foto : "assets/images/default_profile.png"; // Gunakan foto default jika user tidak memiliki foto

  return (
    <div>
      <nav className="navbar is-fixed-top has-shadow" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
        <img src="/assets/images/poslogo.png" alt="Metro Pos Logo" width="112" height="80" className="ml-3" />
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {/* Menampilkan foto dan nama user */}
                <img src={userProfilePic} width="50" height="50%" alt="Profile" className="profile-pic" />
                <p className="ml-2">{userName}</p>
              </div>
            </div>
            {/* <div className="navbar-item">
              <button className="button is-danger" onClick={logout}>
                Logout
              </button>
            </div> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
