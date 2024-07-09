// src/components/TermsAndConditions.js
import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import {Link} from'react-router-dom';

const InstallemntTerms = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header as="h3">Terms and Conditions for Product Installment Service</Card.Header>
            <Card.Body>
              <Card.Text>Last Updated:June 2024</Card.Text>
              <Card.Text>
                Welcome to YeilvaStore. By using our product installment service, you agree to the following terms and conditions. Please read them carefully.
              </Card.Text>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>1. Overview</strong>
                  <p>The product installment service allows customers to purchase items from our online store and pay for them in weekly installments over a one-month period.</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>2. Eligibility</strong>
                  <p>To be eligible for the installment service, you must:</p>
                  <ul>
                    <li>Be at least 18 years old.</li>
                    <li>Provide accurate and complete personal information.</li>
                    <li>Have a valid credit or debit card.</li>
                  </ul>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>3. Payment Terms</strong>
                  <ul>
                    <li>The total purchase amount will be divided into four equal weekly payments.</li>
                    <li>The first installment is due at the time of purchase.</li>
                    <li>Subsequent installments will be automatically charged to your provided payment method on a weekly basis.</li>
                    <li>Failure to make a payment may result in late fees and/or cancellation of the installment plan.</li>
                  </ul>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>4. Late Payments</strong>
                  <ul>
                    <li>A late fee of [Late Fee Amount] will be applied if a payment is not successfully processed on the due date.</li>
                    <li>If a payment is not made within 7 days of the due date, the remaining balance will become due immediately.</li>
                    <li>Continued failure to pay may result in legal action and/or reporting to credit agencies.</li>
                  </ul>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>5. Cancellation and Refunds</strong>
                  <ul>
                    <li>Installment plans cannot be canceled once initiated.</li>
                    <li>Products purchased through the installment service are subject to our standard return policy. If a return is accepted, refunds will be processed as per our refund policy, and any remaining installment payments will be adjusted accordingly.</li>
                    <li>Any refund will be credited to the original payment method used for the installment plan.</li>
                  </ul>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>6. Ownership of Goods</strong>
                  <p>Ownership of the products remains with [Your Online Store Name] until all installment payments are made in full. [Your Online Store Name] reserves the right to reclaim the products if installment payments are not completed.</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>7. Account Information</strong>
                  <p>You are responsible for ensuring that your payment and contact information is current and accurate. Changes to payment information must be updated promptly to avoid missed payments.</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>8. Use of Personal Information</strong>
                  <p>Personal information provided for the installment service will be used in accordance with our Privacy Policy. By using the installment service, you consent to the collection and use of your information as described in our Privacy Policy.</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>9. Amendments to Terms and Conditions</strong>
                  <p>YeilvaStore reserves the right to modify these terms and conditions at any time. Any changes will be effective immediately upon posting on our website. Continued use of the installment service constitutes acceptance of the revised terms and conditions.</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>10. Contact Information</strong>
                  <p>For any questions or concerns regarding the installment service or these terms and conditions, please contact us at:</p>
                  <p><Link to="/needhelp"> Customer Support</Link></p>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default InstallemntTerms;

