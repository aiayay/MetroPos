import React, { Component } from "react";
import "../index.css";
import axios from "axios";
import { API_URL } from "../features/constants";
import { Col, ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { GiForkKnifeSpoon, GiCoffeeBeans, GiLiquidSoap, GiEmptyMetalBucket } from "react-icons/gi";
import { PiTeaBag } from "react-icons/pi";
import { IoPerson, IoHome, IoLogOut, IoCube, IoPeopleOutline, IoCart, IoList, IoPeopleCircle, IoWallet } from "react-icons/io5";

export default class KasirSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      kategories: [],
    };
  }
  componentDidMount() {
    axios
      .get(API_URL + "kategori")
      .then((res) => {
        console.log("Response : ", res.data);
        const kategories = res.data.data;
        this.setState({ kategories });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { kategories } = this.state;
    console.log("kategori : ", this.state.kategories);
    return (
      <div>
        <Col md={2} mt="2">
          <aside className="menu pl-2 pr-2 has-shadow mt-5">
            <h1 className="text-white">Daftar Kategori</h1>
            <hr />
            <ul className="menu-list">
              {kategories &&
                kategories.map((kategori) => (
                  <li key={kategori.id_kategori} className="item-sidebar">
                    {kategori.nama_kategori}
                  </li>
                ))}
            </ul>
          </aside>
        </Col>
      </div>
    );
  }
}
