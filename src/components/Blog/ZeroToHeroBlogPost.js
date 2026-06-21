import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../pages/CartContext';
import './ZeroToHeroBlogPost.css';
import SEO from '../SEO';

 const steps = [
    {
      label: 'Zero',
      title: 'Pick the right topics',
      summary: 'Stop guessing what to post about',
      body: 'Most people stall before they even start — staring at a blank page, unsure what\'s even worth posting. This step gives you a simple way to choose topics and content types that actually fit you, so you stop second-guessing every idea before it gets a chance.',
    },
    {
      label: 'Level 1',
      title: 'Build a strategy that lasts',
      summary: 'A simple plan that works long-term',
      body: 'A strategy doesn\'t need to be complicated to work — it needs to survive contact with a busy week. You\'ll build a lightweight content strategy designed to hold up months from now, not just for your first burst of motivation.',
    },
    {
      label: 'Level 2',
      title: 'Stay consistent, skip the burnout',
      summary: 'Clear steps for showing up without crashing',
      body: 'Consistency is usually framed as a discipline problem. It\'s actually a design problem. This step walks through how to post regularly without it costing you your evenings — so "consistent" doesn\'t quietly turn into "exhausted."',
    },
    {
      label: 'Level 3',
      title: 'Create faster with tools and templates',
      summary: 'Less staring at blank pages',
      body: 'Once your topics and rhythm are sorted, speed comes from not rebuilding the wheel every time. You\'ll get tools and templates that cut the time between "I have an idea" and "it\'s published" — without making the content feel templated.',
    },
    {
      label: 'Hero',
      title: 'See it actually work',
      summary: 'Real creators, real results',
      body: 'The last step is proof. You\'ll see real examples of creators who went through this exact process and turned consistent content into real, measurable results — so you know this isn\'t theory, it\'s a path other people have already walked.',
    },
  ];

export default function ZeroToHeroBlogPost() {
  const [activeStep, setActiveStep] = useState(0);

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
        title="From Zero to Content Hero: The Beginner's Guide to Consistent Content"
        description="Learn how to pick the right topics, build a strategy that lasts, stay consistent without burning out, and use tools that make content faster — with real creator examples."
        type="product"
      />
    <article className="zth-post">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <header className="zth-hero">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <span className="zth-eyebrow">THE GUIDE</span>
              <h1 className="zth-hero-title">
                From <span className="zth-hero-fade">Zero</span> to{' '}
                <span className="zth-hero-accent">Content Hero</span>
              </h1>
              <p className="zth-hero-sub">
                You don't need more motivation. You need a path — five steps
                from "I don't know what to post" to "I have a system that works."
              </p>
            </Col>
          </Row>
        </Container>
      </header>

      {/* ── ASCENDING STAIRCASE (signature element) ─────────────────── */}
      <section className="zth-staircase-section">
        <Container>
          <div className="zth-staircase" role="list" aria-label="The five steps from zero to content hero">
            {steps.map((s, i) => (
              <button
                key={i}
                className={`zth-step zth-step--${i} ${activeStep === i ? 'zth-step--active' : ''} ${activeStep > i ? 'zth-step--passed' : ''}`}
                onClick={() => setActiveStep(i)}
                role="listitem"
                aria-pressed={activeStep === i}
                aria-label={`${s.label}: ${s.title}`}
              >
                <span className="zth-step-platform">
                  <span className="zth-step-label">{s.label}</span>
                </span>
              </button>
            ))}
          </div>

          {/* Active step detail */}
          <div className="zth-detail">
            <span className="zth-detail-tag">{steps[activeStep].label.toUpperCase()}</span>
            <h3>{steps[activeStep].title}</h3>
            <p className="zth-detail-summary">{steps[activeStep].summary}</p>
            <p className="zth-detail-body">{steps[activeStep].body}</p>
          </div>
        </Container>
      </section>

      {/* ── INTRO COPY ──────────────────────────────────────────────── */}
      <section className="zth-section zth-section--light">
        <Container>
          <Row className="justify-content-center">
            <Col lg={7}>
              <p className="zth-lede">
                Everyone starts at zero. The difference between the people who
                quit after three posts and the people who build something
                real isn't talent — it's having a path to follow when the
                initial excitement wears off.
              </p>
              <p className="zth-body-text">
                <em>From Zero to Content Hero</em> is that path. Five steps,
                in order, each one solving the exact thing that trips people
                up next: what to post, how to plan it, how to stay consistent,
                how to make it faster, and proof that it actually pays off.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ── WHAT'S INSIDE — card grid ────────────────────────────────── */}
      <section className="zth-section zth-section--dark">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={6} className="text-center">
              <span className="zth-eyebrow zth-eyebrow--light">WHAT'S INSIDE</span>
              <h2 className="zth-section-title zth-section-title--light">
                Five steps. One path forward.
              </h2>
            </Col>
          </Row>

          <Row className="g-4">
            {steps.map((s, i) => (
              <Col md={6} lg={4} key={i}>
                <div className="zth-card">
                  <span className="zth-card-label">{s.label}</span>
                  <h3 className="zth-card-title">{s.title}</h3>
                  <p className="zth-card-desc">{s.body}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

       {/* ── CLOSING CTA ─────────────────────────────────────────────── */}
      <section className="zth-section zth-section--light zth-cta-section">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={6}>
              <h2 className="zth-cta-title">Your hero arc starts on page one.</h2>
              <p className="zth-cta-sub">
                Get the guide and go from "what do I even post" to a system
                that runs itself.
              </p>

              <button
                type="button"
                className="zth-cta-btn"
                onClick={handleCheckout}
                aria-label={`Get the guide for ${fmt(finalPrice)}`}
              >
                <span className="zth-cta-btn-main">
                  Get the guide
                  <span className="zth-cta-btn-arrow" aria-hidden="true">→</span>
                </span>
                <span className="zth-cta-btn-divider" aria-hidden="true" />
                <span className="zth-cta-btn-price">
                  <span className="zth-cta-btn-price-final">{fmt(finalPrice)}</span>
                  {discountPct > 0 && (
                    <span className="zth-cta-btn-price-original">{fmt(originalPrice)}</span>
                  )}
                </span>
              </button>

              <p className="zth-cta-footnote">
                🔒 Secure checkout ·  Instant digital delivery
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </article>
    </>
  );
}
