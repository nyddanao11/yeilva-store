import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaSearch, FaShoppingCart } from 'react-icons/fa'; // Import icons

const Header = ({ cartItems }) => {
  const cartItemCount = cartItems.length;

  const cartItemCountStyle = {
    color: '#EE6005', // Set the text color to red
    fontWeight: 'bold', // Add some extra styling (bold)
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
         <Nav.Link as={Link} to="/cart">
              <FaShoppingCart size={20} />{' '}
              <span style={cartItemCountStyle}>({cartItemCount})</span>
              {/* Add shopping cart icon */}
            </Nav.Link>
             <Nav.Link as={Link} to="/search">
              <FaSearch size={20} /> {/* Add search icon */}
            </Nav.Link>
         </Nav>


      </Container>

    </Navbar>
  );
};

export default Header;
