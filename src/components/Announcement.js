import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShippingFast, FaCreditCard, FaTags, FaHeadset } from 'react-icons/fa'; // Import the icons you want to use
import './Announcement.css';

const Announcement = () => {
  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center align-items-center">
          <Col className="tabs_container">
            <div className="tabs_item">
              <p className="tabs_title">
                <FaShippingFast className="icons"/> Free Shipping
              </p>
              <p className="tabs_title_02">Order above ₱2500</p>
            </div>

            <div className="tabs_item">
              <p className="tabs_title">
                <FaCreditCard className="icons"/> Installment
              </p>
              <p className="tabs_title_01">Order above ₱500</p>
            </div>

               <Link to="/freebies" style={{ textDecoration: "none" }}>
            <div className="tabs_item">
             <p className="tabs_title">
                <FaTags className="icons"/> Discount Voucher
              </p>
              <p className="tabs_title_01">(1)</p>
            </div>
              </Link>

            <Link to="/needhelp" style={{ textDecoration: "none" }}>
              <div className="tabs_item">
                <p className="tabs_title">
                  <FaHeadset className="icons"/> Customer Support
                </p>
                <p className="tabs_title_01">24/7 Support</p>
              </div>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Announcement;
