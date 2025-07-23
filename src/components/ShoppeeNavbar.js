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
} from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { fetchUserData } from './userService';
import './ShoppeeNavbar.css';
import { useMediaQuery } from 'react-responsive';

export default function ShopeeNavbar({
  cartItems, // Not used in this component, consider removing if truly not needed for the navbar
  isLoggedIn,
  handleLogout,
  handleLogin, // Not used directly, but related to the modal
  handleItemClickCategory,
}) {
  const [userData, setUserData] = useState({ firstname: '' });
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

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

  // Fetch user data when logged in status changes
  useEffect(() => {
    const fetchAndSetUser = async () => {
      if (isLoggedIn) { // Only fetch if logged in
        const storedUserEmail = localStorage.getItem('email');
        if (storedUserEmail) {
          try {
            const user = await fetchUserData(storedUserEmail.replace(/"/g, ''));
            setUserData(user);
          } catch (error) {
            console.error('Failed to fetch user data:', error);
            // Optionally, handle error state for UI (e.g., show a generic "User" name)
          }
        } else {
          console.log('User email not found in local storage, cannot fetch user data.');
          setUserData({ firstname: '' }); // Reset user data if email is missing
        }
      } else {
        setUserData({ firstname: '' }); // Clear user data if logged out
      }
    };

    fetchAndSetUser();
  }, [isLoggedIn]); // Depend on isLoggedIn to re-fetch when status changes

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
    { name: 'Hotel booking', link: '#' },
  ];

  return (
    <>
      <Navbar bg="white" variant="light" expand="lg" className="shadow-sm">
        <Container>
          {/* Mobile vs Desktop Home/Menu Toggle */}
          {isSmallScreen ? (
            <>
              <Button
                variant="outline-secondary"
                className="d-lg-none me-2" // Added margin-end for spacing
                onClick={handleShowOffcanvas}
                aria-label="Open menu" // Accessibility improvement
              >
                <FaBars />
              </Button>
              {/* These links are also in Offcanvas, consider if they are truly needed here on small screen */}
              <Nav className="flex-row"> {/* Use flex-row for horizontal alignment */}
                <Nav.Link
                  as={NavLink}
                  to="/alldealsproduct"
                  className="mx-1 p-2 rounded text-dark bg-warning" // Applied Bootstrap classes
                  activeClassName="active-link" // Custom class for active state
                  aria-label="Deals page"
                >
                  <FaPercent className="me-1" /> Deals
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/freebies"
                  className="mx-1 p-2 rounded text-dark" // Applied Bootstrap classes
                  activeClassName="active-link"
                  aria-label="Freebies page"
                >
                  <FaGift className="me-1" /> FREEstuff
                </Nav.Link>
              </Nav>
            </>
          ) : (
            <Navbar.Brand as={Link} to="/" className="text-dark" aria-label="Home">
              <FaHome size={24} className="text-secondary" /> {/* Use Bootstrap color utility */}
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
                      My Account
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/orders">
                      My Orders
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
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
                    <FaSignInAlt className="me-1" /> Sign up
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Offcanvas Menu */}
      <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} placement="start"> {/* Consistent placement */}
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={NavLink} to="/" onClick={handleCloseOffcanvas}>
              <FaHome className="me-2" /> Home
            </Nav.Link>

            <NavDropdown title={<><FaServicestack className="me-2" /> Categories</>} id="offcanvas-category-dropdown">
              {categories.map((cat, index) => (
                <Dropdown.Item
                  key={index}
                  disabled={cat.isComingSoon}
                  as={!cat.isComingSoon ? Link : 'button'}
                  to={!cat.isComingSoon ? cat.link : undefined}
                  onClick={
                    !cat.isComingSoon
                      ? () => {
                          handleItemClickCategory(cat.name);
                          handleCloseOffcanvas();
                        }
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

            <NavDropdown title={<><FaCogs className="me-2" /> Services</>} id="offcanvas-services-dropdown">
              {isLoggedIn ? (
                <>
                  <NavDropdown title="Other Services" id="offcanvas-other-services-dropdown">
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
                  onClick={() => {
                    handleShowModal('Please log in to view services.');
                    handleCloseOffcanvas();
                  }}
                >
                  All Services
                </Dropdown.Item>
              )}
            </NavDropdown>

            <Nav.Link
              as={NavLink}
              to="/alldealsproduct"
              onClick={handleCloseOffcanvas}
            >
              <FaPercent className="me-2" /> Deals
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/freebies"
              onClick={handleCloseOffcanvas}
            >
              <FaGift className="me-2" /> Get your freebies
            </Nav.Link>

            {isLoggedIn ? (
              <Dropdown as={Nav.Item} className="w-100"> {/* Make dropdown full width in Offcanvas */}
                <Dropdown.Toggle as={Nav.Link} id="offcanvas-account-dropdown" className="d-flex align-items-center">
                  <FiUser className="me-2" />
                  {`Hello, ${userData.firstname || 'User'}`}
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-100">
                  <Dropdown.Item as={Link} to="/myaccount" onClick={handleCloseOffcanvas}>
                    My Account
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/orders" onClick={handleCloseOffcanvas}>
                    My Orders
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => { handleLogout(); handleCloseOffcanvas(); }}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link
                as={Link}
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleShowModal('Please log in to access your account.');
                  handleCloseOffcanvas();
                }}
              >
                <FiUser className="me-2" /> My Account
              </Nav.Link>
            )}

            {isLoggedIn ? (
              <Nav.Link
                as={NavLink}
                to="/"
                onClick={() => {
                  handleLogout();
                  handleCloseOffcanvas();
                }}
              >
                <FaSignOutAlt className="me-2" /> Logout
              </Nav.Link>
            ) : (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/login"
                  onClick={handleCloseOffcanvas}
                >
                  <FaSignInAlt className="me-2" /> Login
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/signupform"
                  onClick={handleCloseOffcanvas}
                >
                  <FaSignInAlt className="me-2" /> Sign up
                </Nav.Link>
              </>
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