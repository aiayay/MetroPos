import React, { Component } from "react";
import "../index.css";
import axios from "axios";
import { API_URL } from "../features/constants";
import { Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { GiForkKnifeSpoon, GiCoffeeBeans, GiLiquidSoap, GiEmptyMetalBucket } from "react-icons/gi";
import { PiTeaBag } from "react-icons/pi";
import { IoPerson, IoHome, IoLogOut, IoCube, IoPeopleOutline, IoCart, IoList, IoPeopleCircle, IoWallet } from "react-icons/io5";


// const Icon = ({ nama }) => {
//   if(nama=="")
// }
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
        // console.log("Response : ", res.data);
        const kategories = res.data.data;
        this.setState({ kategories });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    // console.log("kategori : ", this.state.kategories);
    const { kategories } = this.state;
    const { changeKategori, kategoriYangDipilih } = this.props;

    return (
      <div>
        <Col md={8} xs={12} className="mb-4 mr-4">
          <aside className="menu pl-2 pr-2 has-shadow mt-0">
            <h1 className="text-white">Daftar Kategori</h1>
            <hr />
            <ul className="menu-list">
              {kategories &&
                kategories.map((kategori) => (
                  <li key={kategori.id_kategori} className={kategoriYangDipilih === kategori.nama_kategori ? "item-sidebar" : ""} onClick={() => changeKategori(kategori.nama_kategori)} style={{ cursor: "pointer" }}>
                    <a>{kategori.nama_kategori}</a>
                  </li>
                ))}
            </ul>

            {/* <ListGroup>
              {kategories &&
                kategories.map((kategori) => (
                  <ListGroupItem key={kategori.id_kategori} className={kategoriYangDipilih === kategori.nama_kategori && "kategori-aktif"} onClick={() => changeKategori(kategori.nama_kategori)} style={{ cursor: "pointer" }}>
                    <h5>{kategori.nama_kategori}</h5>
                  </ListGroupItem>
                ))}
            </ListGroup> */}
            {/* <ul className="menu-list">
              {kategories &&
                kategories.map((kategori) => (
                  <li key={kategori.id_kategori} className={kategoriYangDipilih === kategori.nama_kategori && "kategori-aktif"} onClick={() => changeKategori(kategori.nama_kategori)}>
                    {kategori.nama_kategori}
                  </li>
                ))}
            </ul> */}
          </aside>
        </Col>
      </div>
    );
  }
}
