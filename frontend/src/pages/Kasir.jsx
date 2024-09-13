import React, { Component } from "react";
import KasirLayout from "./KasirLayout";
import Menus from "../components/Menus";
import KasirList from "../components/KasirList";
import KasirHasil from "../components/KasirHasil";
import { Row, Container, Col } from "react-bootstrap";
import { API_URL } from "../features/constants";
import axios from "axios";
import swal from "sweetalert";

export default class Kasir extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      kategoriYangDipilih: "Minuman",
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "produk?kategori.nama_kategori=" + this.state.kategoriYangDipilih)
      .then((res) => {
        // console.log("Response : ", res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeKategori = (value) => {
    this.setState({
      kategoriYangDipilih: value,
      menus: [],
    });
    axios
      .get(API_URL + "produk?kategori.nama_kategori=" + value)
      .then((res) => {
        // console.log("Response : ", res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  masukKeranjang = (value) => {
    // console.log("menu :", value);
    // const keranjang = {
    //   id_produk: value.id_produk, // Pastikan field ini ada
    //   id_member: null, // Ganti dengan id_member yang sesuai jika ada
    //   kuantitas: 1, // Mengganti jumlah
    //   total_bayar: value.harga,
    // };

    const keranjang = {
      jumlah: 1,
      total_harga: value.harga,
      produk: value,
    };
    // console.log("menu :", value);
    axios
      .post(API_URL + "keranjang", keranjang)
      .then((res) => {
        // console.log("Response : ", res);
        swal({
          title: "Sukses Masuk Keranjang",
          text: "Sukses Masuk Keranjang" + keranjang.produk.nmproduk,
          icon: "success",
          button: false,
        });
        // const menus = res.data;
        // this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    // console.log(this.state.menus);
    const { menus, kategoriYangDipilih } = this.state;
    return (
      <div>
        <KasirLayout>
          <Container fluid className="mt-3">
            <div class="columns">
              <div class="column is-8">
                <p class="bd-notification is-primary">
                  <div class="cell">
                    <Col>
                      <h2 className="text-black">Daftar Menu</h2>
                      <hr />
                      <Row className="menu-wrapper">
                        {/* <KasirList /> */}
                        {menus && menus.map((menu) => <Menus key={menu.id_produk} menu={menu} masukKeranjang={this.masukKeranjang} />)}
                      </Row>
                    </Col>
                  </div>
                </p>
              </div>
              <div class="column">
                <p class="bd-notification is-primary">
                  <div class="cell">
                    <Col>
                      <KasirHasil />
                    </Col>
                  </div>
                </p>
              </div>
            </div>
          </Container>
        </KasirLayout>
      </div>
    );
  }
}
