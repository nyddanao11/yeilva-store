import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Dropdown, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate} from 'react-router-dom';
import { FaHome, FaGift } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { fetchUserData } from './userService';
import './ShoppeeNavbar.css';

function ShopeeNavbar({cartItems, isLoggedIn, handleLogout, handleLogin}) {

	 const [userData, setUserData] = useState({
    firstname: '',
   
  });
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
  }, [isLoggedIn]); // Add isLoggedIn as a dependency to the useEffect

 const handleAlertAndNavigate = (path) => {
    if (!isLoggedIn) {
      alert('Please log in to continue');
      navigate('/login');
    } else {
      navigate(path);
    }
  };

 return (
    <Navbar bg="white" variant="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="home text-dark" style={{ borderRadius: '5px' }}>
          <FaHome size={24} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-lg-between">
          <Nav className="ml-auto">
          <Nav>
            <NavDropdown title="Product Category" id="basic-nav-dropdown" style={{ paddingLeft: '10px', paddingRight: '10px', borderRadius: '5px' }}>
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
		                   <NavDropdown title="Other Services" id="services-basic-dropdown"  style={{ paddingLeft: '5px', paddingRight: '10px', borderRadius: '5px' }}>
		                 
		                    <Dropdown.Item>Loading phone/games</Dropdown.Item>
		                    <Dropdown.Item>ID printing</Dropdown.Item>
		                    <Dropdown.Item>Photo printing</Dropdown.Item>
		                    <Dropdown.Item>Document printing</Dropdown.Item>
		                    <Dropdown.Item>Scan</Dropdown.Item>
		                    <Dropdown.Item>Xerox</Dropdown.Item>
		                    <Dropdown.Item>Plastic Laminate</Dropdown.Item>
		                    <Dropdown.Item>Internet</Dropdown.Item>
		                 
		                    </NavDropdown>
		                 
		                   <Dropdown.Item as={Link} to="/loanform">Loan Form</Dropdown.Item>
		                   <Dropdown.Item >Domestic/International Ticketing</Dropdown.Item>
		                   <Dropdown.Item >Travel and Tours</Dropdown.Item>
		                   <Dropdown.Item >Hotel Booking</Dropdown.Item>
		                </>
                ) : (
                  <>
                    <Dropdown.Item onClick={() => handleAlertAndNavigate('/loanform')}>All Services</Dropdown.Item>
                  </>
                )}
              </NavDropdown>

            </Nav>
            
            <Nav>
                <Nav.Link as={NavLink} to="/dealsofday" style={{ paddingLeft: '10px', paddingRight: '10px', borderRadius: '5px' }} activeClassName="active"><strong>Deals</strong></Nav.Link>
            </Nav>

              <Nav>
              <Nav.Link as={NavLink} to="/freebies" style={{ paddingLeft: '10px', paddingRight: '10px', borderRadius: '5px' }} activeClassName="active"><span><FaGift /> Get your Freebies</span></Nav.Link>
             
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
                'My Account'
              )}
            </Nav.Link>
            
        </Nav>
    
          <Nav className='ml-3'>
            {isLoggedIn ? (
              <Nav.Link as={NavLink} to="/" onClick={handleLogout} style={{ paddingLeft: '10px', paddingRight: '10px', borderRadius: '5px' }} activeClassName="active">
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link as={NavLink} to="/login" style={{ paddingLeft: '10px', paddingRight: '10px', borderRadius: '5px' }} activeClassName="active">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ShopeeNavbar;
