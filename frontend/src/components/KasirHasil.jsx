import React, { Component } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";

const KasirHasil = () => {
  return (
    <div>
      <Col md={6} mt="2">
        <div className="keranjang-wrapper">
          <h2>Keranjang</h2>
          <hr />
          <p>Tanggal : 04/09/2024</p>
          <p>Kasir : Aini</p>
          <p>Kode Transaksi : 085265</p>
          <p>Member : Aini</p>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col xs={2}>
                  <h4>
                    <Badge pill variant="success"></Badge>
                  </h4>
                </Col>
                <Col>
                  <h4>Sabun Mandi Harmony</h4>
                  <p>Rp.4000</p>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col xs={2}>
                  <h4>
                    <Badge pill variant="success"></Badge>
                  </h4>
                </Col>
                <Col>
                  <h4>Milo 1 kg</h4>
                  <p>Rp.4000</p>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col xs={2}>
                  <h4>
                    <Badge pill variant="success"></Badge>
                  </h4>
                </Col>
                <Col>
                  <h4>Aqua Besar 1L</h4>
                  <p>Rp.4000</p>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col xs={2}>
                  <h4>
                    <Badge pill variant="success"></Badge>
                  </h4>
                </Col>
                <Col>
                  <h4>Mie Indomie</h4>
                  <p>Rp.4000</p>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
          <p>Total Bayar</p>
          <p>Disc Member</p>
          <p>Catatan</p>
          <p>Tunai</p>
          <p>Kembali</p>
          <p>Metode Bayar</p>
          <button>Proses Pembayaran</button>
        </div>
      </Col>
    </div>
  );
};

export default KasirHasil;
