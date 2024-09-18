import React from "react";
import { numberWithCommas } from "../features/utils";
import { Row, Col, Card } from "react-bootstrap";
import "../index.css";

const Menus = ({ menu, masukKeranjang }) => {
  const handleClick = () => {
    masukKeranjang(menu);
  };

  return (
    <div>
      <Col md={8} xs={12} className="mb-4 mr-4">
        <Card className="flex-container" onClick={handleClick}>
          <Card.Img variant="top" src={"assets/images/" + menu.kategori.nama_kategori.toLowerCase() + "/" + menu.foto_produk} width="200px" />
          <Card.Body className="card-body">
            <Card.Title>
              <strong>{menu.nmproduk}</strong>
            </Card.Title>
            <Card.Text>Rp. {numberWithCommas(menu.harga_jual)}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};

export default Menus;
