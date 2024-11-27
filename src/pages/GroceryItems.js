import React, { useState } from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import VitaminsMedications from '../components/Groceries/VitaminsMedications';
import { FaBars } from 'react-icons/fa'; // Import your custom icon
import Rice from '../components/Groceries/Rice';
import InstantNoodles from '../components/Groceries/InstantNoodles';
import CannedGoods from '../components/Groceries/CanGoods';
import Beverages from '../components/Groceries/Beverages';
import FrozenFoods from '../components/Groceries/FrozenFoods';
import {beer} from '../components/Groceries/BeveragesData';
import {canned} from '../components/Groceries/CanGoodsData';
import {Frozen} from '../components/Groceries/FrozenFoodsData';
import {Noodles} from '../components/Groceries/InstantNoodlesData';
import {rice} from '../components/Groceries/RiceData';
import {vitamins} from '../components/Groceries/VitaminsMedicationsData';
import { useMediaQuery } from 'react-responsive';
import YouMayLike from'../components/YouMayLike';
import { MdAnnouncement } from 'react-icons/md';

export default function GroceryItems ({ addToCart, cartItems, isProductSoldOut }) {
  const [activeNavItem, setActiveNavItem] = useState('beverages');
  const [currentPage, setCurrentPage] = useState(1);
  const [collapsed, setCollapsed] = useState(false);

  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  const handleToggleSidebar = () => {
    if (isSmallScreen) {
      setCollapsed(!collapsed);
    }
  };

  const handleMenuItemClick = (item) => {
    setActiveNavItem(item);
    if (isSmallScreen) {
      setCollapsed(true); // Collapse the navbar after clicking a menu item
    }
  };

  const menuItems = [
    { id: 'beverages', title: 'Beverages', component: <Beverages addToCart={addToCart} cartItems={cartItems} isProductSoldOut={isProductSoldOut} currentPage={currentPage} setCurrentPage={setCurrentPage} collapsed={collapsed}/> },
    { id: 'frozenfoods', title: 'Frozen Foods', component: <FrozenFoods addToCart={addToCart} cartItems={cartItems} isProductSoldOut={isProductSoldOut} collapsed={collapsed}/> },
    { id: 'instantnoodles', title: 'Instant Noodles', component: <InstantNoodles addToCart={addToCart} cartItems={cartItems} isProductSoldOut={isProductSoldOut} currentPage={currentPage} setCurrentPage={setCurrentPage} collapsed={collapsed}/> },
    { id: 'cangoods', title: 'Can Goods', component: <CannedGoods addToCart={addToCart} cartItems={cartItems} isProductSoldOut={isProductSoldOut} currentPage={currentPage} setCurrentPage={setCurrentPage} collapsed={collapsed}/> },
     { id: 'vitamins&medications', title: 'Vitamins&Medications', component: <VitaminsMedications addToCart={addToCart} cartItems={cartItems} isProductSoldOut={isProductSoldOut} currentPage={currentPage} setCurrentPage={setCurrentPage} collapsed={collapsed}/> },
    { id: 'rice', title: 'Rice', component: <Rice addToCart={addToCart} cartItems={cartItems} isProductSoldOut={isProductSoldOut} /> },
  ];

  return (
    <>
      <Container>
        <Row>
          <Col sm={12} md={3}>
            <Navbar
              expand="md"
              bg="light"
              className={`flex-md-column ${isSmallScreen && collapsed ? 'collapsed' : ''}`}
              style={{
                transition: 'margin-left 0.3s ease',
              }}
            >
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                onClick={handleToggleSidebar}
              >
                {/* Custom collapse icon */}
                <FaBars /> <span className="category">Category</span>
              </Navbar.Toggle>

              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="flex-md-column">
                  {menuItems.map((item) => (
                    <Nav.Link
                      key={item.id}
                      onClick={() => handleMenuItemClick(item.id)}
                      className={`py-2 ${activeNavItem === item.id ? 'active' : ''}`}
                      style={{
                        background: activeNavItem === item.id ? '#CFE2FF' : '#EFEFEF',
                        color: activeNavItem === item.id ? 'white' : 'black',
                        borderRadius: '2px',
                        margin: '5px',
                      }}
                    >
                      {item.title}
                    </Nav.Link>
                  ))}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>

          <Col sm={12} md={9}>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '15px', color: 'red', marginTop: '15px' }}>
              <MdAnnouncement style={{ marginRight: '5px' }} />
              <p style={{ margin: 0 }}>Not Available outside Danao City</p>
            </div>
            <div className="d-flex flex-column align-items-center p-3">
              {menuItems.find((item) => item.id === activeNavItem)?.component}
            </div>
          </Col>
        </Row>
      </Container>
      <YouMayLike addToCart={addToCart} />
    </>
  );
};

