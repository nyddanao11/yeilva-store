import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function TermsAndConditionsPage() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={9}>
          <div className="text-center mb-5">
            <h1 className="fw-extrabold text-dark mb-2">Terms and Conditions</h1>
            <p className="text-muted">Last Updated: May 2026</p>
            <p className="lead text-secondary">
              Please read these terms and conditions carefully before purchasing or downloading any digital products from YeilvaStore.
            </p>
          </div>

          <hr className="my-4 opacity-25" />

          <section className="mb-4">
            <h5 className="fw-bold text-dark">1. Acceptance of Terms</h5>
            <p className="text-secondary">
              By accessing our website, purchasing, or downloading digital goods from YeilvaStore, you agree to be bound by these Terms and Conditions. If you do not agree to all parts of these terms, you are not authorized to access the site or download our digital content.
            </p>
          </section>

          <section className="mb-4">
            <h5 className="fw-bold text-dark">2. Digital Product Delivery</h5>
            <p className="text-secondary">
              All products sold on YeilvaStore are digital assets, ebooks, or virtual content. No physical items will be shipped. Upon successful completion of your payment, digital products will be delivered instantly via an on-screen download link, a modal checkout confirmation, and/or an automated email sent to the address provided during checkout. 
            </p>
          </section>

          <section className="mb-4">
            <h5 className="fw-bold text-dark">3. Strict No-Refund Policy</h5>
            <p className="text-secondary">
              Due to the intangible and irreversible nature of digital downloads, <strong>all sales are final</strong>. Once download links are generated, accessed, or emailed, the product cannot be "returned." Therefore, YeilvaStore cannot offer refunds, chargebacks, or exchanges for any reason. By completing your purchase, you acknowledge and agree to this policy.
            </p>
          </section>

          <section className="mb-4">
            <h5 className="fw-bold text-dark">4. Intellectual Property & Digital License</h5>
            <p className="text-secondary">
              When you purchase a digital product from YeilvaStore, you are buying a <strong>single-user, non-transferable, non-exclusive license</strong> for personal or internal business use only. 
              <br /><br />
              You are strictly prohibited from reselling, redistributing, duplicating, sharing access keys, uploading files to public servers, or sub-licensing any content purchased from this site. All text, layout designs, code, graphics, and ebooks remain the sole intellectual property of YeilvaStore and are protected by global copyright laws.
            </p>
          </section>

          <section className="mb-4">
            <h5 className="fw-bold text-dark">5. Ordering and Payment Gateways</h5>
            <p className="text-secondary">
              We process secure transactions using certified, encrypted payment gateways (such as PayPal). You agree to provide accurate email and billing details to ensure successful delivery. We reserve the right to cancel or refuse access to products if fraudulent activity or unauthorized multi-user file-sharing is detected on your account or checkout session.
            </p>
          </section>

          <section className="mb-4">
            <h5 className="fw-bold text-dark">6. Disclaimer of Warranty & Liability</h5>
            <p className="text-secondary">
              Digital products and educational materials are provided "as is" without warranties of any kind, either express or implied. While we strive for absolute accuracy, YeilvaStore does not guarantee that the digital files will be completely error-free or compatible with every specific software platform or third-party e-reader. You are responsible for ensuring your devices support standard formats (like PDF or EPUB) prior to purchase.
            </p>
          </section>

          <section className="mb-4">
            <h5 className="fw-bold text-dark">7. Privacy and Data Governance</h5>
            <p className="text-secondary">
              Your security and privacy matter to us. Data collected during checkout or account creation is safely managed in accordance with our <Link to="/privacypolicy" className="text-primary fw-semibold text-decoration-none">Privacy Policy</Link>.
            </p>
          </section>

          <section className="mb-4">
            <h5 className="fw-bold text-dark">8. Modifications to Service and Pricing</h5>
            <p className="text-secondary">
              Prices for our digital items are subject to change without notice. We reserve the right at any time to modify, patch, or discontinue a digital asset (or any part of its content) without liability to you or any third party.
            </p>
          </section>

          <section className="mb-4">
            <h5 className="fw-bold text-dark">9. Governing Law</h5>
            <p className="text-secondary">
              These terms and conditions are governed by and construed in accordance with local e-commerce regulations and international copyright treaties. Any disputes arising out of your use of this digital store shall be handled in the designated legal courts of your jurisdiction.
            </p>
          </section>

          <section className="mb-5">
            <h5 className="fw-bold text-dark">10. Help and Contact Information</h5>
            <p className="text-secondary">
              If you experience any technical difficulties downloading your files, or if you have questions regarding your digital access rights, please visit our <Link to="/needhelp" className="text-primary fw-semibold text-decoration-none">Customer Support Portal</Link> immediately for assistance.
            </p>
          </section>
        </Col>
      </Row>
    </Container>
  );
}