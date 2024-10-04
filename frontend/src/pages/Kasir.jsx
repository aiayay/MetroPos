import React, { Component } from "react";
import KasirLayout from "./KasirLayout";
import Menus from "../components/Menus";
import KasirList from "../components/KasirList";
import KasirHasil from "../components/KasirHasil";
import { Row, Container, Col } from "react-bootstrap";
import { API_URL } from "../features/constants";
import axios from "axios";
import swal from "sweetalert";
import KasirNavbarBawah from "../components/KasirNavbarBawah";
import KasirSidebar from "../components/KasirSidebar";

export default class Kasir extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      kategoriYangDipilih: "Minuman",
      keranjang: [],
      id_member: null, // Tambahkan state id_member
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "produk/kategori/" + encodeURIComponent(this.state.kategoriYangDipilih))
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });

    this.getListKeranjang();
  }

  getListKeranjang = () => {
    axios
      .get(API_URL + "keranjang")
      .then((res) => {
        const keranjang = res.data;
        this.setState({ keranjang });
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
    axios
      .get(API_URL + "produk/kategori/" + encodeURIComponent(value))
      .then((res) => {
        console.log("Response : ", res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  pilihMember = (id_member) => {
    this.setState({ id_member });

    axios
      .get(API_URL + "keranjang")
      .then((res) => {
        const keranjangItems = res.data;

        keranjangItems.forEach((item) => {
          const updatedKeranjang = {
            ...item,
            id_member: id_member, // Assign member baru ke setiap item
          };

          axios
            .put(API_URL + "keranjang/" + item.id_keranjang, updatedKeranjang)
            .then((res) => {
              console.log("Keranjang berhasil diupdate dengan member:", id_member);
            })
            .catch((error) => {
              console.error("Error saat mengupdate keranjang:", error);
            });
        });
      })
      .catch((error) => {
        console.error("Error saat mengambil data keranjang:", error);
      });
  };

  masukKeranjang = async (value) => {
    try {
      const res = await axios.get(API_URL + "keranjang?produk.id_produk=" + value.id_produk);
      const produkDiKeranjang = res.data.find(item => item.id_produk === value.id_produk);

      if (!produkDiKeranjang) {
        const keranjang = {
          id_member: this.state.id_member || null,
          id_produk: value.id_produk,
          kuantitas: 1,
        };
        await axios.post(API_URL + "keranjang", keranjang);
        this.getListKeranjang();
        swal({
          title: "Sukses Masuk Keranjang",
          text: "Sukses Masuk Keranjang: " + value.nmproduk,
          button: false,
          timer: 1500,
        });
      } 
      // else {
      //   const keranjangUpdate = {
      //     id_member: this.state.id_member || null,
      //     id_produk: value.id_produk,
      //     kuantitas: produkDiKeranjang.kuantitas + 1,
      //   };
      //   await axios.put(API_URL + "keranjang/" + produkDiKeranjang.id_keranjang, keranjangUpdate);
      //   swal({
      //     title: "Sukses Masuk Keranjang",
      //     text: "Sukses Masuk Keranjang: " + value.nmproduk,
      //     icon: "success",
      //     button: false,
      //     timer: 1500,
      //   });
      // }
    } catch (error) {
      console.error("Error saat memproses keranjang:", error);
    }
  };

  render() {
    const { menus, kategoriYangDipilih, keranjang } = this.state;
    return (
      <div>
        <KasirLayout>
          <KasirNavbarBawah pilihMember={this.pilihMember} /> {/* Tambahkan prop pilihMember */}
          <Container fluid className="mt-3">
            <Row>
              <div className="columns">
                <KasirSidebar changeKategori={this.changeKategori} kategoriYangDipilih={kategoriYangDipilih} />
                <div className="column is-6">
                  <div className="bd-notification is-primary">
                    <div className="cell">
                      <Col>
                        <h2 className="text-black">Daftar Menu</h2>
                        <hr />
                        <Row className="menu-wrapper">
                          {menus && menus.map((menu) => (
                            <Menus key={menu.id_produk} menu={menu} masukKeranjang={this.masukKeranjang} />
                          ))}
                        </Row>
                      </Col>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="bd-notification is-primary">
                    <div className="cell">
                      <Col>
                        <KasirHasil keranjang={keranjang} {...this.props} getListKeranjang={this.getListKeranjang} />
                      </Col>
                    </div>
                  </div>
                </div>
              </div>
            </Row>
          </Container>
        </KasirLayout>
      </div>
    );
  }
}
