import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Card } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../features/constants";
import "../index.css";

const KasirList = () => {
  return (
    <div>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          {/* search */}
          <div className="container mt-5">
            <div className="columns">
              <div className="kolom is-centered">
                <form action="">
                  <div className="field has-addons">
                    <div className="control is-expanded">
                      <input type="text" className="input" placeholder="cari.." />
                    </div>
                    <div className="control">
                      <button type="submit" className="button is-info">
                        search
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="navbar-item">
            <div className="buttons">
              <Link to="/kasirmember/add" className="button ungu mb-2">
                Tambah Member
              </Link>
              <Link to="/kasirtransaksi" className="button is-success mb-2">
                Riwayat Transaksi
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <Col md={4} xs={6} className="mb-4">
            <Card style={{ width: "18rem" }} className="shadow">
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} xs={6} className="mb-4">
            <Card style={{ width: "18rem" }} className="shadow">
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </div>
        <div className="row">
          <Col md={4} xs={6} className="mb-4">
            <Card style={{ width: "18rem" }} className="shadow">
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} xs={6} className="mb-4">
            <Card style={{ width: "18rem" }} className="shadow">
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default KasirList;
