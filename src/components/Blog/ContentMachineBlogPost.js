import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../pages/CartContext';
import './ContentMachineBlogPost.css';
import SEO from '../SEO';

const modules = [
    {
      tag: 'MODULE 01',
      title: 'Idea Bank Setup',
      summary: 'Capture and organize ideas in one place',
      body: 'Every piece of content starts as a stray thought — in the shower, mid-scroll, halfway through someone else\'s post. The Idea Bank gives that thought somewhere to land before it disappears. You\'ll set up a simple, searchable system so nothing good slips through the cracks again.',
    },
    {
      tag: 'MODULE 02',
      title: 'Planning Calendar',
      summary: 'Build a publishing schedule you\'ll actually keep',
      body: 'A calendar only works if it fits how you actually work. This module walks through building a publishing rhythm that\'s realistic for your bandwidth — so "consistent" stops meaning "stressful" and starts meaning sustainable.',
    },
    {
      tag: 'MODULE 03',
      title: 'Production Workflow',
      summary: 'Turn ideas into finished content, repeatably',
      body: 'The gap between "good idea" and "published post" is where most content dies. This module hands you a repeatable path through that gap — the same steps, every time, so output stops depending on motivation.',
    },
    {
      tag: 'MODULE 04',
      title: 'Templates and Tools',
      summary: 'Ready-to-use templates that save hours',
      body: 'You don\'t need to start from a blank page, ever again. This module includes the actual templates — plug your topic in, and the structure is already done. Less staring, more shipping.',
    },
    {
      tag: 'MODULE 05',
      title: 'Time-Saving Systems',
      summary: 'Batch tasks and automate the busywork',
      body: 'The final module is about getting your time back. You\'ll learn which parts of the process can be batched in one sitting and which parts can run on autopilot — so the machine keeps moving without you pushing every gear by hand.',
    },
  ];


