import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { numberWithCommas } from "../features/utils"; // Pastikan utilitas ini diimpor dengan benar
import "../index.css";

const Menus = ({ menu, masukKeranjang }) => {
  return (
    <Col md={4} xs={6} className="mb-4"> {/* md={4} untuk 3 kartu di layar besar, xs={6} untuk 2 kartu di layar kecil */}
      <Card className="shadow" onClick={() => masukKeranjang(menu)}>
        {menu.foto_produk && (
          <Card.Img
            variant="top"
            src={menu.foto_produk}
            style={{ height: "200px", objectFit: "cover" }} // Mengatur tinggi gambar agar konsisten
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

// const MenuList = ({ menus, masukKeranjang }) => {
//   return (
//     <Row>
//       {menus.map((menu) => (
//         <Menus key={menu.id_produk} menu={menu} masukKeranjang={masukKeranjang} />
//       ))}
//     </Row>
//   );
// };

// export default MenuList;
