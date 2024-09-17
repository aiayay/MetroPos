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
    try {
      const response = await axios.get(API_URL + "keranjang?produk.id_produk=" + value.id_produk);
  
      if (response && response.data && response.data.length === 0) {
        // Produk belum ada di keranjang, tambahkan baru
        const keranjang = {
          id_produk: value.id_produk,
          kuantitas: 1,
          total_bayar: value.harga_jual,
          id_member: null, // Kirim null jika tidak ada member
        };
  
        console.log("Produk masuk keranjang:", value.nmproduk);
        console.log("Detail keranjang:", keranjang);
  
        axios
          .post(API_URL + "keranjang", keranjang)
          .then((res) => {
            swal({
              title: "Sukses Masuk Keranjang",
              text: "Sukses Masuk Keranjang: " + value.nmproduk,
              icon: "success",
              button: false,
            });
          })
          .catch((error) => {
            console.error("Error Data:", error.response ? error.response.data : error.message);
            swal({
              title: "Terjadi Kesalahan",
              text: "Gagal menambahkan ke keranjang. Silakan coba lagi.",
              icon: "error",
              button: false,
            });
          });
      } else if (response && response.data && response.data.length > 0) {
        const keranjangSebelumnya = response.data[0];
        
        // Debug data yang diterima
        console.log("Data keranjang sebelumnya:", keranjangSebelumnya);
        console.log("Field dalam data keranjang sebelumnya:", Object.keys(keranjangSebelumnya));
  
        // Periksa jika field kuantitas dan total_bayar berada dalam objek produk
        if (keranjangSebelumnya.produk && keranjangSebelumnya.produk.length > 0) {
          const produk = keranjangSebelumnya.produk[0];
          console.log("Data produk dalam keranjang:", produk);
  
          // Pastikan produk memiliki kuantitas dan total_bayar
          const kuantitasSebelumnya = Number(produk.kuantitas || 0);
          const totalBayarSebelumnya = Number(produk.total_bayar || 0);
          const hargaJual = Number(value.harga_jual);
  
          if (isNaN(kuantitasSebelumnya) || isNaN(totalBayarSebelumnya) || isNaN(hargaJual)) {
            console.error("Nilai numerik tidak valid");
            swal({
              title: "Terjadi Kesalahan",
              text: "Data kuantitas atau total bayar tidak valid.",
              icon: "error",
              button: false,
            });
            return;
          }
  
          // Hitung kuantitas dan total bayar baru
          const kuantitasBaru = kuantitasSebelumnya + 1;
          const totalBayarBaru = totalBayarSebelumnya + hargaJual;
          
          console.log("Kuantitas baru:", kuantitasBaru);
          console.log("Total bayar baru:", totalBayarBaru);
  
          const keranjang = {
            id_produk: value.id_produk,
            kuantitas: kuantitasBaru,
            total_bayar: totalBayarBaru,
            id_member: null, // Kirim null jika tidak ada member
          };
  
          console.log("Payload yang dikirim ke PUT request:", keranjang);
  
          axios
            .put(API_URL + "keranjang/" + keranjangSebelumnya.id_keranjang, keranjang)
            .then((res) => {
              swal({
                title: "Sukses Memperbarui Keranjang",
                text: "Keranjang diperbarui: " + value.nmproduk,
                icon: "success",
                button: false,
              });
            })
            .catch((error) => {
              console.error("Error PUT:", error.response ? error.response.data : error.message);
              swal({
                title: "Terjadi Kesalahan",
                text: "Gagal memperbarui keranjang. Silakan coba lagi.",
                icon: "error",
                button: false,
              });
            });
        } else {
          console.error("Produk tidak ditemukan dalam keranjang sebelumnya.");
          swal({
            title: "Terjadi Kesalahan",
            text: "Produk tidak ditemukan dalam keranjang.",
            icon: "error",
            button: false,
          });
        }
      }
    } catch (error) {
      console.log("Error:", error);
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
