
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap'; // Import Breadcrumb from react-bootstrap

const BreadCrumbDeals = ({ productId, allDealsProduct }) => {
  const [clickedItems, setClickedItems] = useState([]);

  const selectedProduct = allDealsProduct.find((item) => item.id === productId);

  const handleItemClick = (item) => {
    console.log('Clicked item:', item);
    // Adding the clicked item to the state
    setClickedItems([...clickedItems, item]);
  };

 return (
    <Breadcrumb className="mb-4" style={{ fontSize: "0.9rem" }}>
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Home</Breadcrumb.Item>
         <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/alldealsproduct' }}>Deals</Breadcrumb.Item>

      {clickedItems.map((item, index) => (
        <Breadcrumb.Item key={index} onClick={() => handleItemClick(item)}>{item.name}</Breadcrumb.Item>
      ))}
      {selectedProduct && (
        <Breadcrumb.Item>{selectedProduct.name}</Breadcrumb.Item>
      )}
    </Breadcrumb>
    );
};

export default BreadCrumbDeals;


// import React from 'react';
// import { Breadcrumb } from 'react-bootstrap';
// import { Link, useLocation } from 'react-router-dom';

// const BreadCrumbDeals = ({ productId, allDealsProduct }) => {
//   const location = useLocation(); // Hook to get current location information

//   // Find the selected product based on productId
//   const selectedProduct = allDealsProduct.find((item) => item.id === productId);

//   // If the product isn't found, we can't build a meaningful breadcrumb
//   if (!selectedProduct) {
//     return null; // Or render a fallback, like just "Home"
//   }

//   // Determine the category path.
//   // Assuming selectedProduct.category is a single string like "Electronics", "Clothing", etc.
//   // For a better UX, category links should point to a page that filters by that category.
//   const categoryPath = `/productsdata?category=${encodeURIComponent(selectedProduct.category)}`;

//   return (
//     <Breadcrumb className="mb-4" style={{ fontSize: "0.9rem" }}>
//       {/* Home Link */}
//       <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }} active={location.pathname === '/'}>
//         Home
//       </Breadcrumb.Item>

//       {/* Category Link */}
//       {selectedProduct.category && (
//         <Breadcrumb.Item linkAs={Link} linkProps={{ to: categoryPath }} active={false}> {/* Not active if it's an intermediate step */}
//           {selectedProduct.category}
//         </Breadcrumb.Item>
//       )}

//       {/* Product Name (Always the last, active item) */}
//       <Breadcrumb.Item active>
//         {selectedProduct.name}
//       </Breadcrumb.Item>
//     </Breadcrumb>
//   );
// };

// export default BreadCrumbDeals;