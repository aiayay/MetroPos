import React from "react";
import "../index.css";
import { NavLink } from "react-router-dom";
import { IoPerson, IoPricetag, IoHome, IoLogOut } from "react-icons/io5";
const Sidebar = () => {
  return (
    <div>
      <aside className="menu pl-2 pr-2 has-shadow mt-5">
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li className="item-sidebar">
            <NavLink to={"/dashboard"}>
              <IoHome />
              Dashboard
            </NavLink>
          </li>
          <li className="item-sidebar">
            <NavLink to={"/produk"}>
              <IoPricetag />
              Produk
            </NavLink>
          </li>
        </ul>
        <p className="menu-label">Member</p>
        <ul className="menu-list">
          <li className="item-sidebar">
            <NavLink to={"/member"}>
              <IoPerson />
              Member
            </NavLink>
          </li>
        </ul>
        <p className="menu-label">Transaksi</p>
        <ul className="menu-list">
          <li className="item-sidebar">
            <NavLink to={"/transaksi"}>
              <IoPerson />
              Transaksi
            </NavLink>
          </li>
        </ul>
        <p className="menu-label">Kategori</p>
        <ul className="menu-list">
          <li className="item-sidebar">
            <NavLink to={"/kategori"}>
              <IoPerson />
              Kategori
            </NavLink>
          </li>
        </ul>
        <p className="menu-label">User</p>
        <ul className="menu-list">
          <li className="item-sidebar">
            <NavLink to={"/users"}>
              <IoPerson />
              Users
            </NavLink>
          </li>
        </ul>
        <p className="menu-label">Supplier</p>
        <ul className="menu-list">
          <li className="item-sidebar">
            <NavLink to={"/supplier"}>
              <IoPerson />
              Supplier
            </NavLink>
          </li>
        </ul>
        <p className="menu-label">Pembelian</p>
        <ul className="menu-list">
          <li className="item-sidebar">
            <NavLink to={"/pembelian"}>
              <IoPerson />
              Pembelian
            </NavLink>
          </li>
        </ul>
        <p className="menu-label">Setting</p>
        <ul className="menu-list">
          <li className="item-sidebar">
            <button className="button is-white">
              <IoLogOut />
              Logout
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
