import React,{ useState } from "react";
import { Link } from "react-router-dom";
import { LuBookOpen, LuArrowRight, LuClock, LuTrendingUp } from "react-icons/lu";
import { FaFire } from "react-icons/fa";
import'./BlogListPage.css';

// ── Blog registry — add new posts here only ──────────────────────────────────
const allPosts = [
  {
    slug:        "the-21-faceless-profit-model-for-global-income",
    title:       "The 21 Faceless Profit Model for Global Income",
    excerpt:     "21 proven business models that generate real income — no camera, no followers, no personal brand. Pick one, build the system, start earning.",
    category:    "Online Business",
    tag:         "Popular",
    readTime:    "6 min read",
    accentColor: "#00e5a0",
    icon:        "🕵️",
  },
  {
    slug:        "ai-powered-content-marketing",
    title:       "AI Powered Content Marketing",
    excerpt:     "7 AI prompt packs covering strategy, audience research, writing, SEO optimisation, and repurposing. Create better content in a fraction of the time.",
    category:    "Content Creation",
    tag:         "New",
    readTime:    "7 min read",
    accentColor: "#7c5cfc",
    icon:        "🤖",
  },
  {
  slug:        "build-your-content-machine",
  title:       "Build Your Content Machine — Guide",
  excerpt:     "A 5-part system for capturing ideas, planning your calendar, and producing content on repeat — templates and time-saving workflows included.",
  category:    "Content Creation",
  tag:         "New",
  readTime:    "7 min read",
  accentColor: "#D9622B",
  icon:        "⚙️",
  },
  {
  slug:        "zero-to-content-hero",
  title:       "From Zero to Content Hero",
  excerpt:     "A beginner's path to consistent content: pick the right topics, build a strategy that lasts, stay consistent without burning out — with real creator examples.",
  category:    "Content Creation",
  tag:         "New",
  readTime:    "6 min read",
  accentColor: "#FF5D73",
  icon:        "🚀",
  },
];



export default function BlogListPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const TAG_STYLES = {
  Popular: { bg: "rgba(0,229,160,0.13)",  color: "#0a6647",  dot: "#00e5a0" },
  New:     { bg: "rgba(124,92,252,0.13)", color: "#5b3fd4",  dot: "#7c5cfc" },
  Default: { bg: "rgba(107,114,128,0.1)", color: "#374151",  dot: "#9ca3af" },
};


  const CATEGORIES = ["All", ...new Set(allPosts.map(p => p.category))];


  const filtered = activeCategory === "All"
    ? allPosts
    : allPosts.filter(p => p.category === activeCategory);

  const featured  = allPosts.find(p => p.tag === "Popular") || allPosts[0];
  const secondary = allPosts.filter(p => p.slug !== featured.slug);

  return (
    <>
     

      <div className="bl-page">

        {/* ── HERO ── */}
        <section className="bl-hero">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <span className="bl-hero-eyebrow">Yeilvastore Blog</span>
                <h1 className="bl-hero-h1">
                  Resources that help you<br />
                  <span className="bl-accent">earn smarter online.</span>
                </h1>
                <p className="bl-hero-sub">
                  Guides, models, and strategies for building digital income —
                  no fluff, no filler. Just systems that work.
                </p>
                <div className="bl-hero-stat">
                  <div className="bl-hero-stat-item">
                    <span className="val">{allPosts.length}</span>
                    <span>posts published</span>
                  </div>
                  <div className="bl-hero-stat-item">
                    <span className="val">{CATEGORIES.length - 1}</span>
                    <span>topics covered</span>
                  </div>
                  <div className="bl-hero-stat-item">
                    <LuClock size={13} />
                    <span>Free to read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FILTER BAR ── */}
        <div className="bl-filter-bar">
          <div className="container">
            <div className="bl-filter-inner">
              {CATEGORIES.map((cat) => {
                const count = cat === "All"
                  ? allPosts.length
                  : allPosts.filter(p => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    className={`bl-filter-btn${activeCategory === cat ? " active" : ""}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                    <span className="bl-filter-count">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <section className="bl-body">
          <div className="container">

            {/* Featured post — only shown on All tab */}
            {activeCategory === "All" && (
              <>
                <div className="bl-section-label">
                  <FaFire size={11} style={{ color: "#f97316" }} /> Featured
                </div>
                <Link
                  to={`/blog/${featured.slug}`}
                  className="bl-featured"
                  style={{ "--accent": featured.accentColor }}
                >
                  <div className="bl-featured-icon">{featured.icon}</div>
                  <div className="bl-featured-content">
                    <div className="bl-featured-label">
                      <LuTrendingUp size={12} /> Most popular post
                    </div>
                    <div className="bl-featured-title">{featured.title}</div>
                    <div className="bl-featured-excerpt">{featured.excerpt}</div>
                    <div className="bl-featured-meta">
                      <span className="bl-feat-cat">{featured.category}</span>
                      <span className="bl-feat-read">
                        <LuClock size={11} /> {featured.readTime}
                      </span>
                    </div>
                  </div>
                  <span className="bl-read-more">
                    Read post <LuArrowRight size={14} />
                  </span>
                </Link>
              </>
            )}

            {/* All posts grid */}
            <div className="bl-section-label">
              <LuBookOpen size={11} />
              {activeCategory === "All" ? "All posts" : activeCategory}
            </div>

            {filtered.length === 0 ? (
              <div className="bl-empty">
                <span className="bl-empty-icon">📭</span>
                <h4>No posts in this category yet</h4>
                <p>Check back soon — more content is on the way.</p>
              </div>
            ) : (
              <div className="bl-grid">
                {filtered.map((post) => {
                  const tagStyle = TAG_STYLES[post.tag] || TAG_STYLES.Default;
                  return (
                    <Link
                      key={post.slug}
                      to={`/blog/${post.slug}`}
                      className="bl-card"
                      style={{ "--accent": post.accentColor }}
                    >
                      <div className="bl-card-top">
                        <span className="bl-card-icon">{post.icon}</span>
                        {post.tag && (
                          <span
                            className="bl-card-tag"
                            style={{
                              background: tagStyle.bg,
                              color: tagStyle.color,
                            }}
                          >
                            {post.tag}
                          </span>
                        )}
                      </div>
                      <div className="bl-card-title">{post.title}</div>
                      <div className="bl-card-excerpt">{post.excerpt}</div>
                      <div className="bl-card-footer">
                        <div>
                          <div className="bl-card-cat">{post.category}</div>
                          <div className="bl-card-read">
                            <LuClock size={10} /> {post.readTime}
                          </div>
                        </div>
                        <div className="bl-card-arrow">
                          <LuArrowRight size={13} />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* CTA strip */}
            <div className="bl-cta-strip">
              <div>
                <h3>Every post links to a product.</h3>
                <p>Read, learn, then get the tools that put it into practice.</p>
              </div>
              <Link to="/productsdata" className="bl-cta-btn">
                Browse the store →
              </Link>
            </div>

          </div>
        </section>

      </div>
    </>
  );
}
