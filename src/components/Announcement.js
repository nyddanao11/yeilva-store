import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShippingFast, FaCreditCard, FaTags, FaHeadset } from 'react-icons/fa';
import './Announcement.css';

const features = [
  {
    icon: <FaShippingFast />,
    title: 'Free Shipping',
    subtitle: 'Orders above ₱2500',
    link: null,
  },
  {
    icon: <FaCreditCard />,
    title: 'Installment',
    subtitle: 'Orders above ₱500',
    link: null,
  },
  {
    icon: <FaTags />,
    title: 'Discount Voucher',
    subtitle: '(1 available)',
    link: '/freebies',
  },
  {
    icon: <FaHeadset />,
    title: 'Customer Support',
    subtitle: '24/7 Assistance',
    link: '/needhelp',
  },
];

export default function Announcement() {
  return (
    <Container className="announcement-wrapper">
      <Row className="justify-content-center">
        {features.map((item, index) => {
          const content = (
            <div className="tabs_item" key={index}>
              <div className="tabs_icon">{item.icon}</div>
              <p className="tabs_title">{item.title}</p>
              <p className="tabs_subtitle">{item.subtitle}</p>
            </div>
          );

          return item.link ? (
            <Col xs={6} sm={4} md={3} key={index}>
              <Link to={item.link} className="tabs_link">
                {content}
              </Link>
            </Col>
          ) : (
            <Col xs={6} sm={4} md={3} key={index}>
              {content}
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}