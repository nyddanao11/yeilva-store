import React, { useEffect, useState, useCallback, useRef, useContext } from 'react';
import {
  Navbar, Nav, Container, Dropdown,
  Offcanvas, Accordion, Form, FormControl, Spinner,
} from 'react-bootstrap';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  FaHome, FaSignInAlt, FaSignOutAlt,
  FaShoppingBag, FaUserPlus, FaTimes, FaBars,
  FaChevronRight, FaPercent, FaSearch,
} from 'react-icons/fa';
import { LuBookOpen } from 'react-icons/lu';
import { FiUser, FiGrid } from 'react-icons/fi';
import { fetchUserData } from './userService';
import { ProductContext } from '../pages/ProductContext';
import useSearchProducts from '../hooks/useSearchProducts';
import { useAuth } from '../pages/loginContext';
import debounce from 'lodash.debounce';
import { useMediaQuery } from 'react-responsive';
import './CombinedNavbar.css';

// ── Static data ───────────────────────────────────────────────────────────────
const categories = [
  { name: 'Artificial Intelligence', link: '/productsdata' },
  { name: 'Content Creation',        link: '/productsdata' },
  { name: 'Online Business',         link: '/productsdata' },
  { name: 'Marketing',               link: '/productsdata' },
  { name: 'Health and Fitness',      link: '/productsdata' },
  { name: 'Wellness',                link: '/productsdata' },
  { name: 'Parenting',               link: '/productsdata' },
  { name: 'Apps',                    link: '/productsdata' },
  { name: 'Cybersecurity',           link: '/productsdata' },
];

const blogList = [
  { name: 'The 21 Faceless Profit Model for Global Income', link: '/blog/the-21-faceless-profit-model-for-global-income', tag: 'Popular' },
  { name: 'AI Powered Content Marketing',                   link: '/blog/ai-powered-content-marketing',                   tag: 'New' },
];

// ── Blog dropdown items (outside component to avoid re-render) ────────────────
const BlogDropdownItems = ({ onClose }) => (
  <>
    {blogList.map((post, i) => (
      <Dropdown.Item key={i} as={Link} to={post.link} onClick={onClose}
        className="cn-blog-item d-flex align-items-start gap-2 py-2 px-3">
        <LuBookOpen size={14} className="cn-blog-icon mt-1 flex-shrink-0" />
        <span className="flex-grow-1 small lh-sm">{post.name}</span>
        {post.tag && (
          <span className={`cn-post-tag cn-tag-${post.tag.toLowerCase()}`}>{post.tag}</span>
        )}
      </Dropdown.Item>
    ))}
    <Dropdown.Divider />
    <Dropdown.Item as={Link} to="/bloglistpage" onClick={onClose} className="cn-view-all small text-center py-2">
      View all posts <FaChevronRight size={9} className="ms-1" />
    </Dropdown.Item>
  </>
);

