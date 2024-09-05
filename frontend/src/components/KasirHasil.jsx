import React, { Component } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";

const KasirHasil = () => {
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
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col xs={2}>
                  <h4 className="text-black">
                    <Badge pill variant="success"></Badge>
                  </h4>
                </Col>
                <Col>
                  <h4 className="text-black">Sabun Mandi Harmony</h4>
                  <p className="text-black">Rp.4000</p>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col xs={2}>
                  <h4 className="text-black">
                    <Badge pill variant="success"></Badge>
                  </h4>
                </Col>
                <Col>
                  <h4 className="text-black">Milo 1 kg</h4>
                  <p className="text-black">Rp.4000</p>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col xs={2}>
                  <h4 className="text-black">
                    <Badge pill variant="success"></Badge>
                  </h4>
                </Col>
                <Col>
                  <h4 className="text-black">Aqua Besar 1L</h4>
                  <p className="text-black">Rp.4000</p>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col xs={2}>
                  <h4 className="text-black">
                    <Badge pill variant="success"></Badge>
                  </h4>
                </Col>
                <Col>
                  <h4 className="text-black">Mie Indomie</h4>
                  <p className="text-black">Rp.4000</p>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
          <p className="text-black">Total Bayar</p>
          <p className="text-black">Disc Member</p>
          <p className="text-black">Catatan</p>
          <p className="text-black">Tunai</p>
          <p className="text-black">Kembali</p>
          <p className="text-black">Metode Bayar</p>
          <button type="submit" className="btn is-success">
            Proses Pembayaran
          </button>
        </div>
      </Col>
    </div>
  );
};

export default KasirHasil;
