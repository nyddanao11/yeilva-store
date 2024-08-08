import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NewUserDiscount from './NewUserDiscount';
import Raffle from './RaffleComponent';
import YouMayLike from './YouMayLike';

const Freebies = ({ addToCart }) => {
    return (
        <>
            <Container fluid>
                <Row >
                    <Col lg={6} md={6} xs={12}>
                        <NewUserDiscount />
                    </Col>
                    <Col lg={6} md={6} xs={12} className="mb-4">
                        <Raffle />
                    </Col>
                </Row>
            </Container>
            <YouMayLike addToCart={addToCart} />
        </>
    );
};

export default Freebies;
