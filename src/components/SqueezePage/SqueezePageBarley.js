import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import NewUserDiscount from '../NewUserDiscount';

export default function BarleyGrassJuice () {
  return (
    <Container>
      <Row className="mt-5">
        <Col md={{ span: 8, offset: 2 }}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title as="h1">Transform Your Health with Barley Grass Juice</Card.Title>
              <Card.Subtitle as="h3" className="mb-3">
                Get Your Discount Voucher Today!
              </Card.Subtitle>
              <Card.Img
                variant="top"
                src={`${process.env.PUBLIC_URL}/images/barleyjuice.jpg`} // Replace with your image URL // Replace with your image URL
                alt="Barley Grass Juice"
                className="mb-3"
                style={{maxWidth:'400px'}}
              />
              <Card.Text>
                Experience the Power of Nature’s Superfood. Boost Your Energy, Detoxify Your Body, and Feel Amazing!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={{ span: 8, offset: 2 }}>
          <h2>Why Choose Barley Grass Juice?</h2>
          <ul>
            <li><strong>Natural Energy Boost</strong> – Say goodbye to fatigue and hello to vitality!</li>
            <li><strong>Detoxify Naturally</strong> – Cleanse your body from harmful toxins.</li>
            <li><strong>Enhanced Immunity</strong> – Packed with vitamins and antioxidants.</li>
            <li><strong>Better Digestion</strong> – Supports a healthy digestive system.</li>
          </ul>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={{ span: 6, offset: 3 }}>
         <NewUserDiscount />
           <div className="d-flex justify-content-center align-items-center">
            <Button variant="primary"  className="mt-5" >
             <a href="https://yeilvastore.com/clickproductpage/3" style={{textDecoration:'none', color:'white'}} >Click Here to Buy
             </a>
            </Button>
           </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={{ span: 8, offset: 2 }}>
          <h2>Real Stories, Real Results</h2>
          <p><em>"Barley Grass Juice has been a game-changer for my health. I feel more energetic and my digestion has never been better!"</em> - Emma R.</p>
          <p><em>"I love the natural boost I get from Barley Grass Juice. It’s now a staple in my daily routine."</em> - John S.</p>
        </Col>
      </Row>
      <Row className="mt-5 mb-5">
        <Col md={{ span: 8, offset: 2 }} className="text-center">
          <p><strong>Join the Barley Grass Juice Community Today!</strong></p>
          <p>Don’t miss out on the chance to experience the numerous benefits of Barley Grass Juice. Claim your discount voucher now and start your journey to a healthier you.</p>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 8, offset: 2 }} className="text-center">
          <p><Link to="/">YeilvaStore</Link> | <Link to="/needhelp"> Customer Support </Link> </p>
          <Link to="/privacypolicy">Privacy Policy</Link> | <Link to="/termsandconditions">Terms and Conditions</Link>
        </Col>
      </Row>
    </Container>
  );
};




