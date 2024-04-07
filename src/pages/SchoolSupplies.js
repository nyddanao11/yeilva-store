import React, { useState } from 'react';
import { Container, Row, Col, Nav,  Navbar} from 'react-bootstrap';
import BallpenMarker from '../components/SchoolSupplies/BallpenMarker';
import BondPaper from'../components/SchoolSupplies/BondPaper';
import PencilCase from '../components/SchoolSupplies/PencilCase';
import Paper from'../components/SchoolSupplies/Paper';
import PencilEraser from'../components/SchoolSupplies/PencilEraser';
import NoteBook from'../components/SchoolSupplies/NoteBook';
import {ballpen}from'../components/SchoolSupplies/BallpenMarkerData';
import {bondpaper} from'../components/SchoolSupplies/BondPaperData';
import {notebook} from'../components/SchoolSupplies/NotebookData';
import { useMediaQuery } from 'react-responsive';
import { FaBars } from 'react-icons/fa'; // Import your custom icon
import FeaturedProduct from'../components/FeaturedProduct';
import Footer from '../components/Footer';


const SchoolSupplies = ({ addToCart, cartItems, isProductSoldOut  }) => {
  const [activeNavItem, setActiveNavItem] = useState('ballpenmarker');
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


  const schoolsupplies = [
    { id: 'ballpenmarker', title: 'Ballpen & Marker', component: <BallpenMarker addToCart={addToCart} cartItems={cartItems} product={ballpen} isProdcutSoldOut={isProductSoldOut}   currentPage={currentPage} setCurrentPage={setCurrentPage}/> },
     { id: 'bondpaper', title: 'Bondpaper', component: <BondPaper addToCart={addToCart} cartItems={cartItems}  product={bondpaper} isProdcutSoldOut={isProductSoldOut}   currentPage={currentPage} setCurrentPage={setCurrentPage}/> },
     { id: 'notebook', title: 'Notebook', component: <NoteBook addToCart={addToCart} cartItems={cartItems} product={notebook} isProdcutSoldOut={isProductSoldOut}   currentPage={currentPage} setCurrentPage={setCurrentPage}/> },
     { id: 'pencilcase', title: 'Pencilcase', component: <PencilCase addToCart={addToCart} cartItems={cartItems} /> },
     { id: 'paper', title: 'Paper & Envelope', component: <Paper addToCart={addToCart} cartItems={cartItems} /> },
     { id: 'pencileraser', title: 'Pencil & eraser', component: <PencilEraser addToCart={addToCart} cartItems={cartItems} /> }
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
                {schoolsupplies.map((item) => (
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
            {schoolsupplies.find((item) => item.id === activeNavItem)?.component}
          </div>
        </Col>
      </Row>

        <Row style={{marginTop:"40px"}}>
        <div className="line" style={{marginBottom:'30px'}}>
        <h4 className="text">You May also Like</h4>
        </div>
       <FeaturedProduct addToCart={addToCart}/>
      </Row>

     
    </Container>
        {/* Footer Section */}
      <div className="mt-4 " >
     
      <Footer />
    
      </div>
      </>
  );
};

export default SchoolSupplies;
