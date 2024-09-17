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
    // this.getListKeranjang;
  }

  getListKeranjang = () => {
    axios
      .get(API_URL + "keranjangproduk")
      .then((res) => {
        // console.log("Response :", res);
        const keranjang = res.data;
        this.setState({ keranjang });
      })
      .catch((error) => {
        console.log("eror disini", error);
      });
  };

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
    console.log("Menu :", value);

    axios
    .get(API_URL + "keranjang?prduk.id_produk=" + value.id_produk)
    .then((res) => {
      // console.log("Response : ", res);

      //kalau data produk tidak ada dikeranjang
     if(res.data.length === 0){
      const keranjang = {
        id_produk: value.id_produk,
        kuantitas: 1,
        id_member: null, // Kirim null jika tidak ada member
        // total_harga: value.harga,
      };
  
      axios
        .post(API_URL + "keranjang", keranjang ) // Mengirim sebagai objek produk
        .then((res) => {
          swal({
            title: "Sukses Masuk Keranjang",
            text: "Sukses Masuk Keranjang: " + keranjang.produk.nmproduk,
            icon: "success",
            button: false,
          });
        })
        .catch((error) => {
          console.log(error);
        });
     } else{
      //kalau data produk ada dikeranjang

      const keranjang = {
        id_produk: value.id_produk,
        kuantitas: res.data[0].kuantitas+1,
        id_member: null, // Kirim null jika tidak ada member
           // total_harga: res.data[0].total_harga+value.harga_jual,
      };

      //pakai put kalau misal produk nya udah ada, jdi di update aja kuantitas nya
      axios
        .put(API_URL + "keranjang/"+res.data[0].id_keranjang, keranjang ) // Mengirim sebagai objek produk
        .then((res) => {
          swal({
            title: "Sukses Masuk Keranjang",
            text: "Sukses Masuk Keranjang: " + keranjang.produk.nmproduk,
            icon: "success",
            button: false,
          });
        })
        .catch((error) => {
          console.log(error);
        });
     }


    })
    .catch((error) => {
      console.log(error);
    });

    const keranjang = {
      id_produk: value.id_produk,
      kuantitas: 1,
      id_member: null, // Kirim null jika tidak ada member
         // total_harga: value.harga,
    };

    axios
      .post(API_URL + "keranjang", { produk: keranjang }) // Mengirim sebagai objek produk
      .then((res) => {
        swal({
          title: "Sukses Masuk Keranjang",
          text: "Sukses Masuk Keranjang: " + value.nmproduk,
          icon: "success",
          button: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
