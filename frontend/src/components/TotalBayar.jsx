import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { numberWithCommas } from "../features/utils";
import axios from "axios";
import { API_URL } from "../features/constants";

export default class TotalBayar extends Component {

  submitTotalBayar = (totalBayar) => {
    // Data untuk transaksi
    const transaksi = {
      total_bayar: totalBayar,
    };
  
    // Kirim data transaksi terlebih dahulu
    axios.post(API_URL + "transaksi", transaksi)
      .then((res) => {
        const id_transaksi = res.data.id_transaksi; // Asumsi ID transaksi dikembalikan dari API
  
        // Kirim detail transaksi
        const detailTransaksiPromises = this.props.keranjang.map((item) => {
          const detailTransaksi = {
            id_transaksi: id_transaksi,
            id_produk: item.produk.id_produk,
            kuantitas: item.kuantitas,
            total_harga: item.total_harga,
          };
  
          return axios.post(API_URL + "detail-transaksi", detailTransaksi);
        });
  
        // Tunggu sampai semua detail transaksi berhasil terkirim
        Promise.all(detailTransaksiPromises)
          .then(() => {
            this.props.history.push("/sukses");
          })
          .catch((error) => {
            console.error("Gagal mengirim detail transaksi:", error.response ? error.response.data : error.message);
          });
      })
      .catch((error) => {
        console.error("Gagal mengirim transaksi:", error.response ? error.response.data : error.message);
      });
  }
  
  render() {
    const totalBayar = this.props.keranjang.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);
    return (
      <>
      {/* web */}
      <div className="fixed-buttom">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h4 className="text-black">
              Total Bayar : <strong className="text-black">Rp. {numberWithCommas(totalBayar)}</strong>
            </h4>
            <button variant="primary" className="mb- mt-4 mr-2" size="lg" onClick={() => this.submitTotalBayar(totalBayar)}>
              <strong className="text-black">Bayar</strong>
            </button>
          </Col>
        </Row>
      </div>
      {/* mobile */}
      {/* <div className="">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h4 className="text-black">
              Total Bayar : <strong className="text-black">Rp. {numberWithCommas(totalBayar)}</strong>
            </h4>
            <button variant="primary" className="mb- mt-4 mr-2" size="lg" onClick={() => this.submitTotalBayar(totalBayar)}>
              <strong className="text-black">Bayar</strong>
            </button>
          </Col>
        </Row>
      </div> */}
      </>
    );
  }
}
