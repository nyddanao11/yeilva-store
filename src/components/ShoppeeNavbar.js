import React from 'react';
import { Navbar, Nav, Container, Dropdown, NavDropdown } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import { FaHome } from 'react-icons/fa';



function ShopeeNavbar({cartItems, isLoggedIn, handleLogout, handleLogin}) {
return (
 <Navbar bg="white" variant="light" expand="lg" className="mb-3 shadow-sm">
   <Container>
			 	<Navbar.Brand as={Link} to="/" className="text-dark">
			<FaHome size={24} />
			 </Navbar.Brand>

     <Navbar.Toggle aria-controls="navbar-nav" />
		 <Navbar.Collapse id="navbar-nav">
		 <Nav className="ml-auto" >

			<NavDropdown title="Product Category" id="basic-nav-dropdown">
	      
	            <Dropdown.Item as={Link} to="/groceryitemspage">Food&Beverages/GroceryItems</Dropdown.Item>
	            <Dropdown.Item as={Link} to="/schoolsupplies">School and Office Supplies</Dropdown.Item>
	            <Dropdown.Item as={Link} to="/products">Health & Wellness</Dropdown.Item>
	            <Dropdown.Item as={Link} to="/pcproducts">Personal Collection</Dropdown.Item>
	            <Dropdown.Item as={Link} to="/avonproducts">Avon Collection</Dropdown.Item>
	            <Dropdown.Item as={Link} to="/beautyproducts">Beauty and Personal Care</Dropdown.Item>
	            <Dropdown.Item as={Link} to="/fashionapparel">Fashion and Apparel</Dropdown.Item>
	           <Dropdown.Item as={Link} to="/homekitchen">Home and Kitchen Appliances</Dropdown.Item>
	           <Dropdown.Item as={Link} to="/homeimprovement">Home Improvement and DIY Tools</Dropdown.Item>
	            <Dropdown.Item as={Link} to="/outdoorsports">Outdoor and Sports Equipment</Dropdown.Item>   
	            
	          {/* Add more category links as needed */}
	      
	      </NavDropdown>
	     

		 <Nav.Link as={Link} to="/deals"><strong>Deals</strong></Nav.Link>
    </Nav>

		 <Nav className="ml-3">

		 <Nav.Link as={Link} to="/myaccount" >
			    My Account
			  </Nav.Link>

			  {isLoggedIn ? (
			    <Nav.Link as={Link} to="/" onClick={handleLogout}>
			      Logout
			    </Nav.Link>
			  ) : (
			    <Nav.Link as={Link} to="/login">Login</Nav.Link>
			  )}

			  
			</Nav>

 	</Navbar.Collapse>

 </Container>

</Navbar>
);

};

export default ShopeeNavbar;
