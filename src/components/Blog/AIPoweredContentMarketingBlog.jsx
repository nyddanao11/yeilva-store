import { useState, useEffect, useRef } from "react";
import SEO from '../SEO';
import { useParams, useNavigate } from 'react-router-dom';
import YouMayLike from '../YouMayLike';
import { Row, Col} from 'react-bootstrap';
import { useCart } from '../../pages/CartContext';
import'./AIPoweredContentMarketingBlog.css';


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

  useEffect(() => {
  const timer = setTimeout(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = entry.target.dataset.reveal;
            setVisible((prev) => ({ ...prev, [key]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, 100); // small delay lets the DOM settle

  return () => clearTimeout(timer);
}, []);
  
  const pad = (n) => String(n).padStart(2, "0");

  

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
      title="AI Powered Content Marketing: The Prompt Ebook That Replaces Your Content Team"
      description="Get 7 AI prompt packs covering strategy, audience research, writing, SEO, and repurposing. Create better content in less time."
      type="product"
    />
    

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

                <div >
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
                <div className="for-grid" >
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
                <div >
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
