import React, { Component } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
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
    //erro nih update data nya
    event.preventDefault();

    this.handleClose();
    const data = {
      id_member: null, // Sesuaikan dengan nilai sebenarnya jika ada
      id_produk: this.state.keranjangDetail.produk.id_produk, // Pastikan hanya mengirim ID produk
      kuantitas: this.state.kuantitas, // Kuantitas produk
      total_harga: this.state.totalHarga,
      catatan: this.state.catatan,
    };
    // console.log("Payload Keranjang:", keranjang);

    // Menambahkan produk ke keranjang
    axios
      .put(API_URL + "keranjang/" + this.state.keranjangDetail.id_keranjang, data)
      .then((res) => {
        console.log("Produk berhasil ditambahkan ke keranjang:", res.data.nmproduk);
        swal({
          title: "Update Pesanan!",
          text: "Sukses Update Pesanan: " + data.id_produk.nmproduk,
          // icon: success,
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("Error saat menambahkan produk ke keranjang:", error.response ? error.response.data : error.message);
      });
  };

  hapusPesanan = (id) => {
    //erro nih update data nya

    this.handleClose();

    // console.log("Payload Keranjang:", keranjang);

    // Menambahkan produk ke keranjang
    axios
      .delete(API_URL + "keranjang/" + this.state.keranjangDetail.id_keranjang)

      .then((res) => {
        console.log("Produk berhasil ditambahkan ke keranjang:", res.data.nmproduk);
        swal({
          title: "Hapus Pesanan!",
          text: "Sukses Hapus Pesanan: " + this.state.keranjangDetail.produk.nmproduk,
          // icon: error,
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
    return (
      <div>
        <Col md={6} mt="2">
          <div className="keranjang-wrapper">
            <h2 className="text-black">Keranjang</h2>
            <hr />
            <p className="text-black">Tanggal : 04/09/2024</p>
            <p className="text-black">Kasir : Aini</p>
            <p className="text-black">Kode Transaksi : 085265</p>
            <p className="text-black">Member : Aini</p>
            <hr />
            {keranjang.length !== 0 && (
              <ListGroup variant="flush">
                {keranjang.map((menuKeranjang) => (
                  <ListGroup.Item key={menuKeranjang.id_keranjang} onClick={() => this.handleShow(menuKeranjang)}>
                    <Row>
                      <Col xs={2}>
                        <h4 className="text-black">
                          <Badge pill variant="success">
                            {menuKeranjang.kuantitas}
                          </Badge>
                        </h4>
                      </Col>
                      <Col>
                        <h5 className="text-black">{menuKeranjang.produk.nmproduk}</h5>
                        <p className="text-black">Rp. {numberWithCommas(menuKeranjang.produk.harga_jual)}</p>
                      </Col>
                      <Col>
                        <strong className="float-right"></strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}

                <ModalKeranjang handleClose={this.handleClose} {...this.state} tambah={this.tambah} kurang={this.kurang} changeHandler={this.changeHandler} handleSubmit={this.handleSubmit} hapusPesanan={this.hapusPesanan} />
              </ListGroup>
            )}
            <hr />

            <TotalBayar keranjang={keranjang} {...this.props} />

            {/* <p className="text-black">Total Bayar</p>
            <p className="text-black">Disc Member</p>
            <p className="text-black">Catatan</p>
            <p className="text-black">Tunai</p>
            <p className="text-black">Kembali</p>
            <p className="text-black">Metode Bayar</p>
            <button type="submit" className="button is-success">
              Proses Pembayaran
            </button> */}
          </div>
        </Col>
      </div>
    );
  }
}
