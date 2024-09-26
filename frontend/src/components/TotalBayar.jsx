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
    };

    // Log seluruh objek transaksi sebelum request
    console.log("Transaksi data yang dikirim:", transaksi);

    axios
      .post(API_URL + "transaksi", transaksi)
      .then((res) => {
        // Berhasil mengirim transaksi dan detail transaksi
        const id_transaksi = res.data.transaksi.id_transaksi; // Ambil id_transaksi dari respons server
        
        console.log("ID Transaksi:", id_transaksi); // Pastikan ini valid
        
        const detailTransaksi = this.props.keranjang.map((item) => ({
          id_transaksi: id_transaksi, // Pastikan ini terisi dengan benar
          id_produk: item.produk.id_produk,
          kuantitas: item.kuantitas,
          total_harga: item.total_harga,
          nmproduk: item.produk.nmproduk,
          harga_produk: item.produk.harga_jual,
          catatan: item.catatan,
        }));
      
        console.log("Detail Transaksi yang dikirim:", detailTransaksi); // Cek ini sebelum dikirim
      
        return axios.post(API_URL + "detailtransaksi", detailTransaksi);
      })
      .then((res) => {
        // Cek respons dari server setelah mengirim detail transaksi
        console.log("Respons dari detail transaksi:", res.data); // Lihat respons
        this.props.navigate("/sukses");
      })
      .catch((error) => {
        console.error("Error while creating transaction or detail:", error.response?.data || error.message);
      });
      
  };

  render() {
    return (
<div className="fixed-bottom">
        <h3><strong className="text-black">Total Pembayaran : </strong>
        </h3>
        <div className="total-bayar">
          Rp {numberWithCommas(this.state.total_bayar)}
        </div>

        <form onSubmit={this.submitTotalBayar}>

        <div className="form-group">
            <label className="form-label" htmlFor="id_kasir">
              Id Kasir:
            </label>
            <input
               type="text"
               name="id_user"
               value={this.state.id_user}
               onChange={this.handleInputChange}
               placeholder="Masukkan id_user"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="nama_lengkap">
              Nama Lengkap Kasir:
            </label>
            <input
               type="text"
               name="nama_lengkap"
               value={this.state.nama_lengkap}
               onChange={this.handleInputChange}
               placeholder="Masukkan nama lengkap"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="bayar">
              Bayar:
            </label>
            <input
              type="number"
              className="form-control"
              name="bayar"
              value={this.state.bayar}
              onChange={this.handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="potongan">
              Potongan:
            </label>
            <input
              type="number"
              className="form-control"
              name="potongan"
              value={this.state.potongan}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="metode_bayar">
              Metode Pembayaran:
            </label>
            <select
              name="metode_bayar"
              className="form-control"
              value={this.state.metode_bayar}
              onChange={this.handleInputChange}
              required
            >
              <option value="" disabled>
                Pilih Metode
              </option>
              <option value="cash">Cash</option>
              <option value="kartu">Kartu</option>
              <option value="transfer">Transfer</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="tanggal">
              Tanggal Transaksi:
            </label>
            <input
              type="date"
              className="form-control"
              name="tanggal"
              value={this.state.tanggal}
              onChange={this.handleInputChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    );
  }
}



