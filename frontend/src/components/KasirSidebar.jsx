import React from "react";
import "../index.css";
import { Col, ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { GiForkKnifeSpoon, GiCoffeeBeans, GiLiquidSoap, GiEmptyMetalBucket } from "react-icons/gi";
import { PiTeaBag } from "react-icons/pi";
import { IoPerson, IoHome, IoLogOut, IoCube, IoPeopleOutline, IoCart, IoList, IoPeopleCircle, IoWallet } from "react-icons/io5";
const KasirSidebar = () => {
  return (
    <div>
      <Col md={2} mt="2">
        <aside className="menu pl-2 pr-2 has-shadow mt-5">
          <h1 className="text-white">Daftar Kategori</h1>
          <hr />
          <ul className="menu-list">
            <li className="item-sidebar">
              <NavLink>
                <GiForkKnifeSpoon />
                Makanan
              </NavLink>
            </li>
            <li className="item-sidebar">
              <NavLink>
                <GiEmptyMetalBucket />
                Minuman
              </NavLink>
            </li>
          </ul>
          <ul className="menu-list">
            <li className="item-sidebar">
              <NavLink>
                <GiCoffeeBeans />
                Kopi
              </NavLink>
            </li>
          </ul>
          <ul className="menu-list">
            <li className="item-sidebar">
              <NavLink>
                <PiTeaBag />
                Teh
              </NavLink>
            </li>
          </ul>

          <ul className="menu-list">
            <li className="item-sidebar">
              <NavLink>
                <GiLiquidSoap />
                Sabun
              </NavLink>
            </li>
          </ul>
        </aside>
      </Col>
    </div>
  );
};

export default KasirSidebar;
