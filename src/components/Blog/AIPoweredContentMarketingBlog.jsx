import { useState, useEffect, useRef } from "react";
import SEO from '../SEO';
import { useParams, useNavigate } from 'react-router-dom';
import YouMayLike from '../YouMayLike';
import { Row, Col} from 'react-bootstrap';
import { useCart } from '../../pages/CartContext';

export default function AIPoweredContentMarketingBlog({ youMayLikeProducts }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 11, minutes: 47, seconds: 0 });
  const [visible, setVisible] = useState({});

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


  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) return { hours, minutes, seconds: seconds - 1 };
        if (minutes > 0) return { hours, minutes: minutes - 1, seconds: 59 };
        if (hours > 0) return { hours: hours - 1, minutes: 59, seconds: 59 };
        clearInterval(timer);
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible((v) => ({ ...v, [e.target.dataset.reveal]: true }));
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  const chapters = [
    {
      icon: "🎯",
      title: "Content Strategy",
      desc: "Prompts that build a solid content strategy aligned with clear, measurable goals — so every piece of content has a job to do.",
    },
    {
      icon: "🔍",
      title: "Audience Research",
      desc: "Understand exactly who you're talking to, what they search for, and what keeps them up at night — before you write a single word.",
    },
    {
      icon: "💡",
      title: "Idea Generation",
      desc: "Never stare at a blank page again. Generate blog posts, video scripts, email sequences, and social content on demand.",
    },
    {
      icon: "✍️",
      title: "Writing & Voice",
      desc: "Improve structure, sharpen your voice, and produce cleaner copy across every format — faster than you thought possible.",
    },
    {
      icon: "📈",
      title: "SEO & Performance",
      desc: "Optimise every piece for search engines and human readers at the same time. More reach, better rankings, higher click-through.",
    },
    {
      icon: "♻️",
      title: "Content Repurposing",
      desc: "Turn one piece of content into five. One blog post becomes a video script, email, carousel, and tweet thread — automatically.",
    },
    {
      icon: "📊",
      title: "Analytics & Improvement",
      desc: "Analyse what's working, understand why, and feed those insights back into your next campaign. Close the loop.",
    },
  ];

  const problems = [
    "Spending hours writing content that gets no traction",
    "Not knowing what to post or where to start",
    "Running out of ideas after the first few weeks",
    "Writing content that doesn't convert to sales",
    "Posting inconsistently because it takes too long",
  ];

  if (loading) {
    return (
      <div className="dlp-loading">
        <div className="dlp-spinner" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="dlp-loading">
        <div className="dlp-error-card">
          <h3>Blueprint unavailable</h3>
          <p>We couldn't find this offer, or it has expired.</p>
          <a href="/">Return to catalog</a>
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
      title="AI Powered Content Marketing: The Prompt Ebook That Replaces Your Content Team"
      description="Get 7 AI prompt packs covering strategy, audience research, writing, SEO, and repurposing. Create better content in less time."
      type="product"
    />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600&display=swap');

        :root {
          --navy: #0d1117;
          --navy-mid: #161b27;
          --violet: #7c5cfc;
          --violet-soft: rgba(124, 92, 252, 0.12);
          --violet-border: rgba(124, 92, 252, 0.3);
          --amber: #f59e0b;
          --surface: #f9f9fb;
          --card-bg: #ffffff;
          --ink: #111827;
          --muted: #6b7280;
          --border: #e5e7eb;
        }

        .aicm-wrap {
          font-family: 'DM Sans', sans-serif;
          background: var(--surface);
          color: var(--ink);
        }

        /* ── HERO ── */
        .aicm-hero {
          background: var(--navy);
          padding: 72px 0 80px;
          position: relative;
          overflow: hidden;
        }
        .aicm-hero::before {
          content: '';
          position: absolute;
          top: -120px; left: 50%;
          transform: translateX(-30%);
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(124,92,252,0.18) 0%, transparent 65%);
          pointer-events: none;
        }
        .aicm-hero::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--violet), transparent);
        }
        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--violet);
          border: 1px solid var(--violet-border);
          border-radius: 100px;
          padding: 5px 14px;
          margin-bottom: 28px;
        }
        .hero-tag::before {
          content: '';
          width: 6px; height: 6px;
          background: var(--violet);
          border-radius: 50%;
          display: inline-block;
        }
        .aicm-h1 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2.1rem, 5.5vw, 3.6rem);
          line-height: 1.1;
          color: #fff;
          margin-bottom: 22px;
          letter-spacing: -0.01em;
        }
        .aicm-h1 em {
          font-style: italic;
          color: var(--violet);
          background: linear-gradient(135deg, #a78bfa, #7c5cfc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-intro {
          font-size: 1.08rem;
          color: rgba(255,255,255,0.58);
          line-height: 1.75;
          max-width: 520px;
          margin-bottom: 36px;
        }
        .hero-meta {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.28);
          letter-spacing: 0.04em;
        }

        /* ── DISCOUNT BANNER ── */
        .discount-banner {
          background: linear-gradient(135deg, #1e1033, #2d1b6e);
          border: 1px solid var(--violet-border);
          border-radius: 12px;
          padding: 22px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 40px;
        }
        .discount-left p {
          margin: 0;
          font-size: 0.88rem;
          color: rgba(255,255,255,0.6);
        }
        .discount-left strong {
          color: var(--amber);
          font-size: 1rem;
        }
        .timer-boxes {
          display: flex;
          gap: 8px;
        }
        .timer-box {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 8px 14px;
          text-align: center;
          min-width: 52px;
        }
        .timer-box .num {
          font-family: 'DM Serif Display', serif;
          font-size: 1.4rem;
          color: #fff;
          line-height: 1;
          display: block;
        }
        .timer-box .lbl {
          font-size: 0.6rem;
          color: rgba(255,255,255,0.35);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* ── BODY ── */
        .aicm-body {
          padding: 72px 0;
        }
        .body-prose p {
          font-size: 1.05rem;
          line-height: 1.82;
          color: #2d2d2d;
          margin-bottom: 1.5rem;
        }
        .section-eyebrow {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 10px;
        }

        /* Pull quote */
        .pull-quote {
          border-left: 3px solid var(--violet);
          padding: 4px 0 4px 24px;
          margin: 2.5rem 0;
        }
        .pull-quote p {
          font-family: 'DM Serif Display', serif;
          font-size: 1.4rem;
          line-height: 1.45;
          color: var(--ink);
          margin: 0;
        }

        /* Problem list */
        .problem-list {
          list-style: none;
          padding: 0;
          margin: 28px 0;
        }
        .problem-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 0;
          border-bottom: 1px solid var(--border);
          font-size: 1rem;
          color: #374151;
          line-height: 1.5;
        }
        .problem-list li:last-child { border-bottom: none; }
        .problem-list li::before {
          content: '✗';
          color: #ef4444;
          font-weight: 700;
          font-size: 0.9rem;
          margin-top: 2px;
          flex-shrink: 0;
        }

        /* Chapter cards */
        .chapters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 16px;
          margin: 36px 0;
        }
        .chapter-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 24px 22px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .chapter-card:hover {
          border-color: var(--violet-border);
          box-shadow: 0 4px 24px rgba(124,92,252,0.08);
        }
        .chapter-icon {
          font-size: 1.5rem;
          margin-bottom: 12px;
          display: block;
        }
        .chapter-card h4 {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 8px;
        }
        .chapter-card p {
          font-size: 0.86rem;
          color: var(--muted);
          line-height: 1.6;
          margin: 0;
        }

        /* Reveal animation */
        [data-reveal] {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        [data-reveal].revealed {
          opacity: 1;
          transform: none;
        }

        /* Who it's for */
        .for-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 12px;
          margin: 24px 0;
        }
        .for-pill {
          background: var(--violet-soft);
          border: 1px solid var(--violet-border);
          border-radius: 10px;
          padding: 14px 16px;
          font-size: 0.88rem;
          font-weight: 500;
          color: #4c1d95;
          text-align: center;
          line-height: 1.4;
        }

        /* Value stack */
        .value-stack {
          background: var(--navy-mid);
          border: 1px solid rgba(124,92,252,0.2);
          border-radius: 14px;
          padding: 36px 32px;
          margin: 48px 0;
        }
        .value-stack h3 {
          font-family: 'DM Serif Display', serif;
          font-size: 1.4rem;
          color: #fff;
          margin-bottom: 24px;
        }
        .value-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          font-size: 0.92rem;
        }
        .value-row:last-of-type { border-bottom: none; }
        .value-row .item { color: rgba(255,255,255,0.65); }
        .value-row .price { color: rgba(255,255,255,0.3); text-decoration: line-through; }
        .value-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid var(--violet-border);
        }
        .value-total .label {
          font-weight: 600;
          color: #fff;
          font-size: 0.95rem;
        }
        .value-total .yours {
          font-family: 'DM Serif Display', serif;
          font-size: 1.6rem;
          color: var(--violet);
        }
        .value-total .save-badge {
          background: var(--amber);
          color: #000;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 9px;
          border-radius: 100px;
          margin-left: 10px;
          letter-spacing: 0.04em;
        }

        /* CTA */
        .aicm-cta {
          background: var(--navy);
          padding: 80px 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .aicm-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center bottom, rgba(124,92,252,0.15) 0%, transparent 60%);
          pointer-events: none;
        }
        .aicm-cta h2 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(1.7rem, 4vw, 2.5rem);
          color: #fff;
          margin-bottom: 16px;
        }
        .aicm-cta p {
          color: rgba(255,255,255,0.55);
          font-size: 1rem;
          max-width: 440px;
          margin: 0 auto 36px;
          line-height: 1.7;
        }
        .btn-violet {
          background: linear-gradient(135deg, #a78bfa, #7c5cfc);
          color: #fff;
          font-weight: 600;
          font-size: 1rem;
          padding: 16px 44px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: opacity 0.15s, transform 0.15s;
          display: inline-block;
          text-decoration: none;
          box-shadow: 0 8px 32px rgba(124,92,252,0.35);
        }
        .btn-violet:hover {
          opacity: 0.9;
          transform: translateY(-2px);
          color: #fff;
        }
        .cta-reassure {
          margin-top: 18px;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.28);
          letter-spacing: 0.04em;
        }

        @media (max-width: 576px) {
          .aicm-hero { padding: 52px 0 60px; }
          .discount-banner { flex-direction: column; }
          .value-stack { padding: 24px 18px; }
          .aicm-body { padding: 52px 0; }
        }
            .dlp-price-row {
        display: flex;
        align-items: baseline;
        gap: 0.6rem;
        margin: 0.6rem 0 0.25rem;
      }

      .dlp-price-final {
        font-size: 2.2rem;
        font-weight: 900;
        color: black;
        line-height: 1;
      }

      .dlp-price-original {
        font-size: 1.1rem;
        color: red;
        text-decoration: line-through;
      }
      `}</style>

      <div className="aicm-wrap">

        {/* ── HERO ── */}
        <section className="aicm-hero">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <span className="hero-tag">AI · Content Marketing · Ebook</span>
                <h1 className="aicm-h1">
                  Stop guessing what to post.<br />
                  Start creating content that <em>actually works.</em>
                </h1>
                <p className="hero-intro">
                  Most content creators are wasting hours on content nobody reads.
                  This ebook gives you the exact AI prompts to build a strategy,
                  generate ideas, write faster, rank higher — and stop starting from scratch every time.
                </p>
                <p className="hero-meta">7 min read &nbsp;·&nbsp; Yeilvastore Digital Library</p>

                {/* Discount countdown */}
                <div className="discount-banner">
                  <div className="discount-left">
                    <strong>Save 10% today only</strong>
                    <p>Limited-time discount — price goes back up when the timer hits zero.</p>
                  </div>
                  <div className="timer-boxes">
                    <div className="timer-box">
                      <span className="num">{pad(timeLeft.hours)}</span>
                      <span className="lbl">hrs</span>
                    </div>
                    <div className="timer-box">
                      <span className="num">{pad(timeLeft.minutes)}</span>
                      <span className="lbl">min</span>
                    </div>
                    <div className="timer-box">
                      <span className="num">{pad(timeLeft.seconds)}</span>
                      <span className="lbl">sec</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── BODY ── */}
        <section className="aicm-body">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7 col-md-10">

                {/* Problem */}
                <p className="section-eyebrow">The real problem</p>
                <div className="body-prose">
                  <p>
                    Content marketing is supposed to grow your business. But for most people,
                    it feels like shouting into a void — spending hours crafting posts, blogs,
                    and emails that get ignored, forgotten, or buried in an algorithm.
                  </p>
                  <p>
                    It's not that content marketing doesn't work. It's that most people
                    are doing it without a system. They post when they feel like it,
                    write about whatever comes to mind, and hope something sticks.
                    It never does.
                  </p>
                </div>

                <div data-reveal="problems" className={visible.problems ? "revealed" : ""}>
                  <ul className="problem-list">
                    {problems.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>

                <div className="pull-quote">
                  <p>"The difference between content that converts and content that disappears is a strategy — and now AI can build it for you in minutes."</p>
                </div>

                {/* Solution */}
                <p className="section-eyebrow mt-5">What's inside the ebook</p>
                <div className="body-prose">
                  <p>
                    <strong>AI Powered Content Marketing</strong> is a prompt-based ebook
                    designed for one purpose: to give you the exact inputs so AI does
                    the heavy lifting across every stage of your content workflow.
                    Not vague advice — actual prompts, ready to copy and use today.
                  </p>
                </div>

                <div
                  data-reveal="chapters"
                  className={`chapters-grid ${visible.chapters ? "revealed" : ""}`}
                >
                  {chapters.map((c, i) => (
                    <div className="chapter-card" key={i}>
                      <span className="chapter-icon">{c.icon}</span>
                      <h4>{c.title}</h4>
                      <p>{c.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Who it's for */}
                <p className="section-eyebrow mt-4">Who this is for</p>
                <div className="for-grid" data-reveal="audience" className={visible.audience ? "for-grid revealed" : "for-grid"}>
                  {["Solo creators", "Small business owners", "Freelance writers", "Digital marketers", "Coaches & consultants", "Ecom store owners"].map((w, i) => (
                    <div className="for-pill" key={i}>{w}</div>
                  ))}
                </div>

                <div className="body-prose mt-4">
                  <p>
                    You don't need to be a marketing expert. You don't need a big team or
                    a big budget. You just need the right prompts — and this ebook gives
                    you all of them, organised by exactly where you are in your content process.
                  </p>
                </div>

                {/* Value stack */}
                <div data-reveal="value" className={visible.value ? "revealed" : ""}>
                  <div className="value-stack">
                    <h3>What you get</h3>
                    {[
                      ["Content Strategy Prompt Pack", "₱1120"],
                      ["Audience Research Prompt Pack", "$1120"],
                      ["Idea Generation Prompt Pack", "$715"],
                      ["Writing & Voice Prompt Pack", "$715"],
                      ["SEO Optimisation Prompt Pack", "$1120"],
                      ["Repurposing Prompt Pack", "$715"],
                      ["Analytics & Improvement Pack", "$715"],
                    ].map(([item, price], i) => (
                      <div className="value-row" key={i}>
                        <span className="item">{item}</span>
                        <span className="price">{price}</span>
                      </div>
                    ))}
                    <div className="value-total">
                      <span className="label">
                        Your price today
                        <span className="save-badge">SAVE 10%</span>
                      </span>
                      <span className="yours">{fmt(finalPrice)}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="aicm-cta">
          <div className="container position-relative">
            <h2>Your content strategy starts today.</h2>
            <p>
              Get every prompt, every pack, every shortcut —
              for just {fmt(finalPrice)} while the discount lasts.
            </p>
               <button           
              className="btn-signal"
             onClick={handleCheckout}
            >
              Get the ebook → <div className="dlp-price-row">
                    <span className="dlp-price-final">{fmt(finalPrice)}</span>
                    {discountPct > 0 && (
                      <span className="dlp-price-original">{fmt(originalPrice)}</span>
                    )}
                  </div> 
            </button>
            <p className="cta-reassure">Instant download · No subscriptions · Use forever</p>
          </div>
        </section>
  {/* "You May Like" Section */}
        <Row className="my-5">
          <Col xs={12}>
            <YouMayLike addToCart={addToCart}  youMayLikeProducts={youMayLikeProducts} />
          </Col>
        </Row>
      </div>
    </>
  );
}
