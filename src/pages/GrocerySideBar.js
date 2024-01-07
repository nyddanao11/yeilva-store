// GrocerySidebar.js

import React from 'react';
import Nav from 'react-bootstrap/Nav';

const GrocerySidebar = ({ menuItems, handleMenuItemClick, activeNavItem }) => {
  return (
    <div className="d-flex flex-column align-items-center p-3">
      <Nav className="flex-column">
        {menuItems.map((item) => (
          <Nav.Item key={item.id}>
            <Nav.Link
              className={`py-2  ${activeNavItem === item.id ? 'active' : ''}`}
              onClick={() => handleMenuItemClick(item.id)}
              style={{
                background: activeNavItem === item.id ? '#0D6EFD' : '#EFEFEF',
                color: activeNavItem === item.id ? 'white' : 'black',
                borderRadius: '2px',
                margin: '5px',
              }}
            >
              {item.title}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
};

export default GrocerySidebar;
