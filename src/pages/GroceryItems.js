import React, { useState } from 'react';
import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import Fruits from '../components/Groceries/Fruits';
import Rice from '../components/Groceries/Rice';
import Vegetables from '../components/Groceries/Vegetables';
import InstantNoodles from '../components/Groceries/InstantNoodles';
import CannedGoods from '../components/Groceries/CanGoods';
import Beverages from '../components/Groceries/Beverages';
import FrozenFoods from '../components/Groceries/FrozenFoods';
import AlcholicDrinks from '../components/Groceries/AlcholicDrinks';
import Snacks from'../components/Groceries/Snacks';


const GroceryItems = ({ addToCart, cartItems }) => {
  const [activeNavItem, setActiveNavItem] = useState('beverages');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleMenuItemClick = (item) => {
    setActiveNavItem(item);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const menuItems = [
    { id: 'beverages', title: 'Beverages', component: <Beverages addToCart={addToCart} cartItems={cartItems} /> },
    { id: 'alcholicdrinks', title: 'Alcoholic drinks', component: <AlcholicDrinks addToCart={addToCart} cartItems={cartItems} /> },
    { id: 'frozenfoods', title: 'Frozen Foods', component: <FrozenFoods addToCart={addToCart} cartItems={cartItems} /> },
    { id: 'snacks', title: 'Snacks', component: <Snacks addToCart={addToCart} cartItems={cartItems} /> },
    { id: 'fruits', title: 'Fruits', component: <Fruits addToCart={addToCart} cartItems={cartItems} /> },
    { id: 'rice', title: 'Rice', component: <Rice addToCart={addToCart} cartItems={cartItems} /> },
    { id: 'vegetables', title: 'Vegetables', component: <Vegetables addToCart={addToCart} cartItems={cartItems} /> },
    { id: 'instantnoodles', title: 'Instant Noodles', component: <InstantNoodles addToCart={addToCart} cartItems={cartItems} /> },
    { id: 'cangoods', title: 'Can Goods', component: <CannedGoods addToCart={addToCart} cartItems={cartItems} /> },
  ];

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col sm={sidebarCollapsed ? 0 : 3} className={`bg-light sidebar ${sidebarCollapsed ? 'd-none' : ''}`}>
          <div className="d-flex flex-column align-items-center p-3">
            <h2 className="mb-4 text-center"  style={{color:"green", border:"1px solid green", borderRadius:"5px", maxWidth:"300px", padding:"6px"}}>Category</h2>
            <Nav className="flex-column">
              {menuItems.map((item) => (
                <Nav.Item key={item.id}>
                  <Nav.Link
                    className={`py-2 ${activeNavItem === item.id ? 'active' : ''}`}
                    onClick={() => handleMenuItemClick(item.id)}
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
          Toggle Sidebar
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
