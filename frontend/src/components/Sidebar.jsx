import React from "react";
import "../index.css";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoHome, IoLogOut, IoCube, IoPeopleOutline, IoCart, IoList, IoPeopleCircle, IoWallet } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  // Pastikan user login tersedia sebelum menampilkan data user
  const userName = user ? user.nama_lengkap : "Guest";
  const userProfilePic = user && user.foto ? user.foto : "assets/images/default_profile.png"; // Gunakan foto default jika user tidak memiliki foto

  return (
    <>
      <div>
        <aside className="menu pl-2 pr-2 has-shadow mt-5">
          <ul className="menu-list">
            <li className="item-sidebar">
              <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-end">
                  <div className="navbar-item">
                    <div className="buttons">
                      {/* Menampilkan foto user */}
                      <img src={userProfilePic} width="50" height="50" alt="Profile" className="profile-pic" />
                      {/* Menampilkan nama user */}
                      <h1 className="text-white ml-2">{userName}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li className="item-sidebar">
              <NavLink to={"/dashboard"}>
                <IoHome />
                Dashboard
              </NavLink>
            </li>
            <li className="item-sidebar">
              <NavLink to={"/produk"}>
                <IoCube />
                Produk
              </NavLink>
            </li>
          </ul>

          <ul className="menu-list">
            <li className="item-sidebar">
              <NavLink to={"/member"}>
                <IoPeopleOutline />
                Member
              </NavLink>
            </li>
          </ul>

          <ul className="menu-list">
            <li className="item-sidebar">
              <NavLink to={"/transaksi"}>
                <IoCart />
                Transaksi
              </NavLink>
            </li>
          </ul>

          <ul className="menu-list">
            <li className="item-sidebar">
              <NavLink to={"/kategori"}>
                <IoList />
                Kategori
              </NavLink>
            </li>
          </ul>

          <div>
            <ul className="menu-list">
              <li className="item-sidebar">
                <NavLink to={"/users"}>
                  <IoPerson />
                  Users
                </NavLink>
              </li>
            </ul>
          </div>

          <ul className="menu-list">
            <li className="item-sidebar">
              <NavLink to={"/supplier"}>
                <IoPeopleCircle />
                Supplier
              </NavLink>
            </li>
          </ul>

          <ul className="menu-list">
            <li className="item-sidebar">
              <NavLink to={"/pembelian"}>
                <IoWallet />
                Pembelian
              </NavLink>
            </li>
          </ul>

          {/* <ul className="menu-list">
            <li className="item-sidebar">
              <button onClick={logout} className="button is-danger">
                <IoLogOut />
                Logout
              </button>
            </li>
          </ul> */}
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
