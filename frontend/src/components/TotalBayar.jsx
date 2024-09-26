import React, { Component } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { numberWithCommas } from "../features/utils";
import axios from "axios";
import { API_URL } from "../features/constants";

export default class TotalBayar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_user: "",
      nama_lengkap: "",
      potongan: 0,
      bayar: 0,
      tanggal: "",
      metode_bayar: "",
      total_bayar: 0,
    };
  }

  // Update state saat input berubah
  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // Hitung total bayar
  calculateTotalBayar = () => {
    const totalBayar = this.props.keranjang.reduce((result, item) => {
      return result + item.total_harga;
    }, 0);
    return totalBayar;
  };

  // Mengupdate total bayar saat component di-mount
  componentDidMount() {
    const totalBayar = this.calculateTotalBayar();
    this.setState({ total_bayar: totalBayar });
  }

  // Mengupdate total bayar jika keranjang berubah
  componentDidUpdate(prevProps) {
    if (prevProps.keranjang !== this.props.keranjang) {
      const totalBayar = this.calculateTotalBayar();
      this.setState({ total_bayar: totalBayar });
    }
  }

  // Submit transaksi
  submitTotalBayar = (event) => {
    event.preventDefault(); // Mencegah halaman reload

    const id_member = this.props.keranjang[0]?.member?.id_member || null;

    const transaksi = {
      id_member: id_member,
      id_user: this.state.id_user,
      nama_kasir: this.state.nama_lengkap,
      nama_member: this.props.keranjang[0]?.member?.nama_member || "Umum",
      total_bayar: this.state.total_bayar, // Nilai total_bayar dari state
      bayar: this.state.bayar,
      potongan: this.state.potongan,
      metode_bayar: this.state.metode_bayar,
      tanggal: this.state.tanggal,
      detailTransaksi: this.props.keranjang,
    };

    // Log seluruh objek transaksi sebelum request
    console.log("Transaksi data yang dikirim:", transaksi);

    axios
      .post(API_URL + "transaksi", transaksi)
      .then((res) => {
        const id_transaksi = res.data.id_transaksi; // Ambil id_transaksi dari respons server
        console.log("ID Transaksi:", id_transaksi);

        const detailTransaksi = this.props.keranjang.map((item) => ({
          id_transaksi: id_transaksi,
          id_produk: item.produk.id_produk,
          kuantitas: item.kuantitas,
          total_harga: item.total_harga,
          nmproduk: item.produk.nmproduk,
          harga_produk: item.produk.harga_jual,
          catatan: item.catatan,
        }));

        console.log(detailTransaksi);

        return axios.post(API_URL + "detailtransaksi", detailTransaksi);
      })
      .then((res) => {
        // Berhasil mengirim transaksi dan detail transaksi
        this.props.navigate("/sukses");
      })
      .catch((error) => {
        console.error("Error while creating transaction or detail:", error.response?.data || error.message);
      });
  };

  render() {
    return (
      <>
        <div className="fixed-bottom">
          <Row>
            <Form onSubmit={this.submitTotalBayar}>
              <Col md={{ span: 3, offset: 9 }} className="px-4">
                <h4 className="text-black">
                  Total Bayar:
                  <strong className="text-black">Rp. {numberWithCommas(this.state.total_bayar)}</strong>
                </h4>

                <Form.Group controlId="id_user">
                  <Form.Label>ID Kasir</Form.Label>
                  <Form.Control
                    type="text"
                    name="id_user"
                    value={this.state.id_user}
                    onChange={this.handleInputChange}
                    placeholder="Masukkan id_user"
                  />
                </Form.Group>

                <Form.Group controlId="nama_lengkap">
                  <Form.Label>Nama Kasir</Form.Label>
                  <Form.Control
                    type="text"
                    name="nama_lengkap"
                    value={this.state.nama_lengkap}
                    onChange={this.handleInputChange}
                    placeholder="Masukkan Nama Kasir"
                  />
                </Form.Group>

                <Form.Group controlId="potongan">
                  <Form.Label>Potongan</Form.Label>
                  <Form.Control
                    type="number"
                    name="potongan"
                    value={this.state.potongan}
                    onChange={this.handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="bayar">
                  <Form.Label>Bayar</Form.Label>
                  <Form.Control
                    type="number"
                    name="bayar"
                    value={this.state.bayar}
                    onChange={this.handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="tanggal">
                  <Form.Label>Tanggal</Form.Label>
                  <Form.Control
                    type="date"
                    name="tanggal"
                    value={this.state.tanggal}
                    onChange={this.handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="metode_bayar">
                  <Form.Label>Metode Pembayaran</Form.Label>
                  <Form.Control
                    as="select"
                    name="metode_bayar"
                    value={this.state.metode_bayar}
                    onChange={this.handleInputChange}
                  >
                    <option value="">Pilih Metode</option>
                    <option value="cash">Cash</option>
                    <option value="debit">Debit</option>
                    <option value="kredit">Kredit</option>
                  </Form.Control>
                </Form.Group>

                <button type="submit" className="mb-4 mt-4 mr-2 btn btn-primary btn-lg">
                  <strong className="text-black">Bayar</strong>
                </button>
              </Col>
            </Form>
          </Row>
        </div>
      </>
    );
  }
}
