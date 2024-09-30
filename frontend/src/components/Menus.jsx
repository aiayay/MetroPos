import React from "react";
import { numberWithCommas } from "../features/utils";
import { Row, Col, Card } from "react-bootstrap";
import "../index.css";


const Menus = ({ menu, masukKeranjang }) => {
  const handleClick = () => {
    // if (menu.stok > 0) {
    //   masukKeranjang(menu);
    // } else {
    //   alert("Stok habis!");
    // }
  };

  return (
    <Row className="g-3">  {/* g-3 untuk menambah gap antar kolom */}
       <div>
      <Col md={4} sm={6} xs={12} className="mb-4">
        <Card className="flex-container" onClick={handleClick}>
          {/* <Card.Img variant="top" src={menu.foto_produk + menu.kategori.nama_kategori.toLowerCase() + "/" + menu.foto_produk} width="200px" /> */}

          <Card.Img 
  variant="top" 
  src={menu.foto_produk}  // foto_produk sudah berisi URL lengkap
  alt={menu.nmproduk} 
  width="200px" 
  height="200px" 
  onError={(e) => { 
    e.target.onerror = null; 
    e.target.src = "/images/fallback-image-url.jpg"; // Gambar fallback jika tidak ditemukan
  }} 
/>



          <Card.Body className="card-body">
            <Card.Title>
              <strong className="text-black">{menu.nmproduk}</strong>
            </Card.Title>
            <Card.Text>Rp. {numberWithCommas(menu.harga_jual)}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </div>
    </Row>
   
  );
};

export default Menus;
