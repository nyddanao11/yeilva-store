import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import Slider from 'react-slick';
import ImageAllDeals from '../components/ImageAllDeals';
import YouMayLike from '../components/YouMayLike';
import './AllDealsProduct.css';

const ProductCard = ({ product, addToCart }) => {
  if (!product?.url || !product?.name || !product?.price || !product?.id) {
    return <Col md={2} xs={6} lg={2}><div>Product data missing.</div></Col>;
  }

  return (
    <div className="product-card px-2">
      <ImageAllDeals
        url={product.url}
        name={product.name}
        price={product.price}
        id={product.id}
        stock={product.stock}
        discount={product.discount}
        addToCart={addToCart}
      />
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination d-flex justify-content-center align-items-center mt-2">
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        <BsChevronLeft />
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={currentPage === page ? 'active-page' : ''}
        >
          {page}
        </button>
      ))}

      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <BsChevronRight />
      </button>
    </div>
  );
};

export default function AllDealsProduct({ addToCart, currentPage, setCurrentPage, allDealsProduct }) {
  const [selectedCategory, setSelectedCategory] = useState('All Deals');

  const formattedCategory = (cat) =>
    cat
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  const categoryLabels = [
    'All Deals',
    ...new Set(allDealsProduct.map((item) => formattedCategory(item.category))),
  ];

  const totalPages = allDealsProduct.length > 0
    ? Math.max(...allDealsProduct.map((item) => item.page))
    : 1;

  const filteredProducts = allDealsProduct.filter((item) => {
    const matchCategory = selectedCategory === 'All Deals' ||
      formattedCategory(item.category) === selectedCategory;
    return item.page === currentPage && matchCategory;
  });

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  return (
    <Container>
      <div className="category-buttons-wrapper mb-3 mt-3 d-flex overflow-auto">
        {categoryLabels.map((category, index) => (
          <Button
            key={index}
            variant={selectedCategory === category ? 'dark' : 'outline-secondary'}
            className="me-2"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <Slider {...sliderSettings}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </Slider>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />

      <YouMayLike addToCart={addToCart} />
    </Container>
  );
}