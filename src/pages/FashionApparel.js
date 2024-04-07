import React, { useState } from 'react';
import { Container, Row, Col, Nav,  Navbar } from 'react-bootstrap';
import Mens from '../components/Fashion/Mens';
import MensShoes from'../components/Fashion/MensShoes';
import Womens from '../components/Fashion/Womens';
import WomensShoes from'../components/Fashion/WomensShoes';
import {womens} from '../components/Fashion/womensData';
import {mens} from '../components/Fashion/MensData';
import {mensshoes} from '../components/Fashion/MensShoesData';
import {womensshoes} from '../components/Fashion/WomensShoesData';
import { useMediaQuery } from 'react-responsive';
import { FaBars } from 'react-icons/fa'; // Import your custom icon
import Footer from '../components/Footer';


const FashionApparel = ({ addToCart, cartItems, isProductSoldOut }) => {
  const [activeNavItem, setActiveNavItem] = useState('mens');
 const [collapsed, setCollapsed] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  const handleToggleSidebar = () => {
    if (isSmallScreen) {
      setCollapsed(!collapsed);
    }
  };

  const handleMenuItemClick = (item) => {
    setActiveNavItem(item);
  };

  const fashionItems = [
    { id: 'mens', title: 'Mens', component: <Mens addToCart={addToCart} cartItems={cartItems} product={mens} isProductSoldOut={isProductSoldOut}  currentPage={currentPage} setCurrentPage={setCurrentPage}/> },
     { id: 'mensshoes', title: 'Mens Shoes', component: <MensShoes addToCart={addToCart} cartItems={cartItems} product={mensshoes} isProductSoldOut={isProductSoldOut}  currentPage={currentPage} setCurrentPage={setCurrentPage}/> },
     { id: 'women', title: 'Womens', component: <Womens addToCart={addToCart} cartItems={cartItems} product={womens} isProductSoldOut={isProductSoldOut}  currentPage={currentPage} setCurrentPage={setCurrentPage}/> },
     { id: 'womensshoes', title: 'Womens Shoes', component: <WomensShoes addToCart={addToCart} cartItems={cartItems}  product={womensshoes} isProductSoldOut={isProductSoldOut}  currentPage={currentPage} setCurrentPage={setCurrentPage} /> },
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
              <FaBars /> <span className="category">category</span>
            </Navbar.Toggle>

            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="flex-md-column">
                {fashionItems.map((item) => (
                  <Nav.Link
                    key={item.id}
                    onClick={() => handleMenuItemClick(item.id)}
                    className={`py-2  ${activeNavItem === item.id ? 'active' : ''}`}
                    style={{
                      background: activeNavItem === item.id ? '#0D6EFD' : '#EFEFEF',
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
          <div className="d-flex flex-column align-items-center p-3">
            {fashionItems.find((item) => item.id === activeNavItem)?.component}
          </div>
        </Col>
      </Row>
    </Container>
        {/* Footer Section */}
      <div className="mt-4 " >
     
      <Footer />
    
      </div>
      </>
  );
};

export default FashionApparel;
