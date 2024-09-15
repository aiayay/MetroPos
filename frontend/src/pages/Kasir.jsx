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

  masukKeranjang = async (value) => {
    const keranjang = {
      id_produk: value.id_produk,
      kuantitas: 1,
      total_bayar: value.harga_jual,
      id_member: null,  // Kirim null jika tidak ada member
    };
  
    try {
      await axios.post(API_URL + "keranjang", keranjang);
      swal({
        title: "Sukses Masuk Keranjang",
        text: "Sukses Masuk Keranjang: " + value.nmproduk,
        icon: "success",
        button: false,
      });
    } catch (error) {
      console.error("Error Data:", error.response ? error.response.data : error.message);
      swal({
        title: "Terjadi Kesalahan",
        text: "Gagal menambahkan ke keranjang. Silakan coba lagi.",
        icon: "error",
        button: false,
      });
    }
  };
  

  render() {
    const { menus } = this.state;
    return (
      <div>
        <KasirLayout>
          <Container fluid className="mt-3">
            <div className="columns">
              <div className="column is-8">
                <div className="bd-notification is-primary">
                  <div className="cell">
                    <Col>
                      <h2 className="text-black">Daftar Menu</h2>
                      <hr />
                      <Row className="menu-wrapper">{menus && menus.map((menu) => <Menus key={menu.id_produk} menu={menu} masukKeranjang={this.masukKeranjang} />)}</Row>
                    </Col>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="bd-notification is-primary">
                  <div className="cell">
                    <Col>
                      <KasirHasil />
                    </Col>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </KasirLayout>
      </div>
    );
  }
}
