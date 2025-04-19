import {wellnessProductData} from './wellnessProductData';
import {beautyProductsData} from './BeautyProductsData';
import {avonproductsData} from './AvonProductsData';
import {pcproductsData} from './pcproductsData';

export const cans = [
   { id: 11,
     name:'Barley grass juice',
    image:`${process.env.PUBLIC_URL}/images/barley.jpg`, 
    count: wellnessProductData.length,
    category: 'Wellness Products', 
    link:'/products',
   },
    { id: 55, 
   name:'gluta',
     image:`${process.env.PUBLIC_URL}/beauty/gluta.png`,
       count: beautyProductsData.length,
      category: 'Beauty & Hygiene',
      link:'/beautyproducts',
   },
   
    { id: 33, 
    name:'gluta',
     image:`${process.env.PUBLIC_URL}/imgpc/gluta.png`,
       count: pcproductsData.length,
      category: 'Personal Collection',
      link:'/pcproducts',
   },
    { id: 44, 
    name:'cologne',
      image:`${process.env.PUBLIC_URL}/imgavon/colon06.jpg`,
      count: avonproductsData.length,
      category: 'Avon Collection',
      link:'/avonproducts',
   }, 
 
  
    // Add more canned goods as needed
  ];