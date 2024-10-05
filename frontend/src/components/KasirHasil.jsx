import React, { Component } from "react";
import { Badge, Col, ListGroup, Row, Card } from "react-bootstrap";
import { numberWithCommas } from "../features/utils";
import TotalBayar from "./TotalBayar";
import ModalKeranjang from "./ModalKeranjang";
import { API_URL } from "../features/constants";
import axios from "axios";
import swal from "sweetalert";

export default class KasirHasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }

  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      kuantitas: menuKeranjang.kuantitas,
      catatan: menuKeranjang.catatan,
      totalHarga: menuKeranjang.total_harga,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambah = () => {
    this.setState({
      kuantitas: this.state.kuantitas + 1,
      totalHarga: this.state.keranjangDetail.produk.harga_jual * (this.state.kuantitas + 1),
    });
  };

  kurang = () => {
    if (this.state.kuantitas !== 1) {
      this.setState({
        kuantitas: this.state.kuantitas - 1,
        totalHarga: this.state.keranjangDetail.produk.harga_jual * (this.state.kuantitas - 1),
      });
    }
  };

  changeHandler = (event) => {
    this.setState({
      catatan: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.handleClose();
    const data = {
      id_member: null, // Sesuaikan dengan nilai sebenarnya jika ada
      id_produk: this.state.keranjangDetail.produk.id_produk, // Pastikan hanya mengirim ID produk
      kuantitas: this.state.kuantitas, // Kuantitas produk
      total_harga: this.state.totalHarga,
      catatan: this.state.catatan,
    };

    axios
      .put(API_URL + "keranjang/" + this.state.keranjangDetail.id_keranjang, data)
      .then((res) => {
        this.props.getListKeranjang();
        swal({
          title: "Update Pesanan!",
          text: "Sukses Update Pesanan: " + this.state.keranjangDetail.produk.nmproduk, // Akses nama produk yang di-update
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("Error saat menambahkan produk ke keranjang:", error.response ? error.response.data : error.message);
      });
  };

  hapusPesanan = (id) => {
    this.handleClose();

    axios
      .delete(API_URL + "keranjang/" + this.state.keranjangDetail.id_keranjang)
      .then((res) => {
        this.props.getListKeranjang();
        swal({
          title: "Hapus Pesanan!",
          text: "Sukses Hapus Pesanan: " + this.state.keranjangDetail.produk.nmproduk,
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("Error saat menambahkan produk ke keranjang:", error.response ? error.response.data : error.message);
      });
  };

  render() {
    const { keranjang } = this.props;
    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
    
    // Ambil data member dari keranjang pertama (jika ada)
   // Ambil data member dari keranjang pertama (jika ada dan tidak null)
   const namaKasir = localStorage.getItem("nama_kasir") || "Nama kasir tidak tersedia";
   console.log(namaKasir);
   const namaMember = keranjang.length > 0 && keranjang[0].member ? keranjang[0].member.nama_member : "Tidak ada member";

    return (
      <div>
        <Col md={6} mt="2">
          <div className="keranjang-wrapper">
            <h2 className="text-black">Keranjang</h2>
            <hr />
            {keranjang.length !== 0 && (
              <Card className="overflow-auto hasil">
                <ListGroup variant="flush">
                  {/* Informasi Member di luar looping */}
                  <p className="text-black">Tanggal : {today}</p>
                  <p className="text-black">Nama Kasir : {namaKasir}</p>
                  <p className="text-black">Member : {namaMember}</p>
                  <hr />
                  
                  {/* Looping untuk daftar menu */}
                  {keranjang.map((menuKeranjang) => (
                    <ListGroup.Item key={menuKeranjang.id_keranjang} onClick={() => this.handleShow(menuKeranjang)}>
                      <Row>
                      <Col xs={2}>
  <h4 className="text-black">
    <span className="tag is-success is-rounded">
      {menuKeranjang.kuantitas}
    </span>
  </h4>
</Col>

                        <Col>
                          <h5 className="text-black">{menuKeranjang.produk.nmproduk}</h5>
                          <p className="text-black">Rp. {numberWithCommas(menuKeranjang.produk.harga_jual)}</p>
                        </Col>
                        <Col>
                          <strong className="text-black">Rp. {numberWithCommas(menuKeranjang.total_harga)}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}

                  <ModalKeranjang handleClose={this.handleClose} {...this.state} tambah={this.tambah} kurang={this.kurang} changeHandler={this.changeHandler} handleSubmit={this.handleSubmit} hapusPesanan={this.hapusPesanan} />
                </ListGroup>
              </Card>
            )}
            {/* <hr /> */}

            <TotalBayar keranjang={keranjang} tanggal={today} />

          </div>
        </Col>
      </div>
    );
  }
}