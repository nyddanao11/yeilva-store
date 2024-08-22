import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Dropdown, NavDropdown, Offcanvas, Button } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaServicestack, FaGift, FaBars, FaAppleAlt, FaLaptop, FaTshirt, FaCogs, FaBasketballBall, FaConciergeBell, FaUtensils, FaPercent, FaSignInAlt, FaSignOutAlt  } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { fetchUserData } from './userService';
import './ShoppeeNavbar.css';

function ShopeeNavbar({ cartItems, isLoggedIn, handleLogout, handleLogin }) {
  const [userData, setUserData] = useState({ firstname: '' });
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const navigate = useNavigate();

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

  const handleAlertAndNavigate = (path) => {
    if (!isLoggedIn) {
      alert('Please log in to continue');
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);

  return (
    <>
      <Navbar bg="white" variant="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/" className="home text-dark" style={{ borderRadius: '5px' }}>
            <FaHome size={24} />
          </Navbar.Brand>

          <Button variant="outline-secondary" className="d-lg-none" onClick={handleShowOffcanvas}>
            <FaBars />
          </Button>

          <Navbar.Collapse id="navbar-nav" className="justify-content-lg-between">
            <Nav className="ml-auto">
              <Nav>
                <NavDropdown title="Product category"  id="basic-nav-dropdown" style={{ paddingLeft: '10px', paddingRight: '10px', borderRadius: '5px' }}>
                  <Dropdown.Item as={Link} to="/groceryitemspage"><FaAppleAlt style={{ marginRight: '5px' }} />Food & Beverages/Grocery Items</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/schoolsupplies"><FaLaptop style={{ marginRight: '5px' }} />School and Office Supplies</Dropdown.Item>
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
                      <Dropdown.Item>Domestic/International ticketing</Dropdown.Item>
                      <Dropdown.Item>Travel and tours</Dropdown.Item>
                      <Dropdown.Item>Hotel booking</Dropdown.Item>
                    </>
                  ) : (
                    <Dropdown.Item onClick={() => { alert('Please log in to continue'); handleCloseOffcanvas(); }}>All services</Dropdown.Item>
                  )}
                </NavDropdown>
              </Nav>

              <Nav>
                <Nav.Link as={NavLink} to="/dealsofday" style={{ paddingLeft: '10px', paddingRight: '10px', borderRadius: '5px' }} activeClassName="active"><strong>Deals</strong></Nav.Link>
              </Nav>

              <Nav>
                <Nav.Link as={NavLink} to="/freebies" style={{ paddingLeft: '10px', paddingRight: '10px', borderRadius: '5px' }} activeClassName="active"><FaGift style={{ marginRight: '5px' }} /> Get your freebies</Nav.Link>
              </Nav>

              <Nav.Link
                as={NavLink}
                to={isLoggedIn ? "/myaccount" : "#"}
                style={{ paddingLeft: '10px', paddingRight: '10px', borderRadius: '5px' }}
                activeClassName="active"
                onClick={!isLoggedIn ? () => handleAlertAndNavigate('/myaccount') : undefined}
              >
                {isLoggedIn ? (
                  <>
                    <FiUser style={{ marginRight: '0.5rem' }} />
                    {`Hello, ${userData.firstname ?? 'loading...'}`}
                  </>
                ) : (
                  'My account'
                )}
              </Nav.Link>
            </Nav>

            <Nav className="ml-3">
              {isLoggedIn ? (
                <Nav.Link as={NavLink} to="/" onClick={handleLogout} style={{ paddingLeft: '10px', paddingRight: '10px', borderRadius: '5px' }} activeClassName="active">
                  Logout
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/login" style={{ paddingLeft: '10px', paddingRight: '10px', borderRadius: '5px' }} activeClassName="active">Login</Nav.Link>
                  <Nav.Link as={NavLink} to="/signupform" style={{ paddingLeft: '10px', paddingRight: '10px', borderRadius: '5px' }} activeClassName="active">Sign up</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Offcanvas for additional menu items */}
      <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} placement="end">
        <Offcanvas.Header closeButton style={{ borderBottom: "1px #d3d4d5 solid" }}>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={NavLink} to="/" onClick={handleCloseOffcanvas}><FaHome style={{ marginRight: '5px' }} /> Home</Nav.Link>
            <NavDropdown {...`${< FaServicestack />}`} title="Product category" id="product-category-dropdown" style={{ paddingRight: '10px', borderRadius: '5px' }}>
              <Dropdown.Item as={Link} to="/groceryitemspage" onClick={handleCloseOffcanvas}><FaAppleAlt style={{ marginRight: '5px' }} />Food & Beverages/Grocery Items</Dropdown.Item>
              <Dropdown.Item as={Link} to="/schoolsupplies" onClick={handleCloseOffcanvas}><FaLaptop style={{ marginRight: '5px' }} />School and Office Supplies</Dropdown.Item>
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
                  <Dropdown.Item>Domestic/International ticketing</Dropdown.Item>
                  <Dropdown.Item>Travel and tours</Dropdown.Item>
                  <Dropdown.Item>Hotel booking</Dropdown.Item>
                </>
              ) : (
                <Dropdown.Item onClick={() => { alert('Please log in to continue'); handleCloseOffcanvas(); }}>All services</Dropdown.Item>
              )}
            </NavDropdown>
          </Nav>

          <Nav className="flex-column">
            <Nav.Link as={NavLink} to="/dealsofday" onClick={handleCloseOffcanvas}><FaPercent  style={{ marginRight:'5px' }}/><strong>Deals</strong></Nav.Link>
            <Nav.Link as={NavLink} to="/freebies" onClick={handleCloseOffcanvas}><FaGift style={{ marginRight: '5px'}} /> Get your freebies</Nav.Link>
            <Nav.Link as={NavLink} to={isLoggedIn ? "/myaccount" : "/login"} onClick={handleCloseOffcanvas}><FiUser style={{ marginRight:'5px' }} /> {isLoggedIn ? ` Hello, ${userData.firstname ?? 'loading...'}` : 'My account'}</Nav.Link>
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

export default ShopeeNavbar;
