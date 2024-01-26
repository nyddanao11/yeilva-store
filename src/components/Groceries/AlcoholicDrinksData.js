 export const alcoholic = [
    { id: 1, name: '500ml', price: 55, weight:650, url:`${process.env.PUBLIC_URL}/groceries/alcoholic/redhorse500.jpg`, category: 'Alcoholic', stock:10, 
      thumbnails:
      [`${process.env.PUBLIC_URL}/groceries/alcoholic/redhorse500.jpg`,
       `${process.env.PUBLIC_URL}/groceries/alcoholic/redhorse500.jpg`,
      ],},
    { id: 2, name: '1L', price: 110, weight:1000, url:`${process.env.PUBLIC_URL}/groceries/alcoholic/redhorse1000.jpg`, category: 'Alcoholic', stock:0, 
      thumbnails:
      [`${process.env.PUBLIC_URL}/groceries/alcoholic/redhorse1000.jpg`,
       `${process.env.PUBLIC_URL}/groceries/alcoholic/redhorse1000.jpg`,
      ],},
    
    // Add more canned goods as needed
  ];