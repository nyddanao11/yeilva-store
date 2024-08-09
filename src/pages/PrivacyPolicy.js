import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage = () => {
  return (
    <Container>
      <h3>Privacy Policy</h3>
      <p>
        Your privacy is important to us. This Privacy Policy explains how your
        personal information is collected, used, and disclosed by our e-commerce
        website.
      </p>
      <h5>Information We Collect</h5>
      <p>
        We may collect information that you provide directly to us, such as when
        you make a purchase, create an account, or contact us for support.
      </p>
      <h5>How We Use Your Information</h5>
      <p>
        We may use your personal information for various purposes, including to
        process your orders, provide customer support, and improve our services.
      </p>
      <h5>Sharing Your Information</h5>
      <p>
        We may share your information with third-party service providers to
        facilitate our services, and as required by law or to protect our rights.
      </p>
      <h5>Security</h5>
      <p>
        We take reasonable measures to protect your personal information. However,
        no method of transmission over the internet or electronic storage is
        completely secure.
      </p>
      <h5>Your Choices</h5>
      <p>
        You can review and update your account information, and you may opt-out of
        marketing communications.
      </p>
      <h5>Changes to This Policy</h5>
      <p>
        We may update this Privacy Policy to reflect changes to our information
        practices. We will notify you of any significant changes.
      </p>
      <h5>Contact Us</h5>
      <p>
        If you have any questions about this Privacy Policy, please contact us at
           <Link to="/needhelp"> Customer Support </Link>
      </p>
    </Container>
  );
};

export default PrivacyPolicyPage;
