import {wellnessProductData} from './wellnessProductData';
import {beautyProductsData} from './BeautyProductsData';
import {avonproductsData} from './AvonProductsData';
import {pcproductsData} from './pcproductsData';
import {earphoneData} from '../components/Electronics/EarphoneData';
import {speakerData} from '../components/Electronics/SpeakerData';

let ElectronicsItems = [...earphoneData, ...speakerData];
export const cans = [
   { id: 11,
     name:'Barley grass juice',
    image:`${process.env.PUBLIC_URL}/images/barley.jpg`, 
    count: wellnessProductData.length,
    category: 'Wellness Products', 
    link:'/products'
   },
    { id: 55, 
   name:'gluta',
     image:`${process.env.PUBLIC_URL}/beauty/gluta.png`,
       count: beautyProductsData.length,
      category: 'Beauty & Hygiene',
      link:'/beautyproducts',
   },
   { id: 22,
   name:'corned beef',
     image:`${process.env.PUBLIC_URL}/groceries/cangoods/cornedbeef1.png`,
       count: 85,
      category: 'Food and Beverages',
      link:'/groceryitemspage',
   },
    { id: 45, 
    name:'nike',
      image:`${process.env.PUBLIC_URL}/fashion/mensshoes/nike01.jpg`,
      count: 25,
      category: ' Fashion & Apparel',
      link:'/fashionapparel',
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
  { id: 45, 
    name:'anker',
      image:`${process.env.PUBLIC_URL}/electronics/anker01.png`,
      count: ElectronicsItems.length,
      category: 'Electronics',
      link:'/consumerelectronics',
   }, 
  
    // Add more canned goods as needed
  ];