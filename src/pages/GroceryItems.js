import React, { useState } from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import VitaminsMedications from '../components/Groceries/VitaminsMedications';
import { FaBars } from 'react-icons/fa'; // Import your custom icon
import Rice from '../components/Groceries/Rice';
import InstantNoodles from '../components/Groceries/InstantNoodles';
import CannedGoods from '../components/Groceries/CanGoods';
import Beverages from '../components/Groceries/Beverages';
import FrozenFoods from '../components/Groceries/FrozenFoods';
import AlcoholicDrinks from '../components/Groceries/AlcoholicDrinks';
import Snacks from '../components/Groceries/Snacks';
import LaundryPersonalCare from '../components/Groceries/LaundryPersonalCare';
import CookingItems from '../components/Groceries/CookingItems';
import { beer } from '../components/Groceries/BeveragesData';
import { alcoholic } from '../components/Groceries/AlcoholicDrinksData';
import { canned } from '../components/Groceries/CanGoodsData';
import { Frozen } from '../components/Groceries/FrozenFoodsData';
import { snacks } from '../components/Groceries/SnacksData';
import { Noodles } from '../components/Groceries/InstantNoodlesData';
import { laundry } from '../components/Groceries/LaundryPersonalCareData';
import { cooking } from '../components/Groceries/CookingItemsData';
import { vitamins } from '../components/Groceries/VitaminsMedicationsData';
import { rice } from '../components/Groceries/RiceData';
import { useMediaQuery } from 'react-responsive';
import FeaturedProduct from'../components/FeaturedProduct';
import Footer from '../components/Footer';

const GroceryItems = ({ addToCart, cartItems, isProductSoldOut }) => {
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
  };

  const menuItems = [
    { id: 'beverages', title: 'Beverages', component: <Beverages addToCart={addToCart} cartItems={cartItems} product={beer} isProductSoldOut={isProductSoldOut}  currentPage={currentPage} setCurrentPage={setCurrentPage}/> },
    { id: 'alcoholicdrinks', title: 'Alcoholic drinks', component: <AlcoholicDrinks addToCart={addToCart} cartItems={cartItems} product={alcoholic} isProductSoldOut={isProductSoldOut}/> },
    { id: 'frozenfoods', title: 'Frozen Foods', component: <FrozenFoods addToCart={addToCart} cartItems={cartItems} product={Frozen} isProductSoldOut={isProductSoldOut}/> },
    { id: 'snacks', title: 'Snacks', component: <Snacks addToCart={addToCart} cartItems={cartItems} product={snacks} isProductSoldOut={isProductSoldOut}  currentPage={currentPage} setCurrentPage={setCurrentPage}/> },
    { id: 'instantnoodles', title: 'Instant Noodles', component: <InstantNoodles addToCart={addToCart} cartItems={cartItems} product={Noodles} isProductSoldOut={isProductSoldOut} currentPage={currentPage} setCurrentPage={setCurrentPage}/> },
    { id: 'cangoods', title: 'Can Goods', component: <CannedGoods addToCart={addToCart} cartItems={cartItems} product={canned} isProductSoldOut={isProductSoldOut} currentPage={currentPage} setCurrentPage={setCurrentPage}/> },
    { id: 'laundrybath', title: 'Laundry&PersonalCare', component: <LaundryPersonalCare addToCart={addToCart} cartItems={cartItems}  product={laundry} isProductSoldOut={isProductSoldOut} currentPage={currentPage} setCurrentPage={setCurrentPage}/> },
    { id: 'cookingitems', title: 'Cooking Items', component: <CookingItems addToCart={addToCart} cartItems={cartItems} product={cooking} isProductSoldOut={isProductSoldOut} currentPage={currentPage} setCurrentPage={setCurrentPage}/> },
    { id: 'vitamins&medications', title: 'Vitamins&Medications', component: <VitaminsMedications addToCart={addToCart} cartItems={cartItems} product={vitamins} isProductSoldOut={isProductSoldOut} currentPage={currentPage} setCurrentPage={setCurrentPage}/> },
    { id: 'rice', title: 'Rice', component: <Rice addToCart={addToCart} cartItems={cartItems} product={rice} isProductSoldOut={isProductSoldOut} /> },
  
  ];

  return (
    <>
    <Container >
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
                {menuItems.map((item) => (
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
            {menuItems.find((item) => item.id === activeNavItem)?.component}
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

export default GroceryItems;
