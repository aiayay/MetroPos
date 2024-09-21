import React, { Component } from "react";
import KasirNavbar from "../components/KasirNavbar";
import KasirSidebar from "../components/KasirSidebar";
import KasirNavbarBawah from "../components/KasirNavbarBawah";
import { API_URL } from "../features/constants";
import axios from "axios";

export default class KasirLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      kategoriYangDipilih: "Minuman",
    };
  }

  componentDidMount() {
    this.fetchData(this.state.kategoriYangDipilih);
  }

  fetchData = (kategori) => {
    axios
      .get(API_URL + "produk?kategori.nama_kategori=" + kategori)
      .then((res) => {
        // console.log("Response : ", res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  changeKategori = (value) => {
    this.setState({
      kategoriYangDipilih: value,
      menus: [],
    });
    this.fetchData(value);
  };

  render() {
    const { kategoriYangDipilih } = this.state;
    return (
      <React.Fragment>
        <KasirNavbar />
        <div className="columns mt-6" style={{ minHeight: "100vh" }}>
          <div className="column is-2">
            <KasirSidebar changeKategori={this.changeKategori} kategoriYangDipilih={kategoriYangDipilih} />
          </div>
          <div className="column">
            {/* <KasirNavbarBawah /> */}
            <main>{this.props.children}</main>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
