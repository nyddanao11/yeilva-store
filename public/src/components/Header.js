import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaSearch, FaShoppingCart } from 'react-icons/fa'; // Import icons

const Header = ({ cartItems, cartCount }) => {

console.log('Received cartCount:', cartCount);

const cartItemCountStyle = {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '12px',
    backgroundColor: '#EE6005',
    borderRadius: '50%',
    padding: '2px 8px',
    marginLeft: '-5px',
    position: 'relative', // Add relative positioning
    top: '7px', // Adjust the top property as needed for vertical positioning
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">

      <Container>

            <Navbar.Brand as={Link} to="/">
          <img
  src={process.env.PUBLIC_URL + '/logo.png'} // Correct way to access the image URL
  width="30"
  height="30"
  className="d-inline-block align-top"
  alt="YeilvaStore Logo"
/> <strong >YeilvaSTORE</strong> </Navbar.Brand>

       <Nav className="d-flex flex-row pe-1">
         <Nav.Link as={Link} to="/cart" style={{marginRight:"10px", borderRadius:"5px"}}>
              <FaShoppingCart size={22} />{' '}
              <span style={cartItemCountStyle}>{cartCount}</span>
              {/* Add shopping cart icon */}
            </Nav.Link>
             <Nav.Link as={Link} to="/search" style={{ borderRadius:"5px"}}>
              <FaSearch size={22} /> {/* Add search icon */}
            </Nav.Link>
         </Nav>


      </Container>

    </Navbar>
  );
};

export default Header;
