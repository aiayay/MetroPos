import React, { Component } from "react";
import "../index.css";
import axios from "axios";
import { API_URL } from "../features/constants";
import { Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { GiForkKnifeSpoon, GiCoffeeBeans, GiLiquidSoap, GiEmptyMetalBucket } from "react-icons/gi";
import { PiTeaBag } from "react-icons/pi";
import { IoPerson, IoHome, IoLogOut, IoCube, IoPeopleOutline, IoCart, IoList, IoPeopleCircle, IoWallet, IoMenu } from "react-icons/io5"; // Tambahkan IoMenu

export default class KasirSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      kategories: [],
      burgerMenuActive: false, // Untuk burger menu
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "kategori")
      .then((res) => {
        const kategories = res.data.data;
        this.setState({ kategories });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  toggleBurgerMenu = () => {
    this.setState((prevState) => ({
      burgerMenuActive: !prevState.burgerMenuActive, // Toggle burger menu
    }));
  };

  getIcon = (kategori) => {
    switch (kategori.toLowerCase()) {
      case "makanan":
        return <GiForkKnifeSpoon />;
      case "minuman":
        return <GiCoffeeBeans />;
      case "kosmetik":
        return <GiLiquidSoap />;
      case "sembako":
        return <GiEmptyMetalBucket />;
      default:
        return <IoCube />;
    }
  };

  render() {
    const { kategories, burgerMenuActive } = this.state;
    const { changeKategori, kategoriYangDipilih } = this.props;

    return (
      <div>
        <Col md={8} xs={12} className="mb-4" mt="2">
          {/* Tambahkan tombol burger menu */}
          <div className="is-hidden-desktop">
            <button
              className="button is-light"
              onClick={this.toggleBurgerMenu}
              aria-label="menu"
              aria-expanded={burgerMenuActive ? "true" : "false"}
            >
              <IoMenu /> {/* Ikon burger */}
            </button>
          </div>

          {/* Sidebar kategori */}
          <aside
              className={`menu1 pl-2 pr-6 has-shadow mt-0 ${
                burgerMenuActive ? "" : "is-hidden-mobile"
              }`}
              style={{ paddingTop: '20px' }} // Tambahkan padding top
            >
              <h1 className="">Daftar Kategori</h1>
              <hr />
              <ul className="menu1-list">
                {kategories &&
                  kategories.map((kategori) => (
                    <li
                      key={kategori.id_kategori}
                      className={`d-flex align-items-center ${kategoriYangDipilih === kategori.nama_kategori ? "item-sidebar" : ""}`}
                      onClick={() => changeKategori(kategori.nama_kategori)}
                      style={{ cursor: "pointer" }}
                    >
                      <span className="icon">{this.getIcon(kategori.nama_kategori)}</span>
                      <span className="ml-2">{kategori.nama_kategori}</span>
                    </li>
                  ))}
              </ul>
            </aside>


        </Col>
      </div>
    );
  }
}
