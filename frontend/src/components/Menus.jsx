import React from "react";
import { Col, Card } from "react-bootstrap";
import { numberWithCommas } from "../features/utils"; // Pastikan utilitas ini diimpor dengan benar
import "../index.css";

const Menus = ({ menu, masukKeranjang }) => {
  return (
    <Col md={4} xs={6} className="mb-4"> {/* md={4} untuk 3 kartu di layar besar, xs={6} untuk 2 kartu di layar kecil */}
      <Card 
        className="shadow" 
        onClick={() => masukKeranjang(menu)} 
        style={{ borderRadius: "15px", overflow: "hidden" }} // Tambahkan overflow untuk memastikan isi kartu sesuai dengan border radius
      >
        {menu.foto_produk && (
          <Card.Img
            variant="top"
            src={menu.foto_produk}
            style={{ 
              height: "150px", // Perkecil tinggi gambar menjadi 150px
              width: "100%", // Perkecil lebar gambar menjadi 80% dari container
              objectFit: "cover", // Menjaga proporsi gambar
              margin: "0 auto" // Untuk memusatkan gambar
            }}
          />
        )}
        <Card.Body style={{ borderRadius: "0 0 15px 15px" }}> {/* Bagian bawah kartu juga melengkung */}
          <Card.Title>{menu.nmproduk}</Card.Title>
          <Card.Text>Rp. {numberWithCommas(menu.harga_jual)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
