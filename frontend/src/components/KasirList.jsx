import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import "../index.css";

const KasirList = () => {
  return (
    <div>
      <h2 className="text-black">Daftar Menu</h2>
      <hr />
      <Row className="menu-wrapper">
        <Col md={8} xs={12} className="mb-4 mr-4">
          <Card className="flex-container">
            <Card.Img variant="top" src="assets/images/foto.png" width="200px" />
            <Card.Body className="card-body">
              <Card.Title>Menu 1</Card.Title>
              <Card.Text>Rp.4000</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8} xs={12} className="mb-4 mr-4">
          <Card className="flex-container">
            <Card.Img variant="top" src="assets/images/foto.png" width="200px" />
            <Card.Body className="card-body">
              <Card.Title>Menu 2</Card.Title>
              <Card.Text>Rp.4000</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8} xs={12} className="mb-4 mr-4">
          <Card className="flex-container">
            <Card.Img variant="top" src="assets/images/foto.png" width="200px" />
            <Card.Body className="card-body">
              <Card.Title>Menu 3</Card.Title>
              <Card.Text>Rp.4000</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8} xs={12} className="mb-4 mr-4">
          <Card className="flex-container">
            <Card.Img variant="top" src="assets/images/foto.png" width="200px" />
            <Card.Body className="card-body">
              <Card.Title>Menu 4</Card.Title>
              <Card.Text>Rp.4000</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8} xs={12} className="mb-4 mr-4">
          <Card className="flex-container">
            <Card.Img variant="top" src="assets/images/foto.png" width="200px" />
            <Card.Body className="card-body">
              <Card.Title>Menu 5</Card.Title>
              <Card.Text>Rp.4000</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8} xs={12} className="mb-4 mr-4">
          <Card className="flex-container">
            <Card.Img variant="top" src="assets/images/foto.png" width="200px" />
            <Card.Body className="card-body">
              <Card.Title>Menu 6</Card.Title>
              <Card.Text>Rp.4000</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default KasirList;
