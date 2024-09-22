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
      .get(API_URL + "produk?kategori.nama_kategori=" + this.state.kategoriYangDipilih)
      .then((res) => {
        // console.log("Response : ", res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });

    this.getListKeranjang();
  }

  // componentDidUpdate(prevState) {
  //   if (this.state.keranjang !== prevState.keranjang) {
  //     axios
  //       .get(API_URL + "keranjang")
  //       .then((res) => {
  //         // console.log("Response : ");
  //         const keranjang = res.data;
  //         this.setState({ keranjang });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }

  getListKeranjang =() => {
    axios
      .get(API_URL + "keranjang")
      .then((res) => {
        // console.log("Response : ", res);
        const keranjang = res.data;
        this.setState({ keranjang });
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
        console.log("Response : ", res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      }); 
  };

  pilihMember = (id_member) => {
    // console.log("Member terpilih:", id_member);
    this.setState({ id_member });
  
    // Update semua item di keranjang dengan ID member yang baru dipilih
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
  
  masukKeranjang = (value) => {
    console.log("Memproses produk:", value);
    console.log("ID Member yang dipilih:", this.state.id_member); // Log ID Member sebelum memproses


    axios
      .get(API_URL + "keranjang?produk.id_produk=" + value.id_produk)
      .then((res) => {
        
        console.log("Data keranjang yang diterima:", res.data);

        if (res.data.length === 0) {
          console.log("Produk belum ada di keranjang. Menambahkan produk...");

          const keranjang = {
            id_member: this.state.id_member || null, // Menggunakan id_member yang dipilih
            id_produk: value.id_produk, // ID produk
            kuantitas: 1, // Kuantitas produk
          };
          // console.log("Payload Keranjang:", keranjang);

          // Menambahkan produk ke keranjang
          axios
            .post(API_URL + "keranjang", keranjang)
            .then((res) => {
              this.getListKeranjang();
            //   console.log("Produk berhasil ditambahkan ke keranjang:", value.nmproduk);
            // console.log("ID Member yang dikirim:", keranjang.id_member); // Log ID Member yang dikirim dalam post
            // console.log("Respons dari server:", res.data); // Cek respons dari server
              swal({
                title: "Sukses Masuk Keranjang",
                text: "Sukses Masuk Keranjang: " + value.nmproduk,
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.error("Error saat menambahkan produk ke keranjang:", error.response ? error.response.data : error.message);
            });
        } else {
          console.log("Produk sudah ada di keranjang. Mengupdate kuantitas...");

          // const keranjang = {
          //   id_member: null,  // Kirim null jika tidak ada member
          //   produk: [
          //     {
          //       id_produk: value.id_produk,
          //       kuantitas: 1  // Kuantitas produk yang ingin ditambahkan
          //     }
          //   ]
          // };
          const keranjang = {
            id_member: this.state.id_member || null, // Sesuaikan dengan nilai sebenarnya jika ada
            id_produk: value.id_produk, // ID produk
            kuantitas: 1, // Kuantitas produk
          };
          console.log("Payload Keranjang:", keranjang);

          // Mengupdate produk di keranjang
          axios
            .put(API_URL + "keranjang/" + res.data[0].id_keranjang, keranjang)
            .then((res) => {
              console.log("Produk berhasil diupdate di keranjang:", value.nmproduk);
              console.log("ID Member yang dikirim untuk update:", keranjang.id_member); // Log ID Member yang dikirim dalam update
              swal({
                title: "Sukses Masuk Keranjang",
                text: "Sukses Masuk Keranjang: " + value.nmproduk,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.error("Error saat mengupdate produk di keranjang:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error saat memeriksa produk di keranjang:", error);
      });
  };

  render() {
    // console.log(this.state.menus);
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
                      <Row className="menu-wrapper">{menus && menus.map((menu) => <Menus key={menu.id_produk} menu={menu} masukKeranjang={this.masukKeranjang} />)}</Row>
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
          {/* <div className="column is-2">
          </div> */}
            
          </Container>
        </KasirLayout>
      </div>
    );
  }
}
