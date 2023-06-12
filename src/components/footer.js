import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../pages/css/Footer.css"

const footer = observer(() => {

  return (
    <footer className="bg-dark py-3 text-light mt-auto">
          <Container >
              <Row>
                  <Col md={6}>
                      <h5>Contact Us</h5>
                      <p>
                          123 Main St. <br />
                          Boyarka, Ukraine 12345 <br />
                          Phone: (000) 000-0000 <br />
                          Email: info@example.com
                      </p>
                  </Col>
                  <Col md={6} className="text-md-right">
                      <p>
                          &copy; {new Date().getFullYear()} My Website, Inc. All rights reserved.
                      </p>
                      <p>
                          About us: https://www.youtube.com
                      </p>
                  </Col>
              </Row>
          </Container>
    </footer>
  );
}
)

export default footer