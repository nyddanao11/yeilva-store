import React, { useState } from 'react';
import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import Mens from '../components/Fashion/Mens';
import MensShoes from'../components/Fashion/MensShoes';
import Womens from '../components/Fashion/Womens';
import WomensShoes from'../components/Fashion/WomensShoes';


const FashionApparel = ({ addToCart, cartItems }) => {
  const [activeNavItem, setActiveNavItem] = useState('mens');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleMenuItemClick = (item) => {
    setActiveNavItem(item);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);

  };

  const fashionItems = [
    { id: 'mens', title: 'Mens', component: <Mens addToCart={addToCart} cartItems={cartItems} /> },
     { id: 'mensshoes', title: 'Mens Shoes', component: <MensShoes addToCart={addToCart} cartItems={cartItems} /> },
     { id: 'womens', title: 'Womens', component: <Womens addToCart={addToCart} cartItems={cartItems} /> },
     { id: 'womensshoes', title: 'Womens Shoes', component: <WomensShoes addToCart={addToCart} cartItems={cartItems} /> },
    ];
   

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col sm={sidebarCollapsed ? 0 : 3} className={` sidebar ${sidebarCollapsed ? 'd-none' : ''}`}>
          <div className="d-flex flex-column align-items-center p-3">
           
            <Nav className="flex-column">
              {fashionItems.map((item) => (
                <Nav.Item key={item.id}>
                  <Nav.Link
                    className={`py-2 ${activeNavItem === item.id ? 'active' : ''}`}
                    onClick={() => handleMenuItemClick(item.id)}
                    style={{color:"white", background:"green", border: "1px solid", 
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
          Toggle Sidebar
        </Button>

        {/* Main Content Area */}
        <Col sm={sidebarCollapsed ? 12 : 9}>
          <Container>
            <Row>
              <Col>
                {fashionItems.find((item) => item.id === activeNavItem).component}
              </Col>
            </Row>
          </Container>
        </Col>

       
      </Row>
    </Container>
  );
};

export default FashionApparel;
