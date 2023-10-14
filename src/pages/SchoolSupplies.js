import React, { useState } from 'react';
import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import BallpenMarker from '../components/SchoolSupplies/BallpenMarker';
import BondPaper from'../components/SchoolSupplies/BondPaper';
import PencilCase from '../components/SchoolSupplies/PencilCase';
import Paper from'../components/SchoolSupplies/Paper';
import PencilEraser from'../components/SchoolSupplies/PencilEraser';
import NoteBook from'../components/SchoolSupplies/NoteBook';


const SchoolSupplies = ({ addToCart, cartItems }) => {
  const [activeNavItem, setActiveNavItem] = useState('ballpenmarker');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleMenuItemClick = (item) => {
    setActiveNavItem(item);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);

  };

  const schoolsupplies = [
    { id: 'ballpenmarker', title: 'Ballpen & Marker', component: <BallpenMarker addToCart={addToCart} cartItems={cartItems} /> },
     { id: 'bondpaper', title: 'Bondpaper', component: <BondPaper addToCart={addToCart} cartItems={cartItems} /> },
     { id: 'notebook', title: 'Notebook', component: <NoteBook addToCart={addToCart} cartItems={cartItems} /> },
     { id: 'pencilcase', title: 'Pencilcase', component: <PencilCase addToCart={addToCart} cartItems={cartItems} /> },
     { id: 'paper', title: 'Paper & Envelope', component: <Paper addToCart={addToCart} cartItems={cartItems} /> },
     { id: 'pencileraser', title: 'Pencil & eraser', component: <PencilEraser addToCart={addToCart} cartItems={cartItems} /> }
    ];
   

 return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col sm={sidebarCollapsed ? 0 : 3} className={` sidebar ${sidebarCollapsed ? 'd-none' : ''}`}>
          <div className="d-flex flex-column align-items-center p-3">
           
            <Nav className="flex-column">
              {schoolsupplies.map((item) => (
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
                {schoolsupplies.find((item) => item.id === activeNavItem).component}
              </Col>
            </Row>
          </Container>
        </Col>

      
      </Row>
    </Container>
  );
};

export default SchoolSupplies;
