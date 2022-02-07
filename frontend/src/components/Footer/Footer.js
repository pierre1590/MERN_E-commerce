/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { DateTime } from "luxon";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Col className="text-center py-3">
          <Row>
            <p>
              <a href="/">
                <FaInstagram className="instagram" />
              </a>
              <a href="/">
                <FaFacebook className="facebook" />
              </a>
            </p>
          </Row>
          <Row>
            <p className="text-white">E-Shop</p>
          </Row>
          <Row>
            <p className="text-white">
              All rights reserved. &copy; {DateTime.local().toFormat("yyyy")}
            </p>
          </Row>
          <Row>
            <p className="text-white">
              Created by{" "}
              <a href="https://www.linkedin.com/in/pierosabino/" target="_blank" rel="noreferrer" >
                Piero Sabino
              </a>
            </p>
          </Row>
        </Col>
      </Container>
    </footer>
  );
};

export default Footer;
