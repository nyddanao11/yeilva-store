import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Dropdown, NavDropdown, Offcanvas, Button } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaGift, FaBars } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { fetchUserData } from './userService';
import './ShoppeeNavbar.css';

function ShopeeNavbar({ cartItems, isLoggedIn, handleLogout, handleLogin }) {
  const [userData, setUserData] = useState({
    firstname: '',
  });
  const [showOffcanvas, setShowOffcanvas] = useState(false); // State to control offcanvas visibility
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

          {/* Offcanvas Toggle Button: Visible on small screens only */}
          <Button variant="outline-secondary" className="d-lg-none" onClick={handleShowOffcanvas}>
            <FaBars />
          </Button>

          {/* Navbar Toggle Button: Hidden on small screens, visible on large screens */}
        
          <Navbar.Collapse id="navbar-nav" className="justify-content-lg-between">
            <Nav className="ml-auto">
              <Nav>
                <NavDropdown title="Product category" id="basic-nav-dropdown" style={{ paddingLeft: '10px', paddingRight: '10px', borderRadius: '5px' }}>
                  <Dropdown.Item as={Link} to="/groceryitemspage">Food & Beverages/Grocery Items</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/schoolsupplies">School and Office Supplies</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/products">Health & Wellness</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/pcproducts">Personal Collection</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/avonproducts">Avon Collection</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/beautyproducts">Beauty and Personal Care</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/fashionapparel">Fashion and Apparel</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/consumerelectronics">Electronics</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/homekitchen">Home and Kitchen Appliances</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/homeimprovement">Home Improvement and DIY Tools</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/outdoorsports">Outdoor and Sports Equipment</Dropdown.Item>
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
                    <>
                      <Dropdown.Item onClick={isLoggedIn ? () => handleAlertAndNavigate('/loanform') : () => alert('Please log in to continue')}>All services</Dropdown.Item>
                    </>
                  )}
                </NavDropdown>
              </Nav>

              <Nav>
                <Nav.Link as={NavLink} to="/dealsofday" style={{ paddingLeft: '10px', paddingRight: '10px', borderRadius: '5px' }} activeClassName="active"><strong>Deals</strong></Nav.Link>
              </Nav>

              <Nav>
                <Nav.Link as={NavLink} to="/freebies" style={{ paddingLeft: '10px', paddingRight: '10px', borderRadius: '5px' }} activeClassName="active"><span><FaGift /> Get your freebies</span></Nav.Link>
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
  <Offcanvas.Header closeButton  style={{borderBottom:"1px #d3d4d5 solid"}}>
    <Offcanvas.Title >Menu</Offcanvas.Title>
  </Offcanvas.Header>
  <Offcanvas.Body >
    <Nav className="flex-column">
      <Nav.Link as={NavLink} to="/" onClick={handleCloseOffcanvas}> <FaHome size={24} /></Nav.Link>
      <NavDropdown title="Product category" id="product-category-dropdown" style={{ paddingRight: '10px', borderRadius: '5px' }}>
        <Dropdown.Item as={Link} to="/groceryitemspage" onClick={handleCloseOffcanvas}>Food & Beverages/Grocery Items</Dropdown.Item>
        <Dropdown.Item as={Link} to="/schoolsupplies" onClick={handleCloseOffcanvas}>School and Office Supplies</Dropdown.Item>
        <Dropdown.Item as={Link} to="/products" onClick={handleCloseOffcanvas}>Health & Wellness</Dropdown.Item>
        <Dropdown.Item as={Link} to="/pcproducts" onClick={handleCloseOffcanvas}>Personal Collection</Dropdown.Item>
        <Dropdown.Item as={Link} to="/avonproducts" onClick={handleCloseOffcanvas}>Avon Collection</Dropdown.Item>
        <Dropdown.Item as={Link} to="/beautyproducts" onClick={handleCloseOffcanvas}>Beauty and Personal Care</Dropdown.Item>
        <Dropdown.Item as={Link} to="/fashionapparel" onClick={handleCloseOffcanvas}>Fashion and Apparel</Dropdown.Item>
        <Dropdown.Item as={Link} to="/consumerelectronics" onClick={handleCloseOffcanvas}>Electronics</Dropdown.Item>
        <Dropdown.Item as={Link} to="/homekitchen" onClick={handleCloseOffcanvas}>Home and Kitchen Appliances</Dropdown.Item>
        <Dropdown.Item as={Link} to="/homeimprovement" onClick={handleCloseOffcanvas}>Home Improvement and DIY Tools</Dropdown.Item>
        <Dropdown.Item as={Link} to="/outdoorsports" onClick={handleCloseOffcanvas}>Outdoor and Sports Equipment</Dropdown.Item>
      </NavDropdown>
    </Nav>

    <Nav>
      <NavDropdown title="Services" id="services-dropdown" style={{  paddingRight: '10px', borderRadius: '5px' }}>
        {isLoggedIn ? (
          <>
            <NavDropdown title="Other Services" id="other-services-dropdown" style={{  paddingRight: '10px', borderRadius: '5px' }}>
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
    
      <Nav.Link as={NavLink} to="/dealsofday" onClick={handleCloseOffcanvas}><strong>Deals</strong></Nav.Link>
      <Nav.Link as={NavLink} to="/freebies" onClick={handleCloseOffcanvas}><FaGift /> Get your freebies</Nav.Link>
      <Nav.Link as={NavLink} to={isLoggedIn ? "/myaccount" : "/login"} onClick={handleCloseOffcanvas}>
        {isLoggedIn ? `Hello, ${userData.firstname ?? 'loading...'}` : 'My account'}
      </Nav.Link>
      {isLoggedIn ? (
        <Nav.Link as={NavLink} to="/" onClick={() => { handleLogout(); handleCloseOffcanvas(); }}>Logout</Nav.Link>
      ) : (
        <>
          <Nav.Link as={NavLink} to="/login" onClick={handleCloseOffcanvas}>Login</Nav.Link>
          <Nav.Link as={NavLink} to="/signupform" onClick={handleCloseOffcanvas}>Sign up</Nav.Link>
        </>
      )}
    </Nav>
  </Offcanvas.Body>
</Offcanvas>

    </>
  );
}

export default ShopeeNavbar;
