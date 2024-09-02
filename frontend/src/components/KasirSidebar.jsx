import React from "react";
import "../index.css";
import { NavLink } from "react-router-dom";
import { GiForkKnifeSpoon, GiCoffeeBeans, GiLiquidSoap, GiEmptyMetalBucket } from "react-icons/gi";
import { PiTeaBag } from "react-icons/pi";
import { IoPerson, IoHome, IoLogOut, IoCube, IoPeopleOutline, IoCart, IoList, IoPeopleCircle, IoWallet } from "react-icons/io5";
const KasirSidebar = () => {
  return (
    <div>
      <aside className="menu pl-2 pr-2 has-shadow mt-5">
        <ul className="menu-list">
          <li className="item-sidebar">
            <NavLink to={"/dashboard"}>
              <GiForkKnifeSpoon />
              Makanan
            </NavLink>
          </li>
          <li className="item-sidebar">
            <NavLink to={"/produk"}>
              <GiEmptyMetalBucket />
              Minuman
            </NavLink>
          </li>
        </ul>

        <ul className="menu-list">
          <li className="item-sidebar">
            <NavLink to={"/member"}>
              <GiCoffeeBeans />
              Kopi
            </NavLink>
          </li>
        </ul>

        <ul className="menu-list">
          <li className="item-sidebar">
            <NavLink to={"/transaksi"}>
              <PiTeaBag />
              Teh
            </NavLink>
          </li>
        </ul>

        <ul className="menu-list">
          <li className="item-sidebar">
            <NavLink to={"/kategori"}>
              <GiLiquidSoap />
              Sabun
            </NavLink>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default KasirSidebar;
