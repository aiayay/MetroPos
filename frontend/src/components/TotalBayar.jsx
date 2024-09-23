import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { numberWithCommas } from "../features/utils";
import axios from "axios";
import { API_URL } from "../features/constants";

export default class TotalBayar extends Component {

  submitTotalBayar = (totalBayar) =>{
    const transaksi = {
      total_bayar: totalBayar,
      menus: this.props.keranjang
    }
    axios.post(API_URL+"transaksi",transaksi).then((res) =>{
      this.props.history.push("/sukses")
    })
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
              Total Harga : <strong className="text-black">Rp. {numberWithCommas(totalBayar)}</strong>
            </h4>
            <button variant="primary" className="mb- mt-4 mr-2" size="lg" onClick={() => this.submitTotalBayar(totalBayar)}>
              <strong className="text-black">Bayar</strong>
            </button>
          </Col>
        </Row>
      </div>
      {/* mobile */}
      <div className="">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h4 className="text-black">
              Total Harga : <strong className="text-black">Rp. {numberWithCommas(totalBayar)}</strong>
            </h4>
            <button variant="primary" className="mb- mt-4 mr-2" size="lg" onClick={() => this.submitTotalBayar(totalBayar)}>
              <strong className="text-black">Bayar</strong>
            </button>
          </Col>
        </Row>
      </div>
      </>
    );
  }
}