export default function ContentMachineBlogPost() {
  const [activeModule, setActiveModule] = useState(0);

  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
 const [openModel, setOpenModel] = useState(null);
 
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();


  useEffect(() => {
    if (!slug) return;
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/landingproduct/${slug}`)
      .then((res) => { if (!res.ok) throw new Error('Not found'); return res.json(); })
      .then((data) => { data ? setProduct(data) : setError(true); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, [slug]);


   if (loading) {
    return (
      <div className="dlp-loading">
        <div className="dlp-skeleton">
          <div className="dlp-skeleton-badge" />
          <div className="dlp-skeleton-line dlp-skeleton-line--title" />
          <div className="dlp-skeleton-line dlp-skeleton-line--title-short" />
          <div className="dlp-skeleton-line dlp-skeleton-line--text" />
          <div className="dlp-skeleton-line dlp-skeleton-line--text-short" />
          <div className="dlp-skeleton-card" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="dlp-loading">
        <div className="dlp-error-card">
          <span className="dlp-error-icon" aria-hidden="true">⚠</span>
          <h3>Blueprint unavailable</h3>
          <p>We couldn't find this offer, or it has expired.</p>
          <a href="/" className="dlp-error-link">Browse all guides →</a>
        </div>
      </div>
    );
  }


  const {
    name, description, price, discount, url,
    benefit_1_title, benefit_1_desc,
    benefit_2_title, benefit_2_desc,
    benefit_3_title, benefit_3_desc,
  } = product;

  const cleanProductUrl = product.url?.replace(/\$\{process\.env\.PUBLIC_URL\}/g, process.env.PUBLIC_URL || '') || '';
  const originalPrice = parseFloat(price || 0);
  const discountPct = parseFloat(discount || 0);
  const finalPrice = discountPct > 0 ? originalPrice * (1 - discountPct / 100) : originalPrice;
  const fmt = (n) => `₱${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const handleCheckout = () => {
    navigate('/checkout', {
      state: {
        selectedItems: [{
          ...product,
          url: cleanProductUrl,
          price: finalPrice,
          final_price: finalPrice,
          originalPrice,
          discountApplied: discountPct,
          displayPrice: finalPrice.toFixed(2),
          quantity: 1,
          isSelected: true,
        }],
      },
    });
  };


  
  return (
    <>
    <SEO
      title="Build Your Content Machine: The Guide to a Repeatable Content System"
      description="Get the 5-part system for consistent content: idea capture, a calendar you'll keep, a repeatable production workflow, ready-to-use templates, and time-saving automation."
      type="product"
    />
    <article className="cm-post">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <header className="cm-hero">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <span className="cm-eyebrow">THE GUIDE</span>
              <h1 className="cm-hero-title">
                Build Your <span className="cm-hero-accent">Content&nbsp;Machine</span>
              </h1>
              <p className="cm-hero-sub">
                Five modules. One repeatable system. Stop reinventing your process
                every time you sit down to create.
              </p>
            </Col>
          </Row>
        </Container>
      </header>

      {/* ── CONVEYOR DIAGRAM (signature element) ────────────────────── */}
      <section className="cm-conveyor-section">
        <Container>
          <div className="cm-conveyor" role="list" aria-label="The five modules of the Content Machine">
            <div className="cm-conveyor-line" aria-hidden="true" />
            {modules.map((m, i) => (
              <button
                key={i}
                className={`cm-node ${activeModule === i ? 'cm-node--active' : ''}`}
                onClick={() => setActiveModule(i)}
                role="listitem"
                aria-pressed={activeModule === i}
                aria-label={`${m.tag}: ${m.title}`}
              >
                <span className="cm-node-dot" />
                <span className="cm-node-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="cm-node-title">{m.title}</span>
              </button>
            ))}
          </div>

          {/* Active module detail */}
          <div className="cm-module-detail">
            <span className="cm-module-tag">{modules[activeModule].tag}</span>
            <h3>{modules[activeModule].title}</h3>
            <p className="cm-module-summary">{modules[activeModule].summary}</p>
            <p className="cm-module-body">{modules[activeModule].body}</p>
          </div>
        </Container>
      </section>

      {/* ── INTRO COPY ──────────────────────────────────────────────── */}
      <section className="cm-section cm-section--paper">
        <Container>
          <Row className="justify-content-center">
            <Col lg={7}>
              <p className="cm-lede">
                Most people don't have a content problem. They have a process
                problem — ideas scattered across notes apps, no fixed schedule,
                and every post starting from a blank page like it's the first
                one they've ever written.
              </p>
              <p className="cm-body-text">
                <em>Build Your Content Machine</em> fixes that by giving you
                the five working parts of a system that runs without constant
                willpower: a place to catch ideas, a calendar you'll actually
                follow, a repeatable production path, templates that do the
                heavy lifting, and the time-saving habits that keep it all
                moving.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ── WHAT'S INSIDE — alternating rows ────────────────────────── */}
      <section className="cm-section cm-section--ink">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={6} className="text-center">
              <span className="cm-eyebrow cm-eyebrow--light">WHAT'S INSIDE</span>
              <h2 className="cm-section-title cm-section-title--light">
                Five parts. One machine.
              </h2>
            </Col>
          </Row>

          {modules.map((m, i) => (
            <Row
              key={i}
              className={`cm-feature-row align-items-center ${i % 2 === 1 ? 'cm-feature-row--reverse' : ''}`}
            >
              <Col md={2} className="cm-feature-num-col">
                <span className="cm-feature-num">{String(i + 1).padStart(2, '0')}</span>
              </Col>
              <Col md={10}>
                <h3 className="cm-feature-title">{m.title}</h3>
                <p className="cm-feature-desc">{m.body}</p>
              </Col>
            </Row>
          ))}
        </Container>
      </section>

      {/* ── CLOSING CTA ─────────────────────────────────────────────── */}
      <section className="cm-section cm-section--paper cm-cta-section">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={6}>
              <h2 className="cm-cta-title">Stop starting from zero.</h2>
              <p className="cm-cta-sub">
                Get the guide and have your content machine running by this
                time next week.
              </p>
          <button
      type="button"
      className="btn-signal"
      onClick={handleCheckout}
      aria-label={`Get the ebook for ${fmt(finalPrice)}`}
    >
      <span className="btn-signal-main">
        Get the ebook
        <span className="btn-signal-arrow" aria-hidden="true">→</span>
      </span>
      <span className="btn-signal-divider" aria-hidden="true" />
      <span className="btn-signal-price">
        <span className="btn-signal-price-final">{fmt(finalPrice)}</span>
        {discountPct > 0 && (
          <span className="btn-signal-price-original">{fmt(originalPrice)}</span>
        )}
      </span>
    </button>
              <p className="cm-cta-footnote">Instant digital delivery · Lifetime access</p>
            </Col>
          </Row>
        </Container>
      </section>

    </article>
    </>
  );
}
