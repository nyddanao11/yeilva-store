import React from 'react';
import { Container } from 'react-bootstrap';
import {Link} from'react-router-dom';

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
      <h5>6. Contact Information</h5>
      <p>
        If you have any questions or concerns regarding these terms and
        conditions, you can contact us at <a href="yeilvastore@gmail.com">yeilvastore@gmail.com</a>
      </p>
    </Container>
  );
};

export default TermsAndConditionsPage;
