import React,{useState, useEffect} from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import ProductCard from './ImageCircleCard';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'; // Import icons
import { useMediaQuery } from 'react-responsive';
import axios from'axios';
import {Link, useNavigate} from'react-router-dom';
import './FeaturedProductSlides.css';

const CircleCard = ({ addToCart, handleItemClickCategory }) => {
  const navigate = useNavigate();
 
 const [allCategory, setAllCategory] = useState([]);

 async function fetchProductCategories() {
  try {
    const response = await axios.get('http://localhost:3001/api/productscategory'); // Fetch all products
    const products = Array.isArray(response.data) ? response.data.map(formatProductData) : [];

    if (products.length === 0) {
      console.warn('No products found');
      setAllCategory([]); // Set an empty array if no products
      return;
    }

    const aggregatedData = aggregateCategoryData(products); // Aggregate category data
    setAllCategory(aggregatedData);
    console.log('Aggregated category data:', aggregatedData);
  } catch (error) {
    console.error('Error fetching products:', error);
    setAllCategory([]); // Set empty data in case of an error
  }
}


  function formatProductData(product) {
    return {
      id: product.id || '',
      name: product.name || 'Unknown',
      category: product.category || 'Misc',
      price: parseFloat(product.price) || 0,
      weight: parseFloat(product.weight) || 0,
      stock: parseFloat(product.stock) || 0,
      url: product.url?.replace(/\$\{process\.env\.PUBLIC_URL\}/g, process.env.PUBLIC_URL) || '',
      page: parseInt(product.page, 10) || 1,
      thumbnails: Array.isArray(product.thumbnails)
        ? product.thumbnails.map((thumbnail) =>
            thumbnail.replace(/\$\{process\.env\.PUBLIC_URL\}/g, process.env.PUBLIC_URL)
          )
        : [],
      description: product.description || '',
      place: product.place || '',
      sizecolor: product.sizecolor || '',
      productDetails: product.product_details || '',
      shipping: product.shipping || '',
    };
  }

  function aggregateCategoryData(products) {
    const categoryMap = {};

    products.forEach((product) => {
      if (!categoryMap[product.category]) {
        categoryMap[product.category] = {
          categoryName: product.category,
          productLength: 0,
          productImage: product.url, // First image URL for this category
        };
      }

      categoryMap[product.category].productLength++;
    });

    return Object.values(categoryMap); // Convert object to array
  }

  useEffect(() => {
    fetchProductCategories();
  }, []);

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1200px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1199px)' });
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });


 // Custom arrow components with SVG icons
  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div 
        className={`${className} custom-arrow prev-arrow`} // Add custom classes
        style={{ ...style }}
        onClick={onClick}
      >
        <IoIosArrowBack size={24} color="black" /> {/* Use the imported icon */}
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow next-arrow`} // Add custom classes
        style={{ ...style }}
        onClick={onClick}
      >
        <IoIosArrowForward size={24} color="black" /> {/* Use the imported icon */}
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isLargeScreen ? 5 : isMediumScreen ? 4 : isSmallScreen ? 2 : 1,
    slidesToScroll: isLargeScreen ? 5 : isMediumScreen ? 4 : isSmallScreen ? 2 : 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    variableWidth: false,
  };


if (allCategory.length === 0) {
    return <div>No Categories Available</div>;
  }

  return (
  <Slider {...settings}>
    {allCategory.map((product) => (
      <div key={product.id}>
        <ProductCard
          image={product.productImage}
          category={product.categoryName}
          count={product.productLength}
          onClick={() => {
            handleItemClickCategory(product.categoryName); // Call your handler
            navigate('/productsdata'); // Navigate to productsdata page
          }}
        />
      </div>
    ))}
  </Slider>
);

};

export default CircleCard;
