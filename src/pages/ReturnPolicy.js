import React from 'react';
import { Container } from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function ReturnPolicyPage () {
  return (
    <Container>
      <h3>Return Policy</h3>
      <p>
        We want you to be completely satisfied with your purchase from YeilvaSTORE. 
        If for any reason you are not satisfied, we will gladly
        accept returns within 30 days of the purchase date.
      </p>

      <h5>Return Eligibility</h5>
      <p>
        To be eligible for a return, your item must be unused and in the same
        condition that you received it. It must also be in the original
        packaging.
      </p>

      <h5>Return Process</h5>
      <ol>
        <li>Contact Customer Support: Before returning any item, please contact
          our customer support at <Link to='/needhelp'>Customer Support </Link>
          to initiate the return process.</li>
        <li>Package Your Item: Please pack the item securely in the original
          packaging, if possible.</li>
        <li>Include Documentation: Include a copy of the packing slip or your
          order confirmation email in the package.</li>
        <li>Send the Package: Ship the package to the following address:</li>
      </ol>

      <address>
        YeilvaSTORE<br />
      071 purok pati Maslog<br />
        Danao City, Cebu, 6004<br />
        Philippines
      </address>

      <h5>Refunds</h5>
      <p>
        Once your return is received and inspected, we will send you an email to
        notify you that we have received your returned item. We will also notify
        you of the approval or rejection of your refund.
        <br />
        If your return is approved, your refund will be processed, and a credit
        will automatically be applied to your original method of payment within
        7 days.
      </p>

      <h5>Exchanges</h5>
      <p>
        If you need to exchange an item for a different size or color, please
        contact our customer support at{' 09497042268 '}
        <Link to='/needhelp'>Customer Support </Link>
        to arrange for an exchange.
      </p>

      <h5>Questions</h5>
      <p>
        If you have any questions about our return policy, please contact our
        customer support at {' 09497042268 '}
        <Link to='/needhelp'>Customer Support </Link>
      </p>
    </Container>
  );
};

