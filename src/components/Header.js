import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Form, FormControl, Button, Modal, Dropdown, Spinner } from 'react-bootstrap';
import { FaSearch, FaShoppingCart, FaShippingFast } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import './Header.css';
import axios from'axios';
import debounce from 'lodash.debounce'; // Corrected import for lodash.debounce
import { ProductContext} from '../pages/ProductContext';
import useSearchProducts from '../hooks/useSearchProducts';

export default function Header ({ cartCount, addToCart, isLoggedIn, headerShrink}) {
  const { handleItemClickCategory} = useContext(ProductContext);
  const {searchProducts, setSearchProducts, fetchSearchProducts, searchLoading} = useSearchProducts();

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSmallScreenSearch, setShowSmallScreenSearch] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);

  // Effect to trigger animation when cartCount changes
  useEffect(() => {
    if (cartCount > 0) { // Only animate if items are actually in the cart
      setAnimateCart(true);
      const timer = setTimeout(() => {
        setAnimateCart(false);
      }, 300); // Duration of your CSS animation
      return () => clearTimeout(timer);
    }
  }, [cartCount]); // Dependency array: run when cartCount changes

  const dropdownRef = useRef(null);
  const searchBarRef = useRef(null); // This will now refer to the small-screen search input
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery({ query: '(max-width: 992px)' }); // Bootstrap 'lg' breakpoint

  const debounceFetch = useRef(debounce((name) => handleSearch(name), 300));

  const handleQueryChange = (query) => {
    setSearchQuery(query);
    debounceFetch.current(query.trim());

    if (query.trim() && Array.isArray(searchProducts)) {
      const filtered = searchProducts.filter((product) =>
        product.name?.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 10));
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  // NEW useEffect to update suggestions when searchProducts changes (after fetch)
  useEffect(() => {
    if (!searchLoading && searchQuery.trim() && Array.isArray(searchProducts)) {
      const filtered = searchProducts.filter((product) =>
        product.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 10));
      setShowDropdown(true);
    } else if (!searchLoading && !searchQuery.trim()) { // Clear if no query and not loading
      setSuggestions([]);
      setShowDropdown(false);
    }
  }, [searchProducts, searchLoading, searchQuery]);

  function clickLink(){
    setShowDropdown(false);
    // Optional: Hide small screen search when a link is clicked
    if (isSmallScreen) setShowSmallScreenSearch(false);
  }

  const handleSearch = async (name) => {
    await fetchSearchProducts(name);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setShowDropdown(false);
      // Optional: Hide small screen search after search
      if (isSmallScreen) setShowSmallScreenSearch(false);
    }
  };

  const handleSuggestionClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
    setShowDropdown(false);
    // Optional: Hide small screen search after suggestion click
    if (isSmallScreen) setShowSmallScreenSearch(false);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current && !dropdownRef.current.contains(event.target) &&
      searchBarRef.current && !searchBarRef.current.contains(event.target)
    ) {
      setShowDropdown(false);
      setSearchQuery('');
      // NEW: If on small screen and search is open, close it when clicking outside
      if (isSmallScreen && showSmallScreenSearch) {
        setShowSmallScreenSearch(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
  <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className={headerShrink ? 'navbar-shrink' : ''}>
    <Container>
      <Navbar.Brand as={Link} to="/" className={headerShrink ? 'logo-shrink' : ''}>
        {isSmallScreen ? (
          <>
            <img
              src={`${process.env.PUBLIC_URL}/logo.png`}
              alt="YeilvaStore Logo"
              width="30px"
              height="30px"
            />
          </>
        ) : (
          <>
            <img
              src={`${process.env.PUBLIC_URL}/logo.png`}
              alt="YeilvaStore Logo"
              width="30px"
              height="30px"
            />{' '}
            {/* Removed inline style, move to CSS */}
            <strong>YeilvaSTORE</strong>
          </>
        )}
      </Navbar.Brand>

      {/* --- Responsive Search Bar --- */}
      {isSmallScreen ? (
        // On small screens, show only a search icon and then the toggled search input
        <div className="search-icon-container">
          <Button
            variant="link"
            className="text-white search-toggle-btn"
            onClick={() => setShowSmallScreenSearch(!showSmallScreenSearch)}
            aria-label="Toggle search bar"
          >
            <FaSearch size={20} />
          </Button>
          {showSmallScreenSearch && (
            <div className="search-container-small-screen" ref={searchBarRef}>
              <Form className="search-form" role="search">
                <div className="input-group">
                  <FormControl
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => handleQueryChange(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="form-control"
                    onFocus={() => setShowDropdown(true)}
                    aria-label="Search products"
                    autoFocus
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => {
                      if (searchQuery.trim()) {
                        navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
                        setShowDropdown(false);
                        setShowSmallScreenSearch(false);
                      }
                    }}
                    aria-label="Perform search"
                  >
                    <FaSearch />
                  </Button>
                </div>
              </Form>
              {showDropdown && (
                <Dropdown.Menu
                  show
                  className="search-suggestions-small-screen"
                  ref={dropdownRef}
                  aria-label="Search Suggestions"
                >
                  {searchLoading ? (
                    <Dropdown.Item className="text-center">
                      <Spinner animation="border" size="sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </Dropdown.Item>
                  ) : (
                    <>
                      {suggestions.length > 0 ? (
                        suggestions.map((product) => (
                          <Dropdown.Item
                            key={product.id}
                            onClick={() => handleSuggestionClick(product)}
                            aria-label={`Suggestion for ${product.name}`}
                          >
                            <div className="d-flex align-items-center">
                              <img
                                src={product.url || 'placeholder.jpg'}
                                alt={product.name}
                                width="40"
                                height="40"
                                className="me-2 rounded"
                              />
                              <div>
                                <span>{product.name}</span>
                                <p className="text-muted mb-0" style={{ fontSize: '0.8em' }}>₱{product.price}</p>
                              </div>
                            </div>
                          </Dropdown.Item>
                        ))
                      ) : (
                        searchQuery.trim() && !searchLoading && (
                          <Dropdown.Item className="text-muted">
                            {isLoggedIn
                              ? 'No results found'
                              : <Link to="/signupform" className="search-link">Signup to avail our services & deals</Link>
                            }
                          </Dropdown.Item>
                        )
                      )}
                      <Dropdown.Item>
                        <div className="text-muted mt-2">
                          <p>You may also like:</p>
                          <ul className="list-unstyled">
                            <li>
                              <Link
                                to="/productsdata"
                                className="search-link"
                                onClick={() => { handleItemClickCategory('wellness product'); clickLink(); }}
                              >Health & Wellness Products</Link>
                            </li>
                            <li>
                              <Link
                                to="/productsdata"
                                className="search-link"
                                onClick={() => { handleItemClickCategory('beauty and hygiene'); clickLink(); }}
                              >Beauty Products</Link>
                            </li>
                          </ul>
                        </div>
                      </Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="search-container" ref={searchBarRef}>
          <Form className="search-form" role="search">
            <div className="input-group">
              <FormControl
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleQueryChange(e.target.value)}
                onKeyDown={handleKeyPress}
                className="form-control"
                onFocus={() => setShowDropdown(true)}
                aria-label="Search products"
              />
              <Button
                variant="outline-secondary"
                onClick={() => {
                  if (searchQuery.trim()) {
                    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
                    setShowDropdown(false);
                  }
                }}
                aria-label="Perform search"
              >
                <FaSearch />
              </Button>
            </div>
          </Form>
          {showDropdown && (
            <Dropdown.Menu
              show
              className="search-suggestions"
              ref={dropdownRef}
              aria-label="Search Suggestions"
            >
              {searchLoading ? (
                <Dropdown.Item className="text-center">
                  <Spinner animation="border" size="sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </Dropdown.Item>
              ) : (
                <>
                  {suggestions.length > 0 ? (
                    suggestions.map((product) => (
                      <Dropdown.Item
                        key={product.id}
                        onClick={() => handleSuggestionClick(product)}
                        aria-label={`Suggestion for ${product.name}`}
                      >
                        <div className="d-flex align-items-center">
                          <img
                            src={product.url || 'placeholder.jpg'}
                            alt={product.name}
                            width="40"
                            height="40"
                            className="me-2 rounded"
                          />
                          <div>
                            <span>{product.name}</span>
                            <p className="text-muted mb-0" style={{ fontSize: '0.8em' }}>₱{product.price}</p>
                          </div>
                        </div>
                      </Dropdown.Item>
                    ))
                  ) : (
                    searchQuery.trim() && !searchLoading && (
                      <Dropdown.Item className="text-muted">
                        {isLoggedIn
                          ? 'No results found'
                          : <Link to="/signupform" className="search-link">Signup to avail our services & deals</Link>
                        }
                      </Dropdown.Item>
                    )
                  )}
                  <Dropdown.Item>
                    <div className="text-muted mt-2">
                      <p>You may also like:</p>
                      <ul className="list-unstyled">
                        <li>
                          <Link
                            to="/productsdata"
                            className="search-link"
                            onClick={() => { handleItemClickCategory('wellness product'); clickLink(); }}
                          >Health & Wellness Products</Link>
                        </li>
                        <li>
                          <Link
                            to="/productsdata"
                            className="search-link"
                            onClick={() => { handleItemClickCategory('beauty and hygiene'); clickLink(); }}
                          >Beauty Products</Link>
                        </li>
                      </ul>
                    </div>
                  </Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          )}
        </div>
      )}

      <Nav.Link as={Link} to="/cart" className="text-white shopping-basket">
        <FaShoppingCart size={22} />
        <span className="cart-count">{cartCount}</span>
      </Nav.Link>
    </Container>

    {selectedProduct && (
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="product-details-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="product-details-modal">{selectedProduct.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={selectedProduct.url}
            alt={selectedProduct.name}
            className="img-fluid mb-3"
          />
          <p>
            <strong>Price:</strong> ₱{selectedProduct.price}
          </p>
          <p
            style={{
              color: selectedProduct.stock === 0 ? 'red' : '#067d62',
              fontWeight: '400',
            }}
          >
            {selectedProduct.stock === 0 ? 'Out of stock' : 'In stock'}
          </p>
          {selectedProduct.place === 'maslog'? (<p style={{color:"#067d62",marginBottom:"10px"}}><FaShippingFast/> FreeShipping </p>):(<p></p>)}
          {selectedProduct.place === 'maslog'? (<p style={{ display: 'flex', alignItems: 'center', fontSize: '15px', color: 'red' }}>
            Not Available outside Danao City</p>):(<p></p>)}
          <p>
            <strong>Description:</strong> {selectedProduct.description}
          </p>

        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              const success = addToCart(selectedProduct);
              if (success !== false) {
                setShowModal(false);
              } else {
                console.error("Failed to add item to cart.");
              }
            }}
            disabled={selectedProduct.stock === 0}
          >
            Add to Cart
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )}
  </Navbar>
);
}