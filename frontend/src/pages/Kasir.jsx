import React from "react";
import KasirLayout from "./KasirLayout";
import KasirList from "../components/KasirList";
import KasirHasil from "../components/KasirHasil";
import { Row, Container, Col } from "react-bootstrap";

const Kasir = () => {
  return (
    <div>
      <KasirLayout>
        <Container fluid className="mt-3">
          <div class="columns">
            <div class="column is-8">
              <p class="bd-notification is-primary">
                <div class="cell">
                  <Col>
                    <KasirList />
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
};

export default Kasir;
