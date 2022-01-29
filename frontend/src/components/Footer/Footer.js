/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {  Container,Row,Col } from 'react-bootstrap';
import{DateTime} from 'luxon';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
       <footer>
        <Container>
            {/*Footer with instagram, linkedin icons and all rigths reserved on three rows*/}
            <Col className="text-center py-3">
                <Row>
                    <p>
                        <a href="/">
                            <FaInstagram   className='instagram'/>
                        </a>
                        <a href="/">
                            <FaFacebook   className='facebook'/>
                        </a>
                    </p>
                </Row>
                <Row>
                  <p className="text">Shop</p>
                </Row>
                <Row>
                    <p className="text">All rights reserved. &copy; {DateTime.local().toFormat('yyyy')}</p>
                </Row>
            </Col>
           
        </Container>
         </footer>
    );
}

export default Footer;


