import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Form, FormControl, Button, Modal, ListGroup, Dropdown } from 'react-bootstrap';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import './Header.css';

const Header = ({ cartCount, allProducts, addToCart }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // For product details modal
  const dropdownRef = useRef(null); // Ref for the dropdown menu
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery({ query: '(max-width: 992px)' });

  const handleQueryChange = (query) => {
    setSearchQuery(query);

    if (query.trim() && allProducts && Array.isArray(allProducts)) {
      const filtered = allProducts.filter((product) =>
        product.name?.toLowerCase().includes(query.toLowerCase())
      );

      setSuggestions(filtered.slice(0, 10)); // Limit to top 10 suggestions
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSuggestionClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setSuggestions([]); // Close dropdown
      setSearchQuery(''); // Clear search bar
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={process.env.PUBLIC_URL + '/logo.png'}
            width="30"
            height="30"
            alt="YeilvaStore Logo"
          />{' '}
          {!isSmallScreen && <strong>YeilvaSTORE</strong>}
        </Navbar.Brand>

        <div className="flex-grow-1 d-flex ms-auto align-items-center search-container" ref={dropdownRef}>
          <Form className="d-flex flex-grow-1 search-form " style={{padding:'15px 0px'}}>
        <FormControl
          type="search"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => handleQueryChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="me-2"
        />
          </Form>

          {suggestions.length > 0 &&(
            <Dropdown.Menu show className="search-suggestions">
              {suggestions.map((product) => (
                <Dropdown.Item
                  key={product.id}
                  onClick={() => handleSuggestionClick(product)}
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={product.url}
                      alt={product.name}
                      width="30"
                      height="30"
                      className="me-2"
                    />
                    <span>{product.name}</span>
                  </div>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
         
             )}
        </div>

        <Nav.Link as={Link} to="/cart" className="text-white">
          <FaShoppingCart size={22} />{' '}
          <span
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '12px',
              backgroundColor: '#EE6005',
              borderRadius: '50%',
              padding: '2px 8px',
              marginLeft: '-5px',
              position: 'relative',
              top: '7px',
            }}
          >
            {cartCount}
          </span>
        </Nav.Link>
      </Container>

      {/* Product Modal */}
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
            <p><strong>Price:</strong> ₱{selectedProduct.price} </p>
            <p style={{ color: selectedProduct.stock === 0 ? "red" : "#067d62", fontWeight: "400" }}>
              {selectedProduct.stock === 0 ? "Out of stock" : "In stock"}
            </p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => addToCart(selectedProduct)}>
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

export default Header;
