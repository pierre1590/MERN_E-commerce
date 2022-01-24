import React from 'react';
import {  Container,Row,Col } from 'react-bootstrap';
import{DateTime} from 'luxon';

const Footer = () => {
    return (
       <footer>
        <Container>
            <Row>
                <Col className='text-center py-3'>
                Copyright &copy; {DateTime.now().toFormat('yyyy')} Shop. All rights reserved.
                </Col>
            </Row>
        </Container>
         </footer>
    );
}

export default Footer;
