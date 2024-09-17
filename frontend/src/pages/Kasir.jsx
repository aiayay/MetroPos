import React, { Component } from "react";
import KasirLayout from "./KasirLayout";
import Menus from "../components/Menus";
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
    // this.getListKeranjang(); // Pastikan keranjang diperbarui saat komponen dimuat
    axios
      .get(API_URL + "produk?kategori.nama_kategori=" + this.state.kategoriYangDipilih)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // getListKeranjang = () => {
  //   axios
  //     .get(API_URL + "keranjang")
  //     .then((res) => {
  //       const keranjangs = res.data;
  //       this.setState({ keranjangs });
  //     })
  //     .catch((error) => {
  //       console.log("Error getting keranjang", error);
  //     });
  // };

  changeKategori = (value) => {
    this.setState({
      kategoriYangDipilih: value,
      menus: [],
    });
    axios
      .get(API_URL + "produk?kategori.nama_kategori=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  masukKeranjang = async (value) => {
    console.log("Menu :", value);
    try {
      const res = await axios.get(API_URL + "keranjang?produk.id_produk=" + value.id_produk);
      if (res.data.length === 0) {
        // Data keranjang tidak ada, buat keranjang baru
        const keranjang = {
          id_member: null,
          produk: [
            {
              id_produk: value.id_produk,
              kuantitas: 1,
            },
          ],
        };
        await axios.post(API_URL + "keranjang", keranjang);
        swal({
          title: "Sukses Masuk Keranjang",
          text: "Sukses Masuk Keranjang: " + value.nmproduk,
          icon: "success",
          button: false,
        });
  
        // Perbarui daftar keranjang
        this.getListKeranjang();
      } 
    } catch (error) {
      console.log("Error:", error);
    }
  };
  
      // else {
      //   const existingKeranjang = res.data[0];
      //   const updatedKeranjang = {
      //     produk: [
      //       {
      //         id_produk: value.id_produk,
      //         kuantitas: 1,
      //       },
      //     ],
      //   };

        // axios
        //   .put(API_URL + "keranjang/" + existingKeranjang.id_keranjang, updatedKeranjang)
        //   .then((res) => {
        //     swal({
        //       title: "Sukses Memperbarui Keranjang",
        //       text: "Sukses Memperbarui Keranjang: " + value.nmproduk,
        //       icon: "success",
        //       button: false,
        //     });
        //   })
        //   .catch((error) => {
        //     console.log("Error during PUT request:", error.response.data);
        //   });
      // }
//     })
//     .catch((error) => {
//       console.log("Error during GET request:", error);
//     });
// };

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
