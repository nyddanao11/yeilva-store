import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import'./AiContentVaultBlogPost.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../pages/CartContext';
import SEO from '../SEO';

// NOTE: swap react-helmet-async for whichever SEO/Helmet setup your other
// blog components (ContentMachineBlogPost, ZeroToHeroBlogPost) already use.
// NOTE: <a> tags are used for all CTAs/breadcrumbs below for portability —
// swap for <Link> from react-router-dom to match your /blog/:slug + store routing.

// ---------------------------------------------------------------------------
// Data — the 10 "compartments" (kept short/teaser; full 113 prompts live
// in the actual Vault product, this is the hook to get there)
// ---------------------------------------------------------------------------
const COMPARTMENTS = [
  {
    num: "01",
    label: "Niche & Audience",
    blurb: "Know exactly who you're talking to before you write a word.",
    example:
      "List the 10 biggest frustrations, fears, and unanswered questions someone interested in [topic] has, ranked from most urgent to least.",
  },
  {
    num: "02",
    label: "Ideas & Hooks",
    blurb: "For when you know your niche but the cursor is still blinking.",
    example:
      "Write 10 scroll-stopping hooks for content about [topic], using curiosity, fear, or bold claims — no clickbait the content can't deliver on.",
  },
  {
    num: "03",
    label: "Scriptwriting",
    blurb: "Turn a hook into something you can actually record today.",
    example:
      "Write a 45–60 second script for a [topic] video aimed at [audience]: hook, problem, insight, payoff, CTA.",
  },
  {
    num: "04",
    label: "Repurposing",
    blurb: "One video, rewritten into a week's worth of content.",
    example:
      "Take this video transcript and break it into 5 standalone short-form video ideas, each with its own hook: [paste transcript].",
  },
  {
    num: "05",
    label: "Captions & Copy",
    blurb: "The words next to your content, doing as much work as the content.",
    example:
      "Write a caption for [platform] about [topic] that ends with a clear, low-friction call to action.",
  },
  {
    num: "06",
    label: "Titles & Thumbnails",
    blurb: "The best video with the worst title still gets zero views.",
    example:
      "Write 10 title variations for [topic], mixing curiosity gaps, numbers, and direct benefit statements.",
  },
  {
    num: "07",
    label: "Email & Newsletter",
    blurb: "The list the algorithm can't take away from you.",
    example:
      "Outline a 3-email launch sequence for [product]: problem/story, solution/proof, urgency/close.",
  },
  {
    num: "08",
    label: "SEO & Blog",
    blurb: "Content that keeps working for you months after you hit publish.",
    example:
      "Create an SEO-friendly blog outline for the keyword '[keyword]', with H2s matching real search intent.",
  },
  {
    num: "09",
    label: "Calendar & Planning",
    blurb: "Turns a pile of ideas into an actual posting rhythm.",
    example:
      "Build a 10-day content calendar leading up to the launch of [product], mixing value, story, and promotion.",
  },
  {
    num: "10",
    label: "Engagement",
    blurb: "Where most creators stop trying — and where loyalty gets built.",
    example:
      "Write a calm, non-defensive reply to this critical comment, addressing the point fairly: [paste comment].",
  },
];

const CHAIN_STEPS = [
  { step: "1", title: "Pick a hook", text: "Run a Compartment 02 prompt to land on your idea and opening line." },
  { step: "2", title: "Write the script", text: "Feed that hook into a Compartment 03 prompt for your 45–60 second script." },
  { step: "3", title: "Caption it", text: "Paste the finished script into a Compartment 05 prompt for the caption." },
  { step: "4", title: "Tag it", text: "Close out with a hashtag/keyword prompt — post." },
];

// ---------------------------------------------------------------------------

