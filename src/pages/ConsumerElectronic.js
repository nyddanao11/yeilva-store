import React, { useState } from 'react';
import { Container, Row, Col, Nav,  Navbar} from 'react-bootstrap';
import Earphone from '../components/Electronics/Earphone';
import Speaker from '../components/Electronics/Speaker';
import { useMediaQuery } from 'react-responsive';
import { FaBars } from 'react-icons/fa'; // Import your custom icon
import YouMayLike from'../components/YouMayLike';

const ConsumerElectronic = ({ addToCart, cartItems, isProductSoldOut  }) => {
  const [activeNavItem, setActiveNavItem] = useState('earphones');
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


  const electronic = [
    { id: 'earphones', title: 'Headphones & Earphones', component: <Earphone addToCart={addToCart} cartItems={cartItems} product={Earphone} isProdcutSoldOut={isProductSoldOut}   currentPage={currentPage} setCurrentPage={setCurrentPage}/> },
    { id: 'chargers', title: 'Chargers & cables', component: <Earphone addToCart={addToCart} cartItems={cartItems} product={Earphone} isProdcutSoldOut={isProductSoldOut}   currentPage={currentPage} setCurrentPage={setCurrentPage}/> },
    { id: 'speakers', title: 'Speakers', component: <Speaker addToCart={addToCart} cartItems={cartItems} product={Speaker} isProdcutSoldOut={isProductSoldOut}   currentPage={currentPage} setCurrentPage={setCurrentPage}/> },
  
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
                {electronic.map((item) => (
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
            {electronic.find((item) => item.id === activeNavItem)?.component}
          </div>
        </Col>
      </Row>
 </Container>
        <YouMayLike addToCart={addToCart}/>
    </>
  );
};

export default ConsumerElectronic ;
