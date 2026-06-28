import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DynamicLandingPage.css';
import SEO from '../SEO';
import LeadMagnetQuiz from './LeadMagnetQuiz';

// ─── Countdown: computes distance to a deadline ───────────────────────────────
function useCountdown(targetDate) {
  const calc = () => {
    const diff = targetDate - Date.now();
    if (diff <= 0) return { h: 0, m: 0, s: 0 };
    return {
      h: Math.floor(diff / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return time;
}

function pad(n) { return String(n).padStart(2, '0'); }

// Deadline = 8 hrs from first load, stable for the session
const SESSION_DEADLINE = Date.now() + 8 * 3600 * 1000;

export default function DynamicLandingPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const countdown = useCountdown(SESSION_DEADLINE);

  useEffect(() => {
    if (!slug) return;
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/landingproduct/${slug}`)
      .then((res) => { if (!res.ok) throw new Error('Not found'); return res.json(); })
      .then((data) => { data ? setProduct(data) : setError(true); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, [slug]);

  // Show sticky bar once hero scrolls out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, [product]);

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

  const contents = [
    'Module 1: Choosing your niche & validating demand',
    'Module 2: Setting up your anonymous digital storefront',
    'Module 3: Sourcing or creating your first product',
    'Module 4: Automated traffic & global payment setup',
    'Module 5: Scaling to multiple income streams',
    'Bonus: Swipe-file templates & vendor directory',
  ];

  return (
    <>
      <SEO
        title={name || 'Premium Digital Blueprint'}
        description={description || 'Get instant access to this exclusive digital guide.'}
        type="product"
      />

      {/* ── COUNTDOWN BANNER ─────────────────────────────────────────────── */}
      <div className="dlp-banner">
        <span className="dlp-banner-text">
          ⚡ Price increases when this timer hits zero —&nbsp;
        </span>
        <span className="dlp-timer">
          {pad(countdown.h)}:{pad(countdown.m)}:{pad(countdown.s)}
        </span>
      </div>

      <div className="dlp-root">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <header className="dlp-hero" ref={heroRef}>
          <div className="dlp-hero-glow" aria-hidden="true" />
          <div className="dlp-container dlp-hero-inner">

            {/* Left: headline + image */}
            <div className="dlp-hero-left">
              {discountPct > 0 && (
                <span className="dlp-badge dlp-badge-fire">🔥 Save {discountPct}% today</span>
              )}
              <h1 className="dlp-headline">
                {name || 'Launch Your First Faceless Digital Store This Weekend'}
              </h1>
              <p className="dlp-subhead">
                {description || 'Discover the proven, anonymous frameworks to generate consistent revenue worldwide — no personal brand, no camera, no audience required.'}
              </p>

              {/* Star rating */}
              <div className="dlp-stars">
                <span className="dlp-stars-filled">★★★★★</span>
                <span className="dlp-stars-label">4.9 / 5 — 240+ buyers</span>
              </div>

              {/* Product image — static, no fake play button */}
              <div className="dlp-product-image-wrap">
                <img
                  src={cleanProductUrl || `${process.env.PUBLIC_URL}/images/acaiberry.jpg`}
                  alt={name || 'Product Blueprint Preview'}
                  className="dlp-product-image"
                />
                <img
                  src={`${process.env.PUBLIC_URL}/digital/businessblueprint1.png`}
                  alt="Blueprint preview pages"
                  className="dlp-product-image"
                />
                <div className="dlp-image-badge">📄 Instant access — PDF + resource links</div>
              </div>
            </div>

            {/* Right: single purchase card */}
            <div className="dlp-hero-right">
              <div className="dlp-purchase-card">

                <div className="dlp-purchase-card-header">
                  <span className="dlp-badge dlp-badge-info">Instant digital delivery</span>
                  <div className="dlp-price-row">
                    <span className="dlp-price-final">{fmt(finalPrice)}</span>
                    {discountPct > 0 && (
                      <span className="dlp-price-original">{fmt(originalPrice)}</span>
                    )}
                  </div>
                  <p className="dlp-price-caption">
                    Lifetime access to <strong>{name || 'this blueprint'}</strong>. No subscription.
                  </p>
                </div>

                {/* What you get — tangible list */}
                <ul className="dlp-includes-list">
                  <li>✓ Full {name || 'blueprint'} PDF ({contents.length} modules)</li>
                  <li>✓ Bonus swipe-file templates & vendor directory</li>
                  <li>✓ Delivered to your inbox within 60 seconds</li>
                  <li>✓ Lifetime access — all future updates included</li>
                </ul>

                {/* Primary CTA */}
                <button className="dlp-cta-btn" onClick={handleCheckout}>
                  Yes, I want instant access →
                </button>

                {/* Trust signals */}
                <div className="dlp-trust-row">
                  <span>🔒 256-bit SSL</span>
                  <span>↩ 30-day refund</span>
                  <span>📧 Instant delivery</span>
                </div>


              </div>
            </div>

          </div>
        </header>

        {/* ── WHAT'S INSIDE ─────────────────────────────────────────────────── */}
        <section className="dlp-section dlp-section-white">
          <div className="dlp-container">
            <div className="dlp-section-header">
              <h2>What's inside the blueprint</h2>
              <p>Six modules built around one goal: your first international sale.</p>
            </div>

            <div className="dlp-contents-grid">
              {contents.map((item, i) => (
                <div className="dlp-contents-item" key={i}>
                  <span className="dlp-contents-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="dlp-contents-text">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BENEFITS ─────────────────────────────────────────────────────── */}
        <section className="dlp-section dlp-section-light">
          <div className="dlp-container">
            <div className="dlp-section-header">
              <h2>Why this blueprint works</h2>
              <p>Operational frameworks built for modern digital scaling.</p>
            </div>

            <div className="dlp-benefits-grid">
              <div className="dlp-benefit-card">
                <div className="dlp-benefit-icon">🌐</div>
                <h3>{benefit_1_title || 'Borderless scalability'}</h3>
                <p>{benefit_1_desc || 'Configure systems that source revenue from tier-1 countries completely on autopilot.'}</p>
              </div>
              <div className="dlp-benefit-card">
                <div className="dlp-benefit-icon">⏳</div>
                <h3>{benefit_2_title || 'Zero-presence architecture'}</h3>
                <p>{benefit_2_desc || 'Complete breakdown of running businesses through digital assets and automation — no face, no voice.'}</p>
              </div>
              <div className="dlp-benefit-card">
                <div className="dlp-benefit-icon">🚀</div>
                <h3>{benefit_3_title || 'Proven blueprints'}</h3>
                <p>{benefit_3_desc || 'Step-by-step checklists letting you choose, launch, and optimize your first stream this weekend.'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SOCIAL PROOF ──────────────────────────────────────────────────── */}
        <section className="dlp-section dlp-section-white">
          <div className="dlp-container">
            <div className="dlp-section-header">
              <h2>Results from real buyers</h2>
            </div>

            <div className="dlp-testimonials-grid">
              <div className="dlp-testimonial">
                <div className="dlp-testimonial-stars">★★★★★</div>
                <p>"I was skeptical because I hate being on video. Used model #4 and pulled my first international sale in 72 hours. Made ₱18,400 in my first month."</p>
                <div className="dlp-testimonial-author">
                  <div className="dlp-testimonial-avatar">M</div>
                  <div>
                    <strong>Marcus V.</strong>
                    <span>Freelance developer, Philippines</span>
                  </div>
                </div>
              </div>
              <div className="dlp-testimonial">
                <div className="dlp-testimonial-stars">★★★★★</div>
                <p>"The automated workflow breakdown saved me weeks of research. Had 3 stores live within 2 weeks. Worth every peso — and then some."</p>
                <div className="dlp-testimonial-author">
                  <div className="dlp-testimonial-avatar">S</div>
                  <div>
                    <strong>Sarah T.</strong>
                    <span>Former BPO employee, Cebu</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── LEAD MAGNET (for not-ready-to-buy visitors) ───────────────────── */}
        <section className="dlp-section dlp-section-light">
          <div className="dlp-container">
            <div className="dlp-section-header">
              <h2>Not ready to buy yet? Find your fit first.</h2>
              <p>Take the 60-second quiz to see which faceless model matches your time, skills, and comfort level.</p>
            </div>
            <LeadMagnetQuiz
              variant="light"
              source={`landing-${slug || 'unknown'}`}
            />
          </div>
        </section>

        {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
        <section className="dlp-section dlp-section-dark">
          <div className="dlp-container dlp-bottom-cta">
            <h2>Ready to launch your first faceless store?</h2>
            <p>Join 240+ buyers who used this blueprint to build income streams outside their 9-to-5.</p>
            <div className="dlp-bottom-price-row">
              <span className="dlp-price-final dlp-price-light">{fmt(finalPrice)}</span>
              {discountPct > 0 && (
                <span className="dlp-price-original dlp-price-original-light">{fmt(originalPrice)}</span>
              )}
            </div>
            <button className="dlp-cta-btn dlp-cta-btn-light" onClick={handleCheckout}>
              Yes, I want instant access →
            </button>
            <p className="dlp-bottom-guarantee">🛡️ 30-day money-back guarantee · 🔒 Secure checkout</p>
          </div>
        </section>

      </div>

      {/* ── STICKY MOBILE BAR ────────────────────────────────────────────── */}
      <div className={`dlp-sticky-bar ${stickyVisible ? 'dlp-sticky-bar--visible' : ''}`}>
        <div className="dlp-sticky-inner">
          <div className="dlp-sticky-price">
            <span className="dlp-sticky-final">{fmt(finalPrice)}</span>
            {discountPct > 0 && <span className="dlp-sticky-original">{fmt(originalPrice)}</span>}
          </div>
          <button className="dlp-cta-btn dlp-cta-btn-sticky" onClick={handleCheckout}>
            Get instant access →
          </button>
        </div>
      </div>
    </>
  );
}
