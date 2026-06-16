import { useState, useEffect, useRef } from "react";
import SEO from '../SEO';
import { useParams, useNavigate } from 'react-router-dom';
import YouMayLike from '../YouMayLike';
import { Row, Col} from 'react-bootstrap';
import { useCart } from '../../pages/CartContext';
import './FacelessProfitBlogPost.css';

export default function FacelessProfitBlogPost({ youMayLikeProducts }) {
   const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
 const [openModel, setOpenModel] = useState(null);
  const [visible, setVisible] = useState({});

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

 const [scrolled, setScrolled] = useState(false);

 useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            setVisible((v) => ({ ...v, [e.target.dataset.reveal]: true }));
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const models = [
    { id: 1,  icon: "📄", title: "Faceless Digital Products",      teaser: "Sell ebooks, templates, or guides — no name, no face required.",         category: "Digital Products" },
    { id: 2,  icon: "🤖", title: "AI-Generated Content Stores",    teaser: "Use AI to produce and sell content at scale without lifting a pen.",      category: "AI & Automation" },
    { id: 3,  icon: "🎙️", title: "Faceless Podcast",               teaser: "Build an audio brand around a topic — no personal identity needed.",       category: "Content" },
    { id: 4,  icon: "📺", title: "Faceless YouTube Channel",       teaser: "Screen recordings, animations, voiceovers — no on-camera presence.",      category: "Content" },
    { id: 5,  icon: "📧", title: "Niche Newsletter",               teaser: "Curate and deliver niche content to an email list that pays over time.",   category: "Content" },
    { id: 6,  icon: "🛒", title: "Print-on-Demand Store",          teaser: "Design once, sell forever — fulfilment handled entirely automatically.",   category: "Ecommerce" },
    { id: 7,  icon: "🔗", title: "Affiliate Marketing Blog",       teaser: "Write SEO articles that earn commission from products you never touch.",   category: "Affiliate" },
    { id: 8,  icon: "📌", title: "Faceless Pinterest Business",    teaser: "Drive traffic to offers with pins — zero followers, no personal profile.", category: "Social" },
    { id: 9,  icon: "🧩", title: "Canva Template Shop",            teaser: "Sell ready-made design templates to businesses and creators globally.",    category: "Digital Products" },
    { id: 10, icon: "💻", title: "Software / SaaS Micro-Tool",     teaser: "Launch a niche tool or widget — no-code platforms make it accessible.",   category: "AI & Automation" },
    { id: 11, icon: "📚", title: "Online Course (No Camera)",      teaser: "Teach skills using slides, audio, and screen recordings only.",            category: "Digital Products" },
    { id: 12, icon: "🏪", title: "Dropshipping Store",             teaser: "Sell physical products without handling inventory or fulfilment.",         category: "Ecommerce" },
    { id: 13, icon: "🖊️", title: "Ghostwriting Service",           teaser: "Write under other people's names — your skills, their brand.",             category: "Services" },
    { id: 14, icon: "📊", title: "Data & Research Reports",        teaser: "Package valuable data into paid reports for businesses and investors.",    category: "Digital Products" },
    { id: 15, icon: "🌐", title: "Niche Website / Web Publisher",  teaser: "Build informational sites that earn from ads, affiliates, and sponsorship.", category: "Affiliate" },
    { id: 16, icon: "🎨", title: "Stock Asset Store",              teaser: "Sell photos, vectors, music, or footage on autopilot across platforms.",   category: "Digital Products" },
    { id: 17, icon: "🤝", title: "Done-For-You Prompt Packs",      teaser: "Package and sell curated AI prompt libraries to businesses and creators.", category: "AI & Automation" },
    { id: 18, icon: "📱", title: "Faceless TikTok / Reels",        teaser: "Text, voiceover, screen content — no face, massive organic reach.",       category: "Social" },
    { id: 19, icon: "🔒", title: "Membership / Community",         teaser: "Charge monthly access to a private group, resource vault, or newsletter.", category: "Content" },
    { id: 20, icon: "📦", title: "Digital Bundle Store",           teaser: "Bundle existing digital products into high-value packs for more per sale.", category: "Digital Products" },
    { id: 21, icon: "⚙️", title: "Automation & Systems Agency",    teaser: "Sell business automations and workflows — delivered digitally, not in person.", category: "AI & Automation" },
  ];

  const categories = [...new Set(models.map((m) => m.category))];
  const categoryColors = {
    "Digital Products": "#00e5a0",
    "AI & Automation":  "#a78bfa",
    "Content":          "#38bdf8",
    "Ecommerce":        "#fb923c",
    "Affiliate":        "#facc15",
    "Social":           "#f472b6",
    "Services":         "#4ade80",
  };

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
      title="Faceless Profit Model: Make Money Online Without Showing Your Face"
      description="Discover the exact system people are using to sell digital products online — no camera, no followers, no experience needed."
      type="product"
    />

   

      <div className="fp-wrap">

        {/* ── HERO ── */}
        <section className="fp-hero">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <span className="fp-eyebrow">Faceless Business · Digital Income · Global</span>
                <h1 className="fp-h1">
                  21 ways to earn online —{" "}
                  <span className="accent">without ever showing your face.</span>
                </h1>
                <p className="fp-sub">
                  Privacy. Freedom. Smart systems. The Faceless Profit Model is a
                  collection of 21 proven business models already generating real income
                  for real people — no camera, no followers, no personal brand required.
                </p>
                <div className="fp-hero-stats">
                  <div className="fp-stat">
                    <span className="num">21</span>
                    <span className="lbl">Proven models</span>
                  </div>
                  <div className="fp-stat">
                   <div className="dlp-price-row">
                    <span className="dlp-price-final">{fmt(finalPrice)}</span>
                    {discountPct > 0 && (
                      <span className="dlp-price-original">{fmt(originalPrice)}</span>
                    )}
                  </div>
                    <span className="lbl">One-time investment</span>
                  </div>
                  <div className="fp-stat">
                    <span className="num">0</span>
                    <span className="lbl">Camera needed</span>
                  </div>
                </div>
                <p className="fp-meta">6 min read &nbsp;·&nbsp; Yeilvastore</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── BODY ── */}
        <section className="fp-body">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7 col-md-10">

                {/* Problem */}
                <p className="section-label">The myth holding you back</p>
                <div className="fp-prose">
                  <p>
                    The internet has sold most people a very specific version of online success:
                    build a personal brand, show your face, go viral, get followers —
                    then maybe, eventually, you'll make money. It's exhausting. And for
                    a lot of people, it's also the reason they never start.
                  </p>
                  <p>
                    But here's what's actually true: thousands of people are earning
                    consistent online income without a public identity, without a
                    following, and without ever appearing on camera. They're doing it
                    quietly, using systems — not personalities.
                  </p>
                </div>

                <div className="fp-callout">
                  "You don't need to be known. You just need a model that works while you're not watching."
                </div>

                {/* What's inside */}
                <div
                  data-reveal="inside"
                  className={visible.inside ? "revealed" : ""}
                >
                  <div className="inside-box">
                    <h3>What's inside the ebook</h3>
                    <ul className="inside-list">
                      {[
                        "21 proven faceless business models that are already generating real income",
                        "Simple explanations that make each model easy to understand and apply — no jargon",
                        "A wide range of ideas across content, digital products, and online platforms",
                        "Real examples that show exactly how these businesses work in practice",
                        "A strong focus on privacy, freedom, and building smart systems that run themselves",
                      ].map((item, i) => (
                        <li key={i}>
                          <span className="check">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 21 Models */}
                <p className="section-label">All 21 models — tap any to preview</p>
                <div className="fp-prose models-intro">
                  <p>
                    Each model inside the ebook is broken down simply — what it is,
                    how it works, and how real people are using it right now. Here's
                    every one of them:
                  </p>
                </div>

                <div
                  data-reveal="models"
                  className={visible.models ? "revealed" : ""}
                >
                  <div className="models-grid">
                    {models.map((m) => {
                      const color = categoryColors[m.category] || "#00e5a0";
                      const isOpen = openModel === m.id;
                      return (
                        <div
                          key={m.id}
                          className={`model-card${isOpen ? " open" : ""}`}
                          onClick={() => setOpenModel(isOpen ? null : m.id)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === "Enter" && setOpenModel(isOpen ? null : m.id)}
                        >
                          <span className="model-arrow">▼</span>
                          <div className="model-num">#{String(m.id).padStart(2, "0")}</div>
                          <span className="model-icon">{m.icon}</span>
                          <div className="model-title">{m.title}</div>
                          <span
                            className="model-cat-badge"
                            style={{
                              background: `${color}18`,
                              color: color === "#facc15" ? "#92620a" : color === "#4ade80" ? "#0a6030" : color,
                              border: `1px solid ${color}40`,
                            }}
                          >
                            {m.category}
                          </span>
                          <p className="model-teaser">{m.teaser}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Core pillars */}
                <p className="section-label">The three things every model is built on</p>
                <div
                  data-reveal="pillars"
                  className={visible.pillars ? "revealed" : ""}
                >
                  <div className="pillars-grid">
                    <div className="pillar-card">
                      <span className="p-icon">🔒</span>
                      <strong>Privacy</strong>
                      <p>Your identity stays yours. No public persona, no personal exposure.</p>
                    </div>
                    <div className="pillar-card">
                      <span className="p-icon">🌍</span>
                      <strong>Global Income</strong>
                      <p>Sell to anyone, anywhere. No geographic limits on who can buy.</p>
                    </div>
                    <div className="pillar-card">
                      <span className="p-icon">⚙️</span>
                      <strong>Smart Systems</strong>
                      <p>Set up once, keep earning. The model does the work, not you.</p>
                    </div>
                  </div>
                </div>

                {/* Who it's for */}
                <p className="section-label">This is for you if…</p>
                <div className="for-strip">
                  {[
                    "You're camera-shy",
                    "You value your privacy",
                    "You're starting from zero",
                    "You want passive income",
                    "You have no existing audience",
                    "You want location freedom",
                    "You're tired of trading time for money",
                  ].map((w, i) => (
                    <span className="for-pill" key={i}>{w}</span>
                  ))}
                </div>

                <div className="fp-prose">
                  <p>
                    You don't need experience. You don't need startup capital.
                    You don't need to already be an entrepreneur. You just need
                    to pick one of these 21 models, understand how it works,
                    and take the first step. The ebook gives you everything
                    to do exactly that — all for the price of a coffee.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="fp-cta">
          <div className="container position-relative">
            <h2>21 models.  Start today.</h2>
            <p className="sub">
              Pick the model that fits your life. The ebook shows you exactly
              how each one works — and how to get moving right now.
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
            <p className="cta-micro">Instant download · No camera needed · No experience required</p>
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
