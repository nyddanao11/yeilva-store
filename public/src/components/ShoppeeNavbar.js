import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Dropdown, NavDropdown } from 'react-bootstrap';
import { Link, NavLink} from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { fetchUserData } from './userService';
import './ShoppeeNavbar.css';


function ShopeeNavbar({cartItems, isLoggedIn, handleLogout, handleLogin}) {


	 const [userData, setUserData] = useState({
    firstname: '',
   
  });

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




return (
 <Navbar bg="white" variant="light" expand="lg" className="mb-3 shadow-sm">
   <Container>
			 	<Navbar.Brand as={Link} to="/" className="home text-dark" style={{  borderRadius:'5px'}}>
			<FaHome size={24} />
			 </Navbar.Brand>

     <Navbar.Toggle aria-controls="navbar-nav" />
		 <Navbar.Collapse id="navbar-nav"  className="justify-content-lg-between">
		 <Nav className="ml-auto" >

			<NavDropdown title="Product Category" id="basic-nav-dropdown" style={{paddingLeft:'10px', paddingRight:'10px', borderRadius:'5px'}}>
	      
	            <Dropdown.Item as={Link} to="/groceryitemspage" >Food&Beverages/GroceryItems</Dropdown.Item>
	            <Dropdown.Item as={Link} to="/schoolsupplies">School and Office Supplies</Dropdown.Item>
	            <Dropdown.Item as={Link} to="/products">Health & Wellness</Dropdown.Item>
	            <Dropdown.Item as={Link} to="/pcproducts">Personal Collection</Dropdown.Item>
	            <Dropdown.Item as={Link} to="/avonproducts">Avon Collection</Dropdown.Item>
	            <Dropdown.Item as={Link} to="/beautyproducts">Beauty and Personal Care</Dropdown.Item>
	            <Dropdown.Item as={Link} to="/fashionapparel">Fashion and Apparel</Dropdown.Item>
	           <Dropdown.Item as={Link} to="/homekitchen">Home and Kitchen Appliances</Dropdown.Item>
	           <Dropdown.Item as={Link} to="/homeimprovement">Home Improvement and DIY Tools</Dropdown.Item>
	            <Dropdown.Item as={Link} to="/outdoorsports">Outdoor and Sports Equipment</Dropdown.Item> 
	            <Dropdown.Item as={Link} to="/loanform">Loan Form</Dropdown.Item>  
	            
	          {/* Add more category links as needed */}
	      
	      </NavDropdown>
	     

		 <Nav.Link as={NavLink} to="/deals"   style={{ paddingLeft:'10px', paddingRight:'10px', borderRadius:'5px'}}  activeClassName="active"><strong>Deals</strong></Nav.Link>
		 
  

		
		 <Nav.Link as={NavLink} to="/myaccount"   style={{ paddingLeft:'10px', paddingRight:'10px', borderRadius:'5px'}}  activeClassName="active">
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
			    <Nav.Link as={NavLink} to="/" onClick={handleLogout}  style={{paddingLeft:'10px', paddingRight:'10px', borderRadius:'5px'}}  activeClassName="active">
			      Logout
			    </Nav.Link>
			  ) : (
			    <Nav.Link as={NavLink} to="/login"   style={{paddingLeft:'10px', paddingRight:'10px', borderRadius:'5px'}} activeClassName="active">Login</Nav.Link>
			  )}

    </Nav>

 	</Navbar.Collapse>

 </Container>

</Navbar>
);

};

export default ShopeeNavbar;
