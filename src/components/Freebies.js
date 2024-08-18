import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NewUserDiscount from './NewUserDiscount';
import Raffle from './RaffleComponent';
import RaffleOpen from './RaffleOpen';
import YouMayLike from './YouMayLike';
import {Link} from 'react-router-dom';

const Freebies = ({ addToCart }) => {
    return (
        <>
            <Container fluid>
                <Row >
                    <Col lg={6} md={6} xs={12} > 
                        <NewUserDiscount />

                         <Link to="/barleygrassjuice">
                           <div  className="d-flex flex-column justify-content-center align-items-center mt-4 p-2">
                             <img
                             src={`${process.env.PUBLIC_URL}/images/barleyjuice.jpg`}
                            style={{ objectFit: 'cover', maxHeight: '250px', width: '250px' }} 
                             />
                             <h3 className="mt-2"><Link to="/barleygrassjuice"> Barley Grass Juice </Link> </h3>
                          </div>
                        </Link>
                         <RaffleOpen />
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
