import React from 'react';
import ProductCard from './ImageCircleCard'; // Assuming your component file is named 'ImageCircleCard'
import { cans } from '../data/grocery';
import './ImageCircleCard.css';
import { Container, Row, Col } from 'react-bootstrap';

const CircleCard = () => {
  return (
    <Container>
      <Row className="flex-nowrap overflow-auto" >
        {cans.map((product) => (
          <Col key={product.id} xs={6} md={4} lg={3}>
            <ProductCard
              image={product.image}
              name={product.name}
              price={product.price}
              category={product.category}
              link={product.link}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CircleCard;
