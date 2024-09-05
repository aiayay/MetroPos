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
          <h1 className="text-black">Daftar Kategori</h1>
          <hr />
          {/* <ListGroup>
            <ListGroup.Item>
              <NavLink to={"/dashboard"}>
                <GiForkKnifeSpoon />
                Makanan
              </NavLink>
            </ListGroup.Item>
            <ListGroup.Item>
              <NavLink to={"/produk"}>
                <GiEmptyMetalBucket />
                Minuman
              </NavLink>
            </ListGroup.Item>
            <ListGroup.Item>
              <NavLink to={"/member"}>
                <GiCoffeeBeans />
                Kopi
              </NavLink>
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <NavLink to={"/transaksi"}>
                <PiTeaBag />
                Teh
              </NavLink>
            </ListGroup.Item>
            <ListGroup.Item>
              <NavLink to={"/kategori"}>
                <GiLiquidSoap />
                Sabun
              </NavLink>
            </ListGroup.Item>
          </ListGroup> */}
          <ul className="menu-list">
            <li className="item-sidebar">
              <NavLink to={""}>
                <GiForkKnifeSpoon />
                Makanan
              </NavLink>
            </li>
            <li className="item-sidebar">
              <NavLink to={""}>
                <GiEmptyMetalBucket />
                Minuman
              </NavLink>
            </li>
          </ul>

          <ul className="menu-list">
            <li className="item-sidebar">
              <NavLink to={""}>
                <GiCoffeeBeans />
                Kopi
              </NavLink>
            </li>
          </ul>

          <ul className="menu-list">
            <li className="item-sidebar">
              <NavLink to={""}>
                <PiTeaBag />
                Teh
              </NavLink>
            </li>
          </ul>

          <ul className="menu-list">
            <li className="item-sidebar">
              <NavLink to={""}>
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