export default function AiContentVaultBlogPost() {
  const [active, setActive] = useState(0);

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
      title="Every Vault Needs a Combination — 113 AI Prompts for Content Creators"
      description="Most creators don't have a content problem, they have a prompt problem. Here's the 10-stage system — and 113 ready-made AI prompts — behind never running out of content again."
      type="product"
    />

      <div className="acv-page">
        {/* HERO */}
        <header className="acv-hero">
          <Container>
            <nav className="acv-mono mb-3" style={{ fontSize: "0.75rem", opacity: 0.6 }}>
              <a href="/blog" className="acv-link-quiet">Blog</a> / Content Systems
            </nav>
            <div className="acv-eyebrow acv-mono">For creators who'd rather publish than procrastinate</div>
            <h1 className="acv-display">Every vault needs a combination.</h1>
            <p className="lead">
              Most people don't have a content problem. They have a prompt problem.
              Here's the 10-stage system behind it — and 113 ready-made combinations
              to stop starting from zero every time.
            </p>
            <div className="d-flex flex-wrap gap-3 mt-4">
              <Button onClick={handleCheckout} className="acv-btn-gold" size="lg">
                Open The Vault — {fmt(finalPrice)}
              </Button>
              <a href="#compartments" className="acv-link-quiet align-self-center">
                See what's inside ↓
              </a>
            </div>
          </Container>
        </header>

        {/* SECTION 1 — THE REAL PROBLEM */}
        <section className="acv-section">
          <Container>
            <Row className="g-5 align-items-start">
              <Col md={5}>
                <h2 className="acv-display">Your AI isn't the problem. Your prompt is.</h2>
                <p className="sub">
                  A vague instruction gets a vague answer back. The fix isn't a better
                  AI model — it's a more specific request. Same tool, very different result.
                </p>
              </Col>
              <Col md={7}>
                <div className="acv-compare bad mb-4">
                  <div className="tag">Vague prompt</div>
                  <p className="mb-0 mt-1">"Write me a video script about productivity."</p>
                </div>
                <div className="acv-compare good">
                  <div className="tag">Structured prompt</div>
                  <p className="mb-0 mt-1">
                    "Write a 45–60 second script for a productivity-for-freelancers video,
                    following this structure: hook, problem, insight, payoff, CTA."
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* SECTION 2 — THE VAULT (SIGNATURE INTERACTIVE) */}
        <section className="acv-section" id="compartments" style={{ background: "#fff" }}>
          <Container>
            <h2 className="acv-display">10 compartments. 113 combinations.</h2>
            <p className="sub mb-4">
              Every piece of content you'll ever make passes through some version of
              these ten stages. Tap a number to open it.
            </p>

            <div className="acv-dial-grid">
              {COMPARTMENTS.map((c, i) => (
                <button
                  key={c.num}
                  className={`acv-dial ${i === active ? "is-active" : ""}`}
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                >
                  <span className="acv-mono">{c.num}</span>
                  <span className="name">{c.label}</span>
                </button>
              ))}
            </div>

            <div className="acv-reveal" key={active}>
              <span className="acv-mono">
                COMPARTMENT {COMPARTMENTS[active].num} — {COMPARTMENTS[active].label.toUpperCase()}
              </span>
              <p className="mt-2 mb-0" style={{ opacity: 0.85 }}>{COMPARTMENTS[active].blurb}</p>
              <p className="example">&ldquo;{COMPARTMENTS[active].example}&rdquo;</p>
            </div>
          </Container>
        </section>

        {/* SECTION 3 — WORKFLOW CHAIN */}
        <section className="acv-section">
          <Container>
            <Row className="g-5">
              <Col md={5}>
                <h2 className="acv-display">Steal this chain.</h2>
                <p className="sub">
                  Single prompts solve single problems. Chains turn one idea into a
                  finished, published piece — no extra thinking required between steps.
                </p>
                <Badge bg="dark" className="acv-mono" style={{ fontSize: "0.7rem" }}>
                  Chain 1 of 3 in the Vault
                </Badge>
              </Col>
              <Col md={7}>
                {CHAIN_STEPS.map((s) => (
                  <div className="acv-chain-step" key={s.step}>
                    <div className="acv-chain-num">{s.step}</div>
                    <div>
                      <div className="fw-semibold">{s.title}</div>
                      <div className="sub" style={{ fontSize: "0.95rem" }}>{s.text}</div>
                    </div>
                  </div>
                ))}
              </Col>
            </Row>
          </Container>
        </section>

        {/* FINAL CTA */}
        <section className="acv-section">
          <Container>
            <div className="acv-cta-banner">
              <Row className="align-items-center g-4">
                <Col md={8}>
                  <h3 className="acv-display">The AI Content Vault</h3>
                  <p className="mb-0">
                    113 prompts across all 10 compartments, plus 3 full workflow chains.
                    One PDF, lifetime access, works with any AI tool you already use.
                  </p>
                </Col>
                <Col md={4} className="text-md-end">
                  <div className="acv-price mb-2">{fmt(finalPrice)}</div>
                  <Button onClick={handleCheckout} variant="dark" size="lg">
                    Get instant access
                  </Button>
                </Col>
              </Row>
            </div>

            <p className="sub mt-4" style={{ fontSize: "0.92rem" }}>
              Already grabbed{" "}
              <a href="/blog/the-21-faceless-profit-model-for-global-income">The 21 Faceless Profit Model</a>? The
              Vault is the prompt engine that runs underneath it — built to be used together.
            </p>
          </Container>
        </section>
      </div>

      {/* Mobile sticky CTA */}
      <div className="acv-sticky-cta">
        <span>The AI Content Vault — {fmt(finalPrice)}</span>
        <Button onClick={handleCheckout} size="sm" className="acv-btn-gold">
          Get it
        </Button>
      </div>
    </>
  );
}
