import React from "react";
import { numberWithCommas } from "../features/utils";
import { Row, Col, Card } from "react-bootstrap";
import "../index.css";


const Menus = ({ menu, masukKeranjang }) => {
  return (
    <Col md={4} xs={6} className="mb-4">
      <Card className="shadow" style={{ width: "18rem" }} onClick={() => masukKeranjang(menu)}>
        {/* <Card.Img variant="top" src={"assets/images/" + menu.kategori.nama_kategori.toLowerCase() + "/" + menu.produk.foto_produk} /> */}
        <Card.Body>
          <Card.Title>
            {menu.nmproduk}
          </Card.Title>
          <Card.Text>Rp. {numberWithCommas(menu.harga_jual)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};
export default Menus;