// ── Main component ────────────────────────────────────────────────────────────
export default function CombinedNavbar({ cartItems, handleLogout, handleItemClickCategory, isLoggedIn, userEmail }) {
  // Auth & user
  const { isLoggedIn: authLoggedIn } = useAuth() || {};
  const resolvedLoggedIn = isLoggedIn ?? authLoggedIn;
  const [userData, setUserData] = useState({ firstname: '' });

  // Nav state
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showUserDD,    setShowUserDD]    = useState(false);
  const [showCatDD,     setShowCatDD]     = useState(false);
  const [showBlogDD,    setShowBlogDD]    = useState(false);
  const [scrolled,      setScrolled]      = useState(false);

  // Search state
  const [searchQuery,          setSearchQuery]          = useState('');
  const [suggestions,          setSuggestions]          = useState([]);
  const [showSuggestions,      setShowSuggestions]      = useState(false);
  const [showMobileSearch,     setShowMobileSearch]     = useState(false);

  const { searchProducts, fetchSearchProducts, searchLoading } = useSearchProducts();
  const { handleItemClickCategory: ctxCategory } = useContext(ProductContext) || {};
  const resolvedCategory = handleItemClickCategory ?? ctxCategory;

  const searchBarRef  = useRef(null);
  const suggestionsRef = useRef(null);
  const debounceFetch = useRef(debounce((q) => fetchSearchProducts(q), 300));

  const isSmallScreen = useMediaQuery({ query: '(max-width: 991px)' });
  const location  = useLocation();
  const navigate  = useNavigate();

  // ── Scroll shadow ────────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Close offcanvas on route change ─────────────────────────────────────────
  useEffect(() => {
    setShowOffcanvas(false);
    setShowMobileSearch(false);
  }, [location.pathname]);

  // ── Fetch user ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!resolvedLoggedIn || !userEmail) { setUserData({ firstname: '' }); return; }
    fetchUserData(userEmail).then(setUserData).catch(() => setUserData({ firstname: '' }));
  }, [resolvedLoggedIn, userEmail]);

  // ── Search: update suggestions when results come back ───────────────────────
  useEffect(() => {
    if (!searchLoading && searchQuery.trim() && Array.isArray(searchProducts)) {
      const filtered = searchProducts.filter(p =>
        p.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 10));
      setShowSuggestions(true);
    } else if (!searchLoading && !searchQuery.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchProducts, searchLoading, searchQuery]);

  // ── Click outside closes suggestions ────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (
        searchBarRef.current && !searchBarRef.current.contains(e.target) &&
        suggestionsRef.current && !suggestionsRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleCloseOffcanvas  = useCallback(() => setShowOffcanvas(false), []);
  const handleToggleOffcanvas = useCallback(() => setShowOffcanvas(p => !p), []);

  const handleCategorySelect = useCallback((name) => {
    resolvedCategory?.(name);
    handleCloseOffcanvas();
  }, [resolvedCategory, handleCloseOffcanvas]);

  const handleQueryChange = (q) => {
    setSearchQuery(q);
    debounceFetch.current(q.trim());
    if (q.trim() && Array.isArray(searchProducts)) {
      const filtered = searchProducts.filter(p => p.name?.toLowerCase().includes(q.toLowerCase()));
      setSuggestions(filtered.slice(0, 10));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
      setShowMobileSearch(false);
    }
  };

  const handleSuggestionClick = (product) => {
    navigate(`/clicksearchpage/${product.id}`);
    setShowSuggestions(false);
    setShowMobileSearch(false);
    setSearchQuery('');
  };

  const doSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
      setShowMobileSearch(false);
    }
  };

  const cartCount = cartItems?.length || 0;

  // ── Suggestion panel (shared between mobile & desktop) ──────────────────────
  const SuggestionPanel = () => (
    <div className="cn-suggestions" ref={suggestionsRef}>
      {searchLoading ? (
        <div className="cn-suggestion-item text-center py-3">
          <Spinner animation="border" size="sm" />
        </div>
      ) : (
        <>
          {suggestions.length > 0 ? (
            suggestions.map((product) => (
              <div key={product.id} className="cn-suggestion-item" onClick={() => handleSuggestionClick(product)}>
                <img src={product.url || '/placeholder.jpg'} alt={product.name} className="cn-sug-img" />
                <div>
                  <div className="cn-sug-name">{product.name}</div>
                  <div className="cn-sug-price">₱{product.price}</div>
                </div>
              </div>
            ))
          ) : (
            searchQuery.trim() && !searchLoading && (
              <div className="cn-suggestion-item text-muted small">
                {resolvedLoggedIn
                  ? 'No results found'
                  : <Link to="/signupform" className="cn-sug-link">Sign up to access all products & deals</Link>
                }
              </div>
            )
          )}
          <div className="cn-sug-footer">
            <div className="cn-sug-label">You may also like</div>
            <Link to="/productsdata" className="cn-sug-link"
              onClick={() => { resolvedCategory?.('artificial Intelligence'); setShowSuggestions(false); }}>
             Artificial Intelligence
            </Link>
            <Link to="/productsdata" className="cn-sug-link"
              onClick={() => { resolvedCategory?.('content creation'); setShowSuggestions(false); }}>
              Content Creation
            </Link>
          </div>
        </>
      )}
    </div>
  );

  return (
    <>


      <Navbar className={`cn-navbar${scrolled ? ' cn-scrolled' : ''}`} sticky="top">
        <Container className="flex-column px-3">

          {/* ══════════════════════════════
              MOBILE LAYOUT
          ══════════════════════════════ */}
          {isSmallScreen ? (
            <>
              <div className="cn-mobile-bar">
                {/* Hamburger */}
                <button className="cn-icon-btn" onClick={handleToggleOffcanvas} aria-label="Menu">
                  {showOffcanvas ? <FaTimes size={14} /> : <FaBars size={14} />}
                </button>

                {/* Search toggle */}
                <button className="cn-icon-btn" onClick={() => setShowMobileSearch(p => !p)} aria-label="Search">
                  {showMobileSearch ? <FaTimes size={14} /> : <FaSearch size={13} />}
                </button>

                {/* Centred wordmark */}
                <Link to="/" className="cn-brand cn-mobile-brand">
                  Yeilva<span className="cn-dot">.</span>
                </Link>

                {/* Right: cart + user */}
                <div className="cn-mobile-right">
                  <Link to="/cart" className="cn-cart-btn">
                    <FaShoppingBag size={14} />
                    {cartCount > 0 && <span className="cn-cart-count">{cartCount}</span>}
                  </Link>

                  <Dropdown show={showUserDD} onToggle={setShowUserDD} align="end">
                    <Dropdown.Toggle as="button"
                      className={`cn-icon-btn${resolvedLoggedIn ? ' cn-filled' : ''}`}
                      id="mob-user-dd">
                      <FiUser size={14} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="cn-menu" style={{ minWidth: 190 }}>
                      {resolvedLoggedIn ? (
                        <>
                          <Dropdown.Header className="fw-bold text-dark small">
                            Hi, {userData.firstname || 'there'} 👋
                          </Dropdown.Header>
                          <Dropdown.Divider />
                          <Dropdown.Item as={Link} to="/myaccount" onClick={() => setShowUserDD(false)}>
                            <FiUser size={13} className="me-2" /> My Account
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to="/orders" onClick={() => setShowUserDD(false)}>
                            <FaShoppingBag size={13} className="me-2" /> My Orders
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item className="text-danger"
                            onClick={() => { handleLogout(); setShowUserDD(false); }}>
                            <FaSignOutAlt size={13} className="me-2" /> Logout
                          </Dropdown.Item>
                        </>
                      ) : (
                        <>
                          <Dropdown.Item as={Link} to="/login" onClick={() => setShowUserDD(false)}>
                            <FaSignInAlt size={13} className="me-2" /> Login
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to="/signupform" onClick={() => setShowUserDD(false)}>
                            <FaUserPlus size={13} className="me-2" /> Sign Up
                          </Dropdown.Item>
                        </>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>

              {/* Expandable mobile search */}
              {showMobileSearch && (
                <div className="cn-mobile-search-bar w-100" ref={searchBarRef}>
                  <div className="cn-search-row">
                    <FormControl
                      type="search"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => handleQueryChange(e.target.value)}
                      onKeyDown={handleKeyPress}
                      onFocus={() => searchQuery && setShowSuggestions(true)}
                      className="cn-search-input"
                      autoFocus
                      enterKeyHint="search"
                    />
                    <button className="cn-search-btn" onClick={doSearch} aria-label="Search">
                      <FaSearch size={13} />
                    </button>
                  </div>
                  {showSuggestions && <SuggestionPanel />}
                </div>
              )}
            </>

          ) : (
          /* ══════════════════════════════
              DESKTOP LAYOUT
          ══════════════════════════════ */
            <>
              {/* Top row: logo + search + cart/auth */}
              <div className="cn-top">
                <Link to="/" className="cn-brand">
                  Yeilva<span className="cn-dot">.</span>
                </Link>

                {/* Search */}
                <div className="cn-search-wrap" ref={searchBarRef}>
                  <div className="cn-search-row">
                    <FormControl
                      type="search"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => handleQueryChange(e.target.value)}
                      onKeyDown={handleKeyPress}
                      onFocus={() => searchQuery && setShowSuggestions(true)}
                      className="cn-search-input"
                    />
                    <button className="cn-search-btn" onClick={doSearch} aria-label="Search">
                      <FaSearch size={13} />
                    </button>
                  </div>
                  {showSuggestions && <SuggestionPanel />}
                </div>

                {/* Cart */}
                <Link to="/cart" className="cn-cart-btn">
                  <FaShoppingBag size={14} /> Cart
                  {cartCount > 0 && <span className="cn-cart-count">{cartCount}</span>}
                </Link>

                {/* Auth */}
                {resolvedLoggedIn ? (
                  <Dropdown align="end" show={showUserDD} onToggle={setShowUserDD}>
                    <Dropdown.Toggle as="button" className="cn-user-toggle" id="desk-user-dd">
                      <FiUser size={14} /> {userData.firstname || 'Account'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="cn-menu" style={{ minWidth: 180 }}>
                      <Dropdown.Item as={Link} to="/myaccount" onClick={() => setShowUserDD(false)}>
                        <FiUser size={13} className="me-2" /> My Profile
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/orders" onClick={() => setShowUserDD(false)}>
                        <FaShoppingBag size={13} className="me-2" /> My Orders
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item className="text-danger"
                        onClick={() => { handleLogout(); setShowUserDD(false); }}>
                        <FaSignOutAlt size={13} className="me-2" /> Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <div className="d-flex align-items-center gap-2">
                    <Link to="/login" className="cn-login-link">Login</Link>
                    <Link to="/signupform" className="cn-cta">Get started</Link>
                  </div>
                )}
              </div>

              {/* Bottom row: category nav */}
              <div className="cn-bottom">
                {/* Categories */}
                <Dropdown show={showCatDD} onToggle={setShowCatDD}>
                  <Dropdown.Toggle as="button" className="cn-dd-toggle" id="cat-dd">
                    <FiGrid size={12} /> Categories <span className="cn-caret">▼</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="cn-menu" style={{ minWidth: 220 }}>
                    {categories.map((cat, i) => (
                      <Dropdown.Item key={i} as={Link} to={cat.link}
                        onClick={() => { resolvedCategory?.(cat.name); setShowCatDD(false); }}>
                        {cat.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>

                {/* Blog */}
                <Dropdown show={showBlogDD} onToggle={setShowBlogDD}>
                  <Dropdown.Toggle as="button" className="cn-dd-toggle" id="blog-dd">
                    <LuBookOpen size={13} /> Blog <span className="cn-caret">▼</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="cn-menu" style={{ minWidth: 280 }}>
                    <BlogDropdownItems onClose={() => setShowBlogDD(false)} />
                  </Dropdown.Menu>
                </Dropdown>

                {/* Deals */}
                <NavLink to="/alldealsproduct" className="cn-nav-link cn-deals">
                  <FaPercent size={11} /> Deals
                </NavLink>
              </div>
            </>
          )}

        </Container>
      </Navbar>

      {/* ══════════════════════════════════════
          OFFCANVAS
      ══════════════════════════════════════ */}
      <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas}
        placement="start" className="cn-offcanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            Yeilva<span className="cn-dot">.</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0 overflow-auto">

          {/* User hero */}
          <div className="cn-user-hero">
            {resolvedLoggedIn ? (
              <div className="d-flex align-items-center gap-3">
                <div className="cn-avatar">{userData.firstname?.charAt(0) || 'U'}</div>
                <div>
                  <div className="small text-muted">Welcome back</div>
                  <div className="fw-bold">{userData.firstname}</div>
                </div>
              </div>
            ) : (
              <div>
                <div className="fw-bold mb-1">Welcome to Yeilvastore</div>
                <div className="text-muted small">Sign in for the best experience</div>
              </div>
            )}
          </div>

          <div className="cn-sec-label">Browse</div>
          <Link to="/" className="cn-canvas-link" onClick={handleCloseOffcanvas}>
            <FaHome size={13} className="cn-li" /> Home
          </Link>

          <Accordion flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <FiGrid size={13} style={{ color: 'var(--cn-muted)', marginRight: 10 }} />
                Categories
              </Accordion.Header>
              <Accordion.Body>
                {categories.map((cat, i) => (
                  <Link key={i} to={cat.link} className="cn-cat-row"
                    onClick={() => handleCategorySelect(cat.name)}>
                    <span>{cat.name}</span>
                    <FaChevronRight size={9} style={{ color: '#ccc' }} />
                  </Link>
                ))}
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <LuBookOpen size={13} style={{ color: 'var(--cn-muted)', marginRight: 10 }} />
                Blog
              </Accordion.Header>
              <Accordion.Body>
                {blogList.map((post, i) => (
                  <Link key={i} to={post.link} className="cn-blog-row" onClick={handleCloseOffcanvas}>
                    <span className="flex-grow-1">{post.name}</span>
                    {post.tag && (
                      <span className={`cn-post-tag cn-tag-${post.tag.toLowerCase()}`}>{post.tag}</span>
                    )}
                  </Link>
                ))}
                <Link to="/bloglistpage" className="cn-blog-row" style={{ color: 'var(--cn-muted)', fontWeight: 500 }}
                  onClick={handleCloseOffcanvas}>
                  View all posts →
                </Link>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Link to="/alldealsproduct" className="cn-canvas-link cn-deals-c" onClick={handleCloseOffcanvas}>
            <FaPercent size={11} className="cn-li" /> Hot Deals
          </Link>

          <hr className="cn-canvas-divider" />
          <div className="cn-sec-label">Account</div>

          {resolvedLoggedIn ? (
            <>
              <Link to="/myaccount" className="cn-canvas-link" onClick={handleCloseOffcanvas}>
                <FiUser size={13} className="cn-li" /> Profile Settings
              </Link>
              <Link to="/orders" className="cn-canvas-link" onClick={handleCloseOffcanvas}>
                <FaShoppingBag size={13} className="cn-li" /> My Orders
              </Link>
              <hr className="cn-canvas-divider" />
              <button className="cn-canvas-link cn-danger"
                onClick={() => { handleLogout(); handleCloseOffcanvas(); }}>
                <FaSignOutAlt size={13} className="cn-li" /> Sign Out
              </button>
            </>
          ) : (
            <div className="cn-canvas-cta">
              <Link to="/login" className="cn-cta text-center" onClick={handleCloseOffcanvas}>Login</Link>
              <Link to="/signupform" className="text-center text-decoration-none py-2 small"
                style={{ color: 'var(--cn-muted)' }} onClick={handleCloseOffcanvas}>
                No account?{' '}
                <span style={{ color: 'var(--cn-ink)', fontWeight: 600 }}>Sign up free</span>
              </Link>
            </div>
          )}

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
