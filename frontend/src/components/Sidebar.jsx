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

  // Return harus berada dalam satu elemen JSX yang valid
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
                        <img src="assets/images/foto.png" width="50" height="28" alt="" className="profile-pic" />
                        <h1 className="text-white">nur aini pertiwi</h1>
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

            <ul className="menu-list">
              <li className="item-sidebar">
                <button onClick={logout} className="button is-black">
                  <IoLogOut />
                  Logout
                </button>
              </li>
            </ul>
          </aside>
        </div>
  
    </>
  );
};

export default Sidebar;
