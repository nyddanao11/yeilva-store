import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function PrivacyPolicyPage() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={9}>
          <div className="text-center mb-5">
            <h1 className="fw-extrabold text-dark mb-2">Privacy Policy</h1>
            <p className="text-muted">Effective Date: May 2026</p>
            <p className="lead text-secondary">
              At YeilvaStore, your privacy is paramount. This policy outlines how we collect, protect, and handle your information across our digital storefront.
            </p>
          </div>

          <hr className="my-4 opacity-25" />

          <section className="mb-4">
            <h5 className="fw-bold text-dark">1. Information We Collect</h5>
            <p className="text-secondary">
              Because YeilvaStore specializes exclusively in digital downloads, ebooks, and virtual assets, we do not collect or store physical shipping addresses. We only collect the minimal personal information necessary to deliver your digital items:
            </p>
            <ul className="text-secondary ps-4">
              <li className="mb-2"><strong>Account & Checkout Data:</strong> Your name, email address, and account credentials when you register or complete a purchase.</li>
              <li className="mb-2"><strong>Guest Checkout Sessions:</strong> If you use our modal guest checkout, we collect your email address purely to dispatch your secure file access keys and transaction receipts.</li>
              <li className="mb-2"><strong>Device & Usage Insights:</strong> Anonymized analytical data, including IP addresses, browser variants, and page interaction times to optimize file download speeds.</li>
            </ul>
          </section>

          <section className="mb-4">
            <h5 className="fw-bold text-dark">2. How We Use Your Information</h5>
            <p className="text-secondary">
              We process your personal data under strict legal parameters to run a seamless digital delivery sequence. Specifically, we use it to:
            </p>
            <ul className="text-secondary ps-4">
              <li className="mb-2">Generate and authenticate secure, time-sensitive download links for your purchased digital products.</li>
              <li className="mb-2">Provide customer technical support if a file fails to open, sync, or download to your specific device.</li>
              <li className="mb-2">Prevent fraudulent usage, automated bot attacks, or unauthorized multi-user link sharing that breaches our licensing agreements.</li>
              <li className="mb-2">Send occasional product updates or flash deals, provided you have opted into our newsletter circle.</li>
            </ul>
          </section>

          <section className="mb-4">
            <h5 className="fw-bold text-dark">3. Secure Payment Processing & Financial Data</h5>
            <p className="text-secondary">
              YeilvaStore values your financial safety. <strong>We never see, collect, or store your credit card details or payment credentials on our servers.</strong> 
              <br /><br />
              All financial transactions are routed directly through secure, encrypted third-party payment processing gateways (such as PayPal). These processors share only your basic transaction status and email with us to unlock your digital product modal downloads upon validation.
            </p>
          </section>

          <section className="mb-4">
            <h5 className="fw-bold text-dark">4. Sharing Your Information</h5>
            <p className="text-secondary">
              We do not sell, trade, or rent your personal data to third-party marketing companies. We share information strictly with essential service infrastructure partners required to operate our digital shop:
            </p>
            <ul className="text-secondary ps-4">
              <li className="mb-2">Cloud hosting platforms and database services that maintain our application state securely.</li>
              <li className="mb-2">Automated transactional email services tasked with sending your receipt and digital access credentials.</li>
              <li className="mb-2">Legal authorities, strictly if required by law, to enforce our site terms or protect against systemic transaction fraud.</li>
            </ul>
          </section>

          <section className="mb-4">
            <h5 className="fw-bold text-dark">5. Data Retention & Security</h5>
            <p className="text-secondary">
              Your account profiling data and order download histories are kept safe within encrypted database architectures to ensure you have continuous lifetime access to your purchased digital vault items. While no internet-facing architecture is 100% impenetrable, we use modern web security protocols, token-based user authentication, and SSL encryption to actively mitigate data leak vulnerabilities.
            </p>
          </section>

          <section className="mb-4">
            <h5 className="fw-bold text-dark">6. Your Rights and Choices</h5>
            <p className="text-secondary">
              You retain total command over your information footprint. At any time, you can:
            </p>
            <ul className="text-secondary ps-4">
              <li className="mb-2">Log into your personal profile dashboard to modify, correct, or review your user details.</li>
              <li className="mb-2">Opt out of marketing updates instantly by clicking the 'Unsubscribe' link placed at the foot of our digital newsletters.</li>
              <li className="mb-2">Request the permanent deletion of your account and file histories by contacting our support desk (please note that deleting this data removes your ability to re-download purchased assets).</li>
            </ul>
          </section>

          <section className="mb-4">
            <h5 className="fw-bold text-dark">7. Changes to This Privacy Policy</h5>
            <p className="text-secondary">
              As we update our digital inventories or fine-tune our delivery models, we may periodically adjust this policy. Any updates will be updated right here on this page with a revised effective date tracking note.
            </p>
          </section>

          <section className="mb-5">
            <h5 className="fw-bold text-dark">8. Contact Customer Support</h5>
            <p className="text-secondary">
              If you have any underlying privacy questions, data deletion requests, or need assistance modifying your account records, please head straight over to our dedicated <Link to="/needhelp" className="text-primary fw-semibold text-decoration-none">Customer Support Portal</Link>.
            </p>
          </section>
        </Col>
      </Row>
    </Container>
  );
}