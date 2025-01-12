import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Dropdown, Modal, NavDropdown, Offcanvas, Button} from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaHome,  FaServicestack, FaGift, FaBars, FaTags, FaAppleAlt, FaLaptop, FaTshirt, FaCogs, FaBasketballBall, FaConciergeBell, FaUtensils, FaPercent, FaSignInAlt, FaSignOutAlt, FaTree, FaSnowflake } from 'react-icons/fa'; // Added FaTree and FaSnowflake
import { FiUser } from 'react-icons/fi';
import { fetchUserData } from './userService';
import './ShoppeeNavbar.css'; // Update your CSS with Christmas theme colors
import { useMediaQuery } from 'react-responsive';


export default function ShopeeNavbar({ cartItems, isLoggedIn, handleLogout, handleLogin }) {
  const [userData, setUserData] = useState({ firstname: '' });
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });
 const [showModal, setShowModal] = useState(false);
 const [modalMessage, setModalMessage] = useState('');

  const handleClose = () => setShowModal(false);
  const handleShowModal = (message) => {
  setModalMessage(message);
  setShowModal(true);
};

  const handleLoginRedirect = () => {
    setShowModal(false);
    // Redirect to login page
    window.location.href = '/login'; // or use navigate('/login') if using react-router
  };


  useEffect(() => {
    const storedUserEmail = localStorage.getItem('email');
    const fetchUser = async () => {
      if (storedUserEmail) {
        try {
          const user = await fetchUserData(storedUserEmail.replace(/"/g, ''));
          setUserData(user);
        } catch (error) {
          console.error('Error setting user data:', error);
        }
      } else {
        console.log('Email is missing in local storage');
      }
    };
    fetchUser();
  }, [isLoggedIn]);

  
  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);

  return (
    <>
      {/* Navbar with Christmas colors */}
      <Navbar bg="white" variant="light" expand="lg" className="shadow-sm ">
        <Container>
          {isSmallScreen? (

          <>
          {/* Home icon with Christmas tree */}
          <Navbar.Brand as={Link} to="/" className="home text-dark" >
            <FaHome size={24} style={{ borderRadius: '5px', color:'#5D5D5D' }}/>
          </Navbar.Brand>
                  <Nav>
                <Nav.Link as={NavLink} to="/dealsofday" style={{ paddingLeft: '6px', paddingRight: '6px', borderRadius: '5px', color: '#5D5D5D', backgroundColor: '#FFD700', borderRadius: '5px' }}>
                  <FaPercent style={{ marginRight: '5px', color: '#5D5D5D' }} /> Deals
                </Nav.Link>
              </Nav>
              {/* Freebies with Snowflake icon */}
              <Nav>
                <Nav.Link as={NavLink} to="/freebies" style={{ paddingLeft: '6px', paddingRight: '6px', borderRadius: '5px', color: '#5D5D5D' }}>
                  <FaGift style={{ marginRight: '5px', color: '#5D5D5D' }} /> FREEstuff
                </Nav.Link>
              </Nav>
              </>

          ):(
          <>
          {/* Home icon with Christmas tree */}
          <Navbar.Brand as={Link} to="/" className="home text-dark" >
            <FaHome size={24} style={{ borderRadius: '5px', color: '#5D5D5D' }}/>
          </Navbar.Brand>

            <Button variant="outline-secondary" className="d-lg-none" onClick={handleShowOffcanvas}>
            <FaBars />
          </Button>
          </>

          )}

          <Button variant="outline-secondary" className="d-lg-none" onClick={handleShowOffcanvas}>
            <FaBars />
          </Button>

          <Navbar.Collapse id="navbar-nav" className="justify-content-lg-between">
            <Nav className="ml-auto">
              {/* Product category dropdown */}
              <Nav>
                <NavDropdown title="Product category" id="basic-nav-dropdown" style={{ paddingLeft: '10px', paddingRight: '10px', borderRadius: '5px', color: 'red' }}>
                   <Dropdown.Item as={Link} to="/groceryitems"><FaAppleAlt style={{ marginRight: '5px' }} />Food & Beverages/Grocery Items</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/products"><FaConciergeBell style={{ marginRight: '5px' }} />Health & Wellness</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/pcproducts"><FaConciergeBell style={{ marginRight: '5px' }} />Personal Collection</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/avonproducts"><FaConciergeBell style={{ marginRight: '5px' }} />Avon Collection</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/beautyproducts"><FaConciergeBell style={{ marginRight: '5px' }} />Beauty and Personal Care</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/fashionapparel"><FaTshirt style={{ marginRight: '5px' }} />Fashion and Apparel</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/consumerelectronics"><FaLaptop style={{ marginRight: '5px' }} />Electronics</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/homekitchen"><FaUtensils style={{ marginRight: '5px' }} />Home and Kitchen Appliances</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/homeimprovement"><FaCogs style={{ marginRight: '5px' }} />Home Improvement and DIY Tools</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/outdoorsports"><FaBasketballBall style={{ marginRight: '5px' }} />Outdoor and Sports Equipment</Dropdown.Item>
                </NavDropdown>
              </Nav>


              <Nav>
                <NavDropdown title="Services" id="services-nav-dropdown" style={{ paddingLeft: '5px', paddingRight: '10px', borderRadius: '5px' }}>
                  {isLoggedIn ? (
                    <>
                      <NavDropdown title="Other Services" id="services-basic-dropdown" style={{ paddingLeft: '5px', paddingRight: '10px', borderRadius: '5px' }}>
                        <Dropdown.Item>Loading phone/games</Dropdown.Item>
                        <Dropdown.Item>ID printing</Dropdown.Item>
                        <Dropdown.Item>Photo printing</Dropdown.Item>
                        <Dropdown.Item>Document printing</Dropdown.Item>
                        <Dropdown.Item>Scan</Dropdown.Item>
                        <Dropdown.Item>Xerox</Dropdown.Item>
                        <Dropdown.Item>Plastic laminate</Dropdown.Item>
                        <Dropdown.Item>Internet</Dropdown.Item>
                      </NavDropdown>
                      <Dropdown.Item as={Link} to="/loanform">Loan form</Dropdown.Item>
                      <Dropdown.Item as={Link} to="/airlinebookingform">Domestic/International ticketing</Dropdown.Item>
                      <Dropdown.Item>Travel and tours</Dropdown.Item>
                      <Dropdown.Item>Hotel booking</Dropdown.Item>
                    </>
                  ) : (
                    <>
                        {/* Dropdown Item */}
                       <Dropdown.Item
                        onClick={() => {
                          if (!isLoggedIn) {
                             handleShowModal('Please log in to view services.');
                          }
                          handleCloseOffcanvas(); // Close the offcanvas
                        }}
                      >
                          All Services
                        </Dropdown.Item>
                      </>
                  )}
                </NavDropdown>
              </Nav>

              {/* Christmas Deals section */}
              <Nav>
                <Nav.Link as={NavLink} to="/dealsofday" style={{ paddingLeft: '10px', paddingRight: '10px', borderRadius: '5px', color: '#5D5D5D', backgroundColor: '#FFD700', borderRadius: '5px' }}>
                  <FaPercent style={{ marginRight: '5px', color: '#5D5D5D' }} /> Deals
                </Nav.Link>
              </Nav>

              {/* Freebies with Snowflake icon */}
              <Nav>
                <Nav.Link as={NavLink} to="/freebies" style={{ marginLeft:'6px', paddingLeft: '10px', paddingRight: '10px', borderRadius: '5px', color: '#5D5D5D' }}>
                  <FaGift style={{ marginRight: '5px', color: '#5D5D5D' }} /> Get your freebies
                </Nav.Link>
              </Nav>

                       {/* Account Section */}
                <Nav.Link
                  as={NavLink}
                  to={isLoggedIn ? "/myaccount" : undefined} // Omit "to" if not logged in
                  style={{ marginLeft:'6px', paddingLeft: '10px', paddingRight: '10px', borderRadius: '5px' }}
                  activeClassName="active"
                    onClick={() => {
                          if (!isLoggedIn) {
                           handleShowModal('Please log in to access your account.');
                          }
                          handleCloseOffcanvas(); // Close the offcanvas
                        }}
                      
                >
                  {isLoggedIn ? (
                    <>
                      <FiUser style={{ marginRight: '0.5rem' }} />
                      {`Hello, ${userData?.firstname ?? 'loading...'}`}
                    </>
                  ) : (
                    'My Account'
                  )}
                </Nav.Link>

              <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Authentication Required</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {modalMessage}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleLoginRedirect}>
                    Log In
                  </Button>
                </Modal.Footer>
              </Modal>

            </Nav>

            {/* Logout/Login buttons */}
            <Nav className="ml-3">
              {isLoggedIn ? (
                <Nav.Link as={NavLink} to="/" onClick={handleLogout} style={{ paddingLeft: '10px', paddingRight: '10px', borderRadius: '5px', color: 'red' }} activeClassName="active">
                  Logout
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/login" style={{ paddingLeft: '10px', paddingRight: '10px', borderRadius: '5px', color: 'black' }} activeClassName="active">Login</Nav.Link>
                  <Nav.Link as={NavLink} to="/signupform" style={{ paddingLeft: '10px', paddingRight: '10px', borderRadius: '5px', color: 'black' }} activeClassName="active">Sign up</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    {/* Offcanvas for additional menu items */}
      <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} placement="end" >
        <Offcanvas.Header closeButton style={{ borderBottom: "1px #d3d4d5 solid" }}>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={NavLink} to="/" onClick={handleCloseOffcanvas}><FaHome style={{ marginRight: '5px' }} /> Home</Nav.Link>
            <NavDropdown {...`${< FaServicestack />}`} title="Product category" id="product-category-dropdown" style={{ paddingRight: '10px', borderRadius: '5px' }}>
              <Dropdown.Item as={Link} to="/groceryitems" onClick={handleCloseOffcanvas}><FaAppleAlt style={{ marginRight: '5px' }} />Food & Beverages/Grocery Items</Dropdown.Item>
              <Dropdown.Item as={Link} to="/products" onClick={handleCloseOffcanvas}><FaConciergeBell style={{ marginRight: '5px' }} />Health & Wellness</Dropdown.Item>
              <Dropdown.Item as={Link} to="/pcproducts" onClick={handleCloseOffcanvas}><FaConciergeBell style={{ marginRight: '5px' }} />Personal Collection</Dropdown.Item>
              <Dropdown.Item as={Link} to="/avonproducts" onClick={handleCloseOffcanvas}><FaConciergeBell style={{ marginRight: '5px' }} />Avon Collection</Dropdown.Item>
              <Dropdown.Item as={Link} to="/beautyproducts" onClick={handleCloseOffcanvas}><FaConciergeBell style={{ marginRight: '5px' }} />Beauty and Personal Care</Dropdown.Item>
              <Dropdown.Item as={Link} to="/fashionapparel" onClick={handleCloseOffcanvas}><FaTshirt style={{ marginRight: '5px' }} />Fashion and Apparel</Dropdown.Item>
              <Dropdown.Item as={Link} to="/consumerelectronics" onClick={handleCloseOffcanvas}><FaLaptop style={{ marginRight: '5px' }} />Electronics</Dropdown.Item>
              <Dropdown.Item as={Link} to="/homekitchen" onClick={handleCloseOffcanvas}><FaUtensils style={{ marginRight: '5px' }} />Home and Kitchen Appliances</Dropdown.Item>
              <Dropdown.Item as={Link} to="/homeimprovement" onClick={handleCloseOffcanvas}><FaCogs style={{ marginRight: '5px' }} />Home Improvement and DIY Tools</Dropdown.Item>
              <Dropdown.Item as={Link} to="/outdoorsports" onClick={handleCloseOffcanvas}><FaBasketballBall style={{ marginRight: '5px' }} />Outdoor and Sports Equipment</Dropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav>
            <NavDropdown title="Services" id="services-dropdown" style={{ paddingRight: '10px', borderRadius: '5px' }}>
              {isLoggedIn ? (
                <>
                  <NavDropdown title="Other Services" id="other-services-dropdown" style={{ paddingRight: '10px', borderRadius: '5px' }}>
                    <Dropdown.Item>Loading phone/games</Dropdown.Item>
                    <Dropdown.Item>ID printing</Dropdown.Item>
                    <Dropdown.Item>Photo printing</Dropdown.Item>
                    <Dropdown.Item>Document printing</Dropdown.Item>
                    <Dropdown.Item>Scan</Dropdown.Item>
                    <Dropdown.Item>Xerox</Dropdown.Item>
                    <Dropdown.Item>Plastic laminate</Dropdown.Item>
                    <Dropdown.Item>Internet</Dropdown.Item>
                  </NavDropdown>
                  <Dropdown.Item as={Link} to="/loanform" onClick={handleCloseOffcanvas}>Loan form</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/airlinebookingform" onClick={handleCloseOffcanvas}>Domestic/International ticketing</Dropdown.Item>
                  <Dropdown.Item>Travel and tours</Dropdown.Item>
                  <Dropdown.Item>Hotel booking</Dropdown.Item>
                </>
              ) : (
               <>
                        {/* Dropdown Item */}
                       <Dropdown.Item
                        onClick={() => {
                          if (!isLoggedIn) {
                             handleShowModal('Please log in to view services.');
                          }
                          handleCloseOffcanvas(); // Close the offcanvas
                        }}
                      >
                          All Services
                        </Dropdown.Item>
                      </>
              )}
            </NavDropdown>
          </Nav>

          <Nav className="flex-column" >
            <Nav.Link as={NavLink} to="/dealsofday" onClick={handleCloseOffcanvas}><FaPercent  style={{ marginRight: '5px', color: '#5D5D5D' }}/>Deals</Nav.Link>
            <Nav.Link as={NavLink} to="/freebies" onClick={handleCloseOffcanvas}><FaGift style={{ marginRight: '5px', color: '#5D5D5D' }} /> Get your freebies</Nav.Link>
                    {/* Account Section */}
                <Nav.Link
                  as={NavLink}
                  to={isLoggedIn ? "/myaccount" : undefined} // Omit "to" if not logged in
                  style={{ paddingLeft: '10px', paddingRight: '10px', borderRadius: '5px' }}
                  activeClassName="active"
                    onClick={() => {
                          if (!isLoggedIn) {
                            handleShowModal('Please log in to access your account.');
                          }
                          handleCloseOffcanvas(); // Close the offcanvas
                        }}
                      
                >
                  {isLoggedIn ? (
                    <>
                      <FiUser style={{ marginRight: '0.5rem' }} />
                      {`Hello, ${userData?.firstname ?? 'loading...'}`}
                    </>
                  ) : (
                    'My Account'
                  )}
                </Nav.Link>

              <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Authentication Required</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Please log in to continue accessing your account.
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleLoginRedirect}>
                    Log In
                  </Button>
                </Modal.Footer>
              </Modal>

            {isLoggedIn ? (
              <Nav.Link as={NavLink} to="/" onClick={() => { handleLogout(); handleCloseOffcanvas(); }}><FaSignOutAlt style={{ marginRight:'5px' }} />Logout</Nav.Link>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" onClick={handleCloseOffcanvas}><FaSignInAlt style={{ marginRight:'5px' }} />Login</Nav.Link>
                <Nav.Link as={NavLink} to="/signupform" onClick={handleCloseOffcanvas}><FaSignInAlt style={{ marginRight:'5px' }} />Sign up</Nav.Link>
              </>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

