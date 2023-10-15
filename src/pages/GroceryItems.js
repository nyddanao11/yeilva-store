
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import VitaminsMedications from '../components/Groceries/VitaminsMedications';
import Rice from '../components/Groceries/Rice';
import InstantNoodles from '../components/Groceries/InstantNoodles';
import CannedGoods from '../components/Groceries/CanGoods';
import Beverages from '../components/Groceries/Beverages';
import FrozenFoods from '../components/Groceries/FrozenFoods';
import AlcoholicDrinks from '../components/Groceries/AlcoholicDrinks';
import Snacks from'../components/Groceries/Snacks';
import LaundryPersonalCare from'../components/Groceries/LaundryPersonalCare';
import CookingItems from'../components/Groceries/CookingItems';
import './GroceryItems.css';



const GroceryItems = ({ addToCart, cartItems }) => {
  const [activeNavItem, setActiveNavItem] = useState('beverages');
  const [sidebarCollapsed, setSidebarCollapsed] = useState('false');


useEffect(() => {
  const initialScreenWidth = window.innerWidth;
  console.log('Screen width:', initialScreenWidth);

  // Set the sidebar to collapse when the initial width is less than or equal to 768px
  setSidebarCollapsed(initialScreenWidth <= 768);

  const handleResize = () => {
    const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
    setSidebarCollapsed(isSmallScreen);
  };

  // Initial setup
  handleResize();

  // Listen for changes in viewport dimensions
  window.addEventListener('resize', handleResize);

  // Remove the event listener when the component unmounts
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);




  const handleMenuItemClick = (item) => {
    setActiveNavItem(item);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const menuItems = [
    { id: 'beverages', title: 'Beverages', component: <Beverages addToCart={addToCart} cartItems={cartItems} /> },
    { id: 'alcholicdrinks', title: 'Alcoholic drinks', component: <AlcoholicDrinks addToCart={addToCart} cartItems={cartItems} /> },
    { id: 'frozenfoods', title: 'Frozen Foods', component: <FrozenFoods addToCart={addToCart} cartItems={cartItems} /> },
    { id: 'snacks', title: 'Snacks', component: <Snacks addToCart={addToCart} cartItems={cartItems} /> },
    { id: 'instantnoodles', title: 'Instant Noodles', component: <InstantNoodles addToCart={addToCart} cartItems={cartItems} /> },
    { id: 'cangoods', title: 'Can Goods', component: <CannedGoods addToCart={addToCart} cartItems={cartItems} /> },
    { id: 'laundrybath', title: 'Laundry&PersonalCare', component: <LaundryPersonalCare addToCart={addToCart} cartItems={cartItems} /> },
    { id: 'cookingitems', title: 'Cooking Items', component: <CookingItems addToCart={addToCart} cartItems={cartItems} /> },
    { id: 'vitamins&medications', title: 'Vitamins&Medications', component: <VitaminsMedications addToCart={addToCart} cartItems={cartItems} /> },
    { id: 'rice', title: 'Rice', component: <Rice addToCart={addToCart} cartItems={cartItems} /> },
  
  ];

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col sm={sidebarCollapsed ? 0 : 3} className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="d-flex flex-column align-items-center p-3">
           
            <Nav className="flex-column">
              {menuItems.map((item) => (
                <Nav.Item key={item.id}>
                  <Nav.Link
                    className={`py-2 ${activeNavItem === item.id ? 'active' : ''}`}
                    onClick={() => handleMenuItemClick(item.id)}
                    style={{color:"white", background:"green", border: "1px solid ", 
                    borderRadius:"2px", margin:"5px", maxWidth:"300px"}}
                  >
                    {item.title}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </div>
        </Col>
        
        
      {/* Toggle Sidebar Button (Always Visible) */}
        <Button
          className={`toggle-sidebar-btn d-sm-none ${sidebarCollapsed ? 'collapsed' : ''}`}
          variant="light"
          onClick={toggleSidebar}
        >
          Toggle Category
        </Button>
        

        {/* Main Content Area */}
         <Col sm={sidebarCollapsed ? 12 : 9}>
          <Container>
            <Row>
              <Col>
                {menuItems.find((item) => item.id === activeNavItem).component}
              </Col>
            </Row>
          </Container>
        </Col>
     
       
      </Row>
    </Container>
  );
};

export default GroceryItems;
