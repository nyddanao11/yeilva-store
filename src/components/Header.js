import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Form, FormControl, Button, Modal, Dropdown } from 'react-bootstrap';
import { FaSearch, FaShoppingCart, FaShippingFast } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import './Header.css';

export default function Header ({ cartCount, allProducts, addToCart, isLoggedIn }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const searchBarRef = useRef(null);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery({ query: '(max-width: 992px)' });

  const handleQueryChange = (query) => {
    setSearchQuery(query);

    if (query.trim() && Array.isArray(allProducts)) {
      const filtered = allProducts.filter((product) =>
        product.name?.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 10));
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setShowDropdown(false); // Hide dropdown after searching
    }
  };

  const handleSuggestionClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
    setShowDropdown(false);
  };

  const handleClickOutside = (event) => {
    if (
      (dropdownRef.current && !dropdownRef.current.contains(event.target)) &&
      (searchBarRef.current && !searchBarRef.current.contains(event.target))
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
     <Container  >
       <Navbar.Brand as={Link} to="/">  
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
                />
                {' '}
                <strong>YeilvaSTORE</strong>
              </>
            )}

        </Navbar.Brand>


        <div className=" search-container" ref={searchBarRef}>
          <Form className=" search-form" style={{ padding: '5px 0' }} role="search">
            <div className="input-group">
                
                <FormControl
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => handleQueryChange(e.target.value)}
                    onKeyDown={handleKeyPress} // Updated to onKeyDown
                    className="form-control me-2"
                    onFocus={() => setShowDropdown(true)}
                />
            </div>
        </Form>
{showDropdown && (
  <Dropdown.Menu
    show
    className="search-suggestions"
    ref={dropdownRef}
    aria-label="Search Suggestions"
  >
    {suggestions.length > 0 ? (
      suggestions.map((product) => (
        <Dropdown.Item
          key={product.id}
          onClick={() => handleSuggestionClick(product)}
          aria-label={`Suggestion for ${product.name}`}
        >
          <div className="d-flex align-items-center">
            <span>{product.name}</span>
          </div>
        </Dropdown.Item>
      ))
    ) : (
      <Dropdown.Item className="text-muted">
        <Link to="/signupform" className="search-link">
          {!isLoggedIn
            ? 'Signup to avail our services & deals'
            : 'No results found'}
        </Link>
      </Dropdown.Item>
    )}

    {/* Static Frequently Searched Section */}
    <Dropdown.Item>
      <div className="text-muted mt-2">
        <p>You may also like:</p>
        <ul className="list-unstyled">
          <li>
            <Link to="/products" className="search-link">
              Health & Wellness Products
            </Link>
          </li>
          <li>
            <Link to="/beautyproducts" className="search-link">
              Beauty Products
            </Link>
          </li>
        </ul>
      </div>
    </Dropdown.Item>
  </Dropdown.Menu>
)}


     <Nav.Link as={Link} to="/cart"  className="text-white shopping-cart ">
          <FaShoppingCart size={22} />
          <span className="cart-count">{cartCount}</span>
        </Nav.Link>
      </div>
     
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
          <Modal.Body >
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
            <Button variant="success" onClick={() => addToCart(selectedProduct)} disabled={selectedProduct.stock === 0}>
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
};


