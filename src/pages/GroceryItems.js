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
import {beer} from'../components/Groceries/BeveragesData';
import {alcoholic} from'../components/Groceries/AlcoholicDrinksData';
import {canned} from'../components/Groceries/CanGoodsData';
import {Frozen} from'../components/Groceries/FrozenFoodsData';
import {snacks} from'../components/Groceries/SnacksData';
import {Noodles} from'../components/Groceries/InstantNoodlesData';
import {laundry} from'../components/Groceries/LaundryPersonalCareData';
import {cooking} from'../components/Groceries/CookingItemsData';
import {vitamins} from'../components/Groceries/VitaminsMedicationsData';
import {rice} from'../components/Groceries/RiceData';




const GroceryItems = ({ addToCart, cartItems, isProductSoldOut }) => {
  const [activeNavItem, setActiveNavItem] = useState('beverages');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);


  const [currentPage, setCurrentPage] = useState(1);
  



useEffect(() => {
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
                    style={{color:"black", background:"#EFEFEF", 
                    borderRadius:"2px", margin:"5px"}}
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
