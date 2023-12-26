import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TermsAndConditionsPage = () => {
  return (
    <Container>
      <h3>Terms and Conditions</h3>
      <p>
        Please read these terms and conditions carefully before using our
        website.
      </p>

      <h5>1. Acceptance of Terms</h5>
      <p>
        By accessing or using this website, you agree to be bound by these terms
        and conditions.
      </p>

      <h5>2. Use of the Website</h5>
      <p>
        You must use this website in accordance with the laws of your
        jurisdiction. Unauthorized use of this website may give rise to a claim
        for damages and/or be a criminal offense.
      </p>

      <h5>3. Disclaimer of Warranty</h5>
      <p>
        The content of the pages of this website is for your general
        information and use only. It is subject to change without notice.
        <br />
        The use of any information or materials on this website is entirely at
        your own risk, for which we shall not be liable. It shall be your own
        responsibility to ensure that any products, services, or information
        available through this website meet your specific requirements.
      </p>

      <h5>4. Privacy</h5>
      <p>
        Your use of this website is also governed by our{' '}
        <Link to="/privacypolicy">Privacy Policy</Link>.
      </p>

      <h5>5. Changes to Terms</h5>
      <p>
        We may revise and update these terms and conditions from time to time.
        Please check this page regularly to ensure you are familiar with the
        current version.
      </p>

      <h5>6. Product Information</h5>
      <p>
        We strive to provide accurate and up-to-date product information on the
        website. However, we do not guarantee the accuracy, completeness, or
        reliability of any product information. Prices and availability are
        subject to change without notice.
      </p>

      <h5>7. Ordering and Payment</h5>
      <p>
        When you place an order on our website, you are making an offer to
        purchase the products in your cart. We reserve the right to refuse
        orders for any reason.
        <br />
        Payment is required at the time of placing your order. We use secure
        payment gateways to protect your financial information.
      </p>

      <h5>8. Shipping and Delivery</h5>
      <p>
        Shipping costs and estimated delivery times are provided during the
        checkout process. Actual delivery times may vary depending on your
        location and other factors beyond our control.
      </p>

      <h5>9. Returns and Refunds</h5>
      <p>
        Please refer to our <Link to="/returnpolicy">Return Policy</Link> for
        information on returns and refunds.
      </p>

      <h5>10. Intellectual Property</h5>
      <p>
        All content on this website, including text, graphics, logos, images,
        and software, is the property of 'YeilvaSTORE' and is protected by
        intellectual property laws.
      </p>

      <h5>11. Governing Law</h5>
      <p>
        These terms and conditions are governed by and construed in accordance
        with the laws of [Your Jurisdiction]. Any disputes arising out of or in
        connection with these terms shall be subject to the exclusive
        jurisdiction of the courts of [Your Jurisdiction].
      </p>

      <h5>12. Contact Information</h5>
      <p>
        If you have any questions or concerns regarding these terms and
        conditions, you can contact us at{' '}
        <a href="mailto:yeilvastore@gmail.com">yeilvastore@gmail.com</a>.
      </p>
    </Container>
  );
};

export default TermsAndConditionsPage;
