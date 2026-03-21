import React, { useEffect, useState, useCallback } from 'react';
import {
  Navbar,
  Nav,
  Container,
  Dropdown,
  Modal,
  NavDropdown,
  Offcanvas,
  Button,
  Badge,
  Accordion,
} from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate
import {
  FaHome,
  FaServicestack,
  FaGift,
  FaBars,
  FaAppleAlt,
  FaTshirt,
  FaCogs, // Good for services
  FaBasketballBall,
  FaConciergeBell, // Already used, consider if you want different icons for distinct categories
  FaUtensils, // Good for grocery/food
  FaPercent,
  FaSignInAlt,
  FaSignOutAlt,
  FaShoppingBag,
  FaUserPlus
} from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { fetchUserData } from './userService';
import './ShoppeeNavbar.css';
import { useMediaQuery } from 'react-responsive';
import DeveloperServices from './WebsitePernSetup';

export default function ShopeeNavbar({
  cartItems, // Not used in this component, consider removing if truly not needed for the navbar
  handleLogout,
  handleLogin, // Not used directly, but related to the modal
  handleItemClickCategory,
  isLoggedIn,
  userEmail,
}) {

  const [userData, setUserData] = useState({ firstname: '' });
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [showDropdown, setShowDropdown] = useState(false);

const handleToggleDropdown = (isOpen) => setShowDropdown(isOpen);
const handleCloseDropdown = () => setShowDropdown(false);

  // Memoize handleClose for better performance and to prevent unnecessary re-renders
  const handleCloseModal = useCallback(() => setShowModal(false), []);
  const handleShowModal = useCallback((message) => {
    setModalMessage(message);
    setShowModal(true);
  }, []);

  const handleLoginRedirect = useCallback(() => {
    handleCloseModal();
    navigate('/login'); // Use navigate for routing
  }, [handleCloseModal, navigate]);

  // Handle offcanvas state
  const handleCloseOffcanvas = useCallback(() => setShowOffcanvas(false), []);
  const handleShowOffcanvas = useCallback(() => setShowOffcanvas(true), []);

 // Fetch user data when logged in status or user email changes
  useEffect(() => {
    const fetchAndSetUser = async () => {
      // Check if the user is logged in AND if the email is available
      if (isLoggedIn && userEmail) {
        try {
          // Use userEmail directly, no need for localStorage or replace()
          const user = await fetchUserData(userEmail);
          setUserData(user);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          // Handle error gracefully
          setUserData({ firstname: '' });
        }
      } else {
        // Clear user data if logged out or email is not available
        setUserData({ firstname: '' });
      }
    };
    fetchAndSetUser();
  }, [isLoggedIn, userEmail]); // Depend on both isLoggedIn and userEmail
  
  // Define categories with more specific icons where possible
  const categories = [
    { name: 'Grocery Items', icon: <FaUtensils />, link: '/productsdata' },
    { name: 'Wellness Product', icon: <FaGift />, link: '/productsdata' },
    { name: 'Personal Collection', icon: <FaTshirt />, link: '/productsdata' },
    { name: 'Avon Collection', icon: <FaConciergeBell />, link: '/productsdata' },
    { name: 'Beauty and Hygiene', icon: <FaGift />, link: '/productsdata' }, // Example: maybe change icon
    { name: 'Fashion and Apparel', icon: <FaTshirt />, link: '/productsdata', isComingSoon: true },
    { name: 'Outdoor/Sports Equipment', icon: <FaBasketballBall />, link: '/productsdata', isComingSoon: true },
  ];

  // Define service items for better organization
  const otherServices = [
    'Loading phone/games',
    'ID printing',
    'Photo printing',
    'Document printing',
    'Scan',
    'Xerox',
    'Plastic laminate',
    'Internet',
  ];

  const travelServices = [
    { name: 'Loan form', link: '/loanform' },
    { name: 'Domestic/International ticketing', link: '/airlinebookingform' },
    { name: 'Travel and tours', link: '#' },
   { name: (<Badge bg="primary" className="mb-2 d-flex align-items-center gap-1"> <i className="bi bi-code-slash"></i> Own a Site Like This </Badge> ), link: '/developerservices' },

  ];

  return (
    <>
      <Navbar bg="white" variant="light" expand="lg" className="shadow-sm">
        <Container>
          {/* Mobile vs Desktop Home/Menu Toggle */}

            {isSmallScreen ? (
                <div className="position-relative w-100 d-flex justify-content-center align-items-center py-2">
                  {/* 1. Hamburger Menu */}
                  <Button
                    variant="outline-secondary"
                    onClick={handleShowOffcanvas}
                    aria-label="Open menu"
                    className="position-absolute start-0 top-50 translate-middle-y ms-2 z-3"
                  >
                    <FaBars />
                  </Button>

                  {/* 2. Account Dropdown */}
                  <Nav className="flex-row position-absolute end-0 top-50 translate-middle-y me-2">
                    {isLoggedIn ? (
                      <Dropdown
                        as={Nav.Item}
                        align="end"
                        drop="down"
                        autoClose="outside"
                        show={showDropdown}
                        onToggle={handleToggleDropdown}
                        className="position-relative"
                      >
                        <Dropdown.Toggle
                          as={Nav.Link}
                          id="account-dropdown"
                          className="p-0 d-flex align-items-center"
                          style={{ lineHeight: "1" }}
                        >
                          <FiUser size={22} />
                        </Dropdown.Toggle>

                        {/* Force dropdown below toggle */}
                        <Dropdown.Menu
                          className="mt-2 shadow-sm border-0 position-absolute"
                          style={{ top: "100%", right: "0" }}
                        >
                          <Dropdown.Header className="text-primary fw-bold">
                            Hi, {userData.firstname || "User"}
                          </Dropdown.Header>
                          <Dropdown.Divider />
                            <Dropdown.Item as={Link} to="/myaccount" onClick={handleCloseDropdown}>
                            <FiUser className="me-2" /> My Account
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to="/orders" onClick={handleCloseDropdown}>
                            <FaShoppingBag className="me-2" /> My Orders
                          </Dropdown.Item>
                          <Dropdown.Divider /> 
                          <Dropdown.Item onClick={() => {
                              handleLogout();
                              handleCloseDropdown();
                            }} className="text-danger">
                            <FaSignOutAlt className="me-2" /> Logout
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : (
                      <Dropdown
                        as={Nav.Item}
                        align="end"
                        drop="down"
                         show={showDropdown}
                         onToggle={handleToggleDropdown}
                        className="position-relative"
                      >
                        <Dropdown.Toggle
                          as={Nav.Link}
                          id="account-dropdown-guest"
                          className="p-0 d-flex align-items-center"
                          style={{ lineHeight: "1" }}
                        >
                          <FiUser size={22} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu
                          className="mt-2 shadow-sm border-0 position-absolute"
                          style={{ top: "100%", right: "0" }}
                        >
                          <Dropdown.Item as={Link} to="/login"  onClick={handleCloseDropdown}>
                            <FaSignInAlt className="me-2" /> Login
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to="/signupform"  onClick={handleCloseDropdown}>
                            <FaUserPlus className="me-2" /> Sign Up
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </Nav>
                </div>
              ) : (
                <Navbar.Brand as={Link} to="/" className="text-dark" aria-label="Home">
                  <FaHome size={24} className="text-secondary" />
                </Navbar.Brand>
              )}

          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto"> {/* Use me-auto to push items to the left */}
              {/* Product category dropdown */}
              <NavDropdown title="Categories" id="basic-nav-dropdown">
                {categories.map((cat, index) => (
                  <Dropdown.Item
                    key={index}
                    disabled={cat.isComingSoon}
                    as={!cat.isComingSoon ? Link : 'button'}
                    to={!cat.isComingSoon ? cat.link : undefined}
                    onClick={
                      !cat.isComingSoon
                        ? () => handleItemClickCategory(cat.name)
                        : undefined
                    }
                    title={cat.isComingSoon ? `${cat.name} - Coming Soon!` : undefined}
                  >
                    {cat.icon} {cat.name}
                    {cat.isComingSoon && (
                      <Badge bg="info" className="ms-2">
                        Coming Soon
                      </Badge>
                    )}
                  </Dropdown.Item>
                ))}
              </NavDropdown>

              {/* Services Dropdown */}
              <NavDropdown title="Services" id="services-nav-dropdown">
                {isLoggedIn ? (
                  <>
                    <NavDropdown title="Other Services" id="services-basic-dropdown">
                      {otherServices.map((service, index) => (
                        <Dropdown.Item key={index}>{service}</Dropdown.Item>
                      ))}
                    </NavDropdown>
                    {travelServices.map((service, index) => (
                      <Dropdown.Item as={Link} to={service.link} key={index} onClick={handleCloseOffcanvas}>
                        {service.name}
                      </Dropdown.Item>
                    ))}
                  </>
                ) : (
                  <Dropdown.Item
                    onClick={() => handleShowModal('Please log in to view services.')}
                  >
                    All Services
                  </Dropdown.Item>
                )}
              </NavDropdown>

              {/* Deals and Freebies (Desktop View Only) */}
              {!isSmallScreen && (
                <>
                  <Nav.Link
                    as={NavLink}
                    to="/alldealsproduct"
                    className="p-2 rounded text-dark bg-warning" // Applied Bootstrap classes
                    activeClassName="active-link"
                    aria-label="Deals page"
                  >
                    <FaPercent className="me-1" /> Deals
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/freebies"
                    className="ms-2 p-2 rounded text-dark" // Added margin-start
                    activeClassName="active-link"
                    aria-label="Freebies page"
                  >
                    <FaGift className="me-1" /> Get your freebies
                  </Nav.Link>
                </>
              )}
            </Nav>

            {/* Right-aligned items */}
            <Nav className="ms-auto"> {/* Use ms-auto to push items to the right */}
              {isLoggedIn ? (
                <Dropdown as={Nav.Item}>
                  <Dropdown.Toggle
                    as={Nav.Link}
                    id="dropdown-basic"
                    className="account-dropdown-toggle"
                  >
                    <FiUser className="me-2" />
                    {`Hello, ${userData.firstname || 'User'}`}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/myaccount">
                      <FiUser className="me-2" />My Account
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/orders">
                      <FaShoppingBag className="me-2" />My Orders
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}> <FaSignOutAlt className="me-2" />Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Nav.Link
                  as={Link}
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleShowModal('Please log in to access your account.');
                  }}
                  className="account-nav-link"
                >
                  My Account
                </Nav.Link>
              )}

              {isLoggedIn ? (
                <Nav.Link
                  as={NavLink}
                  to="/"
                  onClick={handleLogout}
                  className="ms-3 p-2 rounded text-danger" // Red for logout
                  activeClassName="active"
                  aria-label="Logout"
                >
                  <FaSignOutAlt className="me-1" /> Logout
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link
                    as={NavLink}
                    to="/login"
                    className="ms-3 p-2 rounded text-dark"
                    activeClassName="active"
                    aria-label="Login page"
                  >
                    <FaSignInAlt className="me-1" /> Login
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/signupform"
                    className="ms-2 p-2 rounded text-dark"
                    activeClassName="active"
                    aria-label="Sign up page"
                  >
                    <FaUserPlus className="me-1" /> Sign up
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Offcanvas Menu */}
<Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} placement="start" className="modern-offcanvas">
  <Offcanvas.Header closeButton className="border-bottom">
    <Offcanvas.Title className="fw-bold">Explore</Offcanvas.Title>
  </Offcanvas.Header>

  <Offcanvas.Body className="p-0"> {/* Remove padding for full-width items */}
    
    {/* --- User Hero Section --- */}
    <div className="bg-light p-4 mb-3 border-bottom">
      {isLoggedIn ? (
        <div className="d-flex align-items-center">
          <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
            {userData.firstname?.charAt(0) || 'U'}
          </div>
          <div>
            <h6 className="mb-0">Welcome, {userData.firstname}!</h6>
            <small className="text-muted">Manage your profile & orders</small>
          </div>
        </div>
      ) : (
        <div>
          <h6>Welcome to our Store</h6>
          <small>Login for the best experience</small>
        </div>
      )}
    </div>

    <Nav className="flex-column px-3">
      {/* --- Main Navigation Group --- */}
      <div className="menu-section-label text-uppercase text-muted small fw-bold mb-2">Main Menu</div>
      
      <Nav.Link as={NavLink} to="/" onClick={handleCloseOffcanvas} className="py-2">
        <FaHome className="me-2 text-primary" /> Home
      </Nav.Link>

      {/* --- Using Accordion for Categories (Better for Mobile) --- */}
      <Accordion flush className="w-100">
        <Accordion.Item eventKey="0" className="border-0">
          <Accordion.Header className="px-0 py-2">
            <FaServicestack className="me-2 text-primary" /> Categories
          </Accordion.Header>
          <Accordion.Body className="ps-4 py-0">
            {categories.map((cat, index) => (
              <Nav.Link 
                key={index} 
                as={Link} 
                to={cat.link} 
                disabled={cat.isComingSoon}
                className="d-flex align-items-center justify-content-between py-2 text-dark"
              >
                <span>{cat.icon} {cat.name}</span>
                {cat.isComingSoon && <Badge bg="secondary" size="sm">Soon</Badge>}
              </Nav.Link>
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Nav.Link as={NavLink} to="/alldealsproduct" onClick={handleCloseOffcanvas} className="py-2">
        <FaPercent className="me-2 text-danger" /> Hot Deals
      </Nav.Link>

      <hr className="my-3" />

      {/* --- Account Section --- */}
      <div className="menu-section-label text-uppercase text-muted small fw-bold mb-2">My Account</div>
      
      {isLoggedIn ? (
        <>
          <Nav.Link as={Link} to="/myaccount" onClick={handleCloseOffcanvas} className="py-2">
            <FiUser className="me-2" /> Profile Settings
          </Nav.Link>
          <Nav.Link as={Link} to="/orders" onClick={handleCloseOffcanvas} className="py-2">
            <FaGift className="me-2" /> My Orders
          </Nav.Link>
          <Nav.Link onClick={handleLogout} className="py-2 text-danger mt-4">
            <FaSignOutAlt className="me-2" /> Sign Out
          </Nav.Link>
        </>
      ) : (
        <div className="d-grid gap-2 mt-2">
          <Button variant="primary" as={Link} to="/login" onClick={handleCloseOffcanvas}>Login</Button>
          <Button variant="outline-primary" as={Link} to="/signupform" onClick={handleCloseOffcanvas}>Create Account</Button>
        </div>
      )}
    </Nav>
  </Offcanvas.Body>
</Offcanvas>

      {/* Global Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Authentication Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLoginRedirect}>
            Log In
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}