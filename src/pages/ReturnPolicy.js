import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SEO from '../components/SEO'; 
import './ReturnPolicy.css';

const LAST_UPDATED = 'July 3, 2026';
const STORE_EMAIL  = 'support@yeilvastore.com'; // ← update to your actual address

const PRE_PURCHASE_CHECKLIST = [
  {
    label: 'Read the product description fully.',
    detail: 'Every listing describes exactly what is included — format, length, what you will receive, and what it covers.',
  },
  {
    label: 'Check the format.',
    detail: 'Most Yeilvastore products are delivered as PDF files. There is no physical shipment, no login portal, and no recurring access fee.',
  },
  {
    label: 'Confirm your email address at checkout.',
    detail: 'Your download link is sent immediately to the email you provide. Typos in your email mean the link goes nowhere — double-check before completing payment.',
  },
  {
    label: 'Understand what "instant delivery" means.',
    detail: 'Once payment is confirmed, the file is dispatched automatically. There is no cancellation window after that point.',
  },
];

const POLICY_SECTIONS = [
  {
    heading: 'All sales are final.',
    body: `Because our products are digital files delivered instantly upon payment, we do not offer refunds, exchanges, or credits under any circumstances. The moment your payment is confirmed, the product is made available to you — there is no way for us to verify whether a file has been opened, read, or used, and we cannot retrieve it once delivered.

This policy is consistent with standard practice for digital products and is in place to protect the integrity of the store.`,
  },
  {
    heading: 'We do not offer refunds for these reasons.',
    body: `The following are not grounds for a refund at Yeilvastore:

• You changed your mind after purchase.
• You did not read the product description before buying.
• You made a duplicate purchase.
• The content did not meet your personal expectations.
• You no longer need the product.
• Technical issues on your own device or email provider.

If you are unsure whether a product is right for you, please read the full listing carefully or contact us before buying.`,
  },
  {
    heading: 'Exceptions we will review.',
    body: `We will look into your case if:

• You were charged but never received a download link (and you have confirmed the email address you used at checkout).
• You were charged more than once for the same product.

In either case, email us within 7 days of purchase at the address below with your order details. We will verify the issue and either resend your link or reverse the duplicate charge.`,
  },
  {
    heading: 'Chargebacks and payment disputes.',
    body: `Filing a chargeback or payment dispute without contacting us first will result in your email address being permanently blocked from future purchases at Yeilvastore.

If you have a genuine issue with your order, we are reachable and we will respond. Please contact us before escalating to your payment provider.`,
  },
  {
    heading: 'Contact.',
    body: `For order issues, delivery problems, or questions about a product before purchase, reach us at:

${STORE_EMAIL}

We typically respond within 1–2 business days.`,
  },
];

export default function RefundPolicy() {
  return (
    <>
      <SEO
        title="Refund Policy — Yeilvastore"
        description="Yeilvastore sells instant-delivery digital products. All sales are final. Read our full refund and returns policy before purchasing."   
        />
      />

      <div className="rp-root">

        {/* ── PAGE HEADER ─────────────────────────────────────────────── */}
        <header className="rp-header">
          <Container>
            <Row className="justify-content-center">
              <Col lg={7}>
                <span className="rp-store-name">Yeilvastore</span>
                <h1 className="rp-title">Refund Policy</h1>
                <p className="rp-updated">Last updated: {LAST_UPDATED}</p>
              </Col>
            </Row>
          </Container>
        </header>

        <Container>
          <Row className="justify-content-center">
            <Col lg={7} className="rp-body-col">

              {/* ── PRE-PURCHASE CHECKLIST (signature element) ──────────── */}
              <div className="rp-checklist-block">
                <p className="rp-checklist-eyebrow">BEFORE YOU BUY</p>
                <h2 className="rp-checklist-title">
                  Because all sales are final, please confirm the following before completing your purchase.
                </h2>
                <ul className="rp-checklist">
                  {PRE_PURCHASE_CHECKLIST.map((item, i) => (
                    <li key={i} className="rp-checklist-item">
                      <span className="rp-check-icon" aria-hidden="true">✓</span>
                      <div>
                        <strong>{item.label}</strong>
                        <span>{' '}{item.detail}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── POLICY SECTIONS ─────────────────────────────────────── */}
              <div className="rp-policy">
                {POLICY_SECTIONS.map((section, i) => (
                  <section key={i} className="rp-section">
                    <h2 className="rp-section-heading">{section.heading}</h2>
                    <div className="rp-section-body">
                      {section.body.split('\n\n').map((para, j) => (
                        <p key={j}>{para}</p>
                      ))}
                    </div>
                    {i < POLICY_SECTIONS.length - 1 && (
                      <hr className="rp-divider" aria-hidden="true" />
                    )}
                  </section>
                ))}
              </div>

              {/* ── FOOTER NOTE ─────────────────────────────────────────── */}
              <div className="rp-footer-note">
                <p>
                  By completing a purchase on Yeilvastore, you confirm that you have read
                  and accepted this policy in full.
                </p>
              </div>

            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
