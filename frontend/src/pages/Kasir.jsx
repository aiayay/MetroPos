import React, { Component } from "react";
import KasirLayout from "./KasirLayout";
import Menus from "../components/Menus";
import KasirList from "../components/KasirList";
import KasirHasil from "../components/KasirHasil";
import { Row, Container, Col } from "react-bootstrap";
import { API_URL } from "../features/constants";
import axios from "axios";

export default class Kasir extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "produk")
      .then((res) => {
        console.log("Response : ", res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    console.log(this.state.menus);
    const { menus } = this.state;
    return (
      <div>
        <KasirLayout>
          <Container fluid className="mt-3">
            <div class="columns">
              <div class="column is-8">
                <p class="bd-notification is-primary">
                  <div class="cell">
                    <Col>
                      <h2 className="text-black">Daftar Menu</h2>
                      <hr />
                      <Row className="menu-wrapper">
                        {/* <KasirList /> */}
                        {menus && menus.map((menu) => <Menus key={menu.id_produk} menu={menu} />)}
                      </Row>
                    </Col>
                  </div>
                </p>
              </div>
              <div class="column">
                <p class="bd-notification is-primary">
                  <div class="cell">
                    <Col>
                      <KasirHasil />
                    </Col>
                  </div>
                </p>
              </div>
            </div>
          </Container>
        </KasirLayout>
      </div>
    );
  }
}
