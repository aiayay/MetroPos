import React, { Component } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../features/utils";
import TotalBayar from "./TotalBayar";

export default class KasirHasil extends Component {
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
                  <ListGroup.Item key={menuKeranjang.id_keranjang}>
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
              </ListGroup>
            )}
            <hr />

            <TotalBayar keranjang={keranjang} {...this.props}  />

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
