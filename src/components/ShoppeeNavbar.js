import React from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button, Dropdown, NavDropdown } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import Login from '../pages/Login';

function ShopeeNavbar({cartItems, isLoggedIn, handleLogout, handleLogin}) {
return (
 <Navbar bg="light" variant="light" expand="lg" className="mb-3">
   <Container>
			 	<Navbar.Brand as={Link} to="/" className="text-dark">
			<FaHome size={24} />
			 </Navbar.Brand>

     <Navbar.Toggle aria-controls="navbar-nav" />
		 <Navbar.Collapse id="navbar-nav">
		 <Nav className="ml-auto">

			<NavDropdown title="Product Category" id="basic-nav-dropdown">
	      
	            <Dropdown.Item as={Link} to="/products">Health & Wellness</Dropdown.Item>
	            <Dropdown.Item as={Link} to="/pcproducts">Personal Collection</Dropdown.Item>
	            <Dropdown.Item as={Link} to="/avonproducts">Avon Collection</Dropdown.Item>
	            <Dropdown.Item as={Link} to="/groceryitemspage">Food and beverages</Dropdown.Item>
	            <Dropdown.Item as={Link} to="/fashionapparel">Fashion and Apparel</Dropdown.Item>
	            <Dropdown.Item as={Link} to="/beautypersonalcare">Beauty and Personal Care</Dropdown.Item>
	            <Dropdown.Item as={Link} to="/electronicgadget">Electronic and Gadget</Dropdown.Item>
	            <Dropdown.Item as={Link} to="/homekitchen">Home and Kitchen Appliances</Dropdown.Item>
	            <Dropdown.Item as={Link} to="/mobileaccessories">Mobile Accessories</Dropdown.Item>
	            <Dropdown.Item as={Link} to="/homeimprovement">Home Improvement and DIY Tools</Dropdown.Item>
	            <Dropdown.Item as={Link} to="/outdoorsports">Outdoor and Sports Equipment</Dropdown.Item>
	            <Dropdown.Item as={Link} to="/officesupplies">Stationery and Office Supplies</Dropdown.Item>
	            <Dropdown.Item as={Link} to="/localproducts">Local Artisanal Products</Dropdown.Item>
	            <Dropdown.Item as={Link} to="/toysgames">Toys and Games</Dropdown.Item>
	            <Dropdown.Item as={Link} to="/jewelryaccessories">jewelry and Accessories</Dropdown.Item>
	            <Dropdown.Item as={Link} to="/petsupplies">Pet Supplies</Dropdown.Item>
	          {/* Add more category links as needed */}
	      
	      </NavDropdown>
      

		 <Nav.Link as={Link} to="/deals"><strong>Deals</strong></Nav.Link>
    </Nav>

		 <Nav className="ml-3">

			  {isLoggedIn ? (
			    <Nav.Link as={Link} to="/" onClick={handleLogout}>
			      Logout
			    </Nav.Link>
			  ) : (
			    <Nav.Link as={Link} to="/login">Login</Nav.Link>
			  )}

			  <Nav.Link as={Link} to="/myaccount">
			    My Account
			  </Nav.Link>
			</Nav>

 	</Navbar.Collapse>

 </Container>

</Navbar>
);

};

export default ShopeeNavbar;
