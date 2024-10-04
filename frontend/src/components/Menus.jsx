import React from "react";
import { numberWithCommas } from "../features/utils";
import { Row, Col, Card } from "react-bootstrap";
import "../index.css";

const Menus = ({ menu, masukKeranjang }) => {
  return (
    <Col md={4} xs={6} className="mb-4">
      <Card className="shadow" style={{ width: "18rem" }} onClick={() => masukKeranjang(menu)}>
        {/* Menampilkan gambar produk dari URL foto_produk */}
        {menu.foto_produk && (
          <Card.Img
            variant="top"
            src={menu.foto_produk} // Menggunakan foto_produk dari database
            />
        )}
        <Card.Body>
          <Card.Title>{menu.nmproduk}</Card.Title>
          <Card.Text>Rp. {numberWithCommas(menu.harga_jual)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
