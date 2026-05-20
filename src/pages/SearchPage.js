import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Modal, Badge } from "react-bootstrap";
import { FaDownload, FaSlidersH, FaCheckCircle, FaStar, FaRegStar } from "react-icons/fa";
import YouMayLike from '../components/YouMayLike';
import useFetchReviews from '../components/useFetchReviews';

// Removed static item props (price, name, stock, etc.) from top-level page arguments
export default function SearchPage({ searchProducts, addToCart, youMayLikeProducts }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState("default");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");
    if (query) setSearchQuery(query);
  }, [location]);

  const filteredProducts = searchProducts
    .filter((product) => {
      const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === "low-high") return a.price - b.price;
      if (sortBy === "high-low") return b.price - a.price;
      return 0;
    });

  const FilterContent = () => (
    <div className="p-1">
      <div className="d-none d-md-flex align-items-center justify-content-between mb-4">
        <h5 className="fw-extrabold mb-0 text-dark">Refine Vault</h5>
        <Badge bg="secondary" className="rounded-pill">Digital Delivery</Badge>
      </div>

      {/* Category Selection */}
      <Form.Group className="mb-4">
        <Form.Label className="small fw-bold text-muted text-uppercase mb-2">Category</Form.Label>
        <Form.Select
          className="border-light-subtle shadow-sm p-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Disciplines</option>
          <option value="content creation">Content Creation</option>
          <option value="online business">Online Business</option>
          <option value="artificial intelligence">Artificial Intelligence</option>
          <option value="productivity guide">Productivity Guides</option>
          <option value="health and fitness">Health & Fitness</option>
          <option value="wellness">Wellness</option>
          <option value="parenting">Parenting</option>
          <option value="finance">Finance</option>
          <option value="cybersecurity">Cybersecurity</option>
        </Form.Select>
      </Form.Group>

      {/* Price Selection */}
      <Form.Group className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Form.Label className="small fw-bold text-muted text-uppercase mb-0">Max Budget</Form.Label>
          <span className="fw-extrabold text-primary">₱{priceRange[1].toLocaleString()}</span>
        </div>
        <Form.Range
          min={0}
          max={5000}
          step={50}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
        />
      </Form.Group>

      {/* Sort Selection */}
      <Form.Group className="mb-4">
        <Form.Label className="small fw-bold text-muted text-uppercase mb-2">Sort Results</Form.Label>
        <Form.Select 
          className="border-light-subtle shadow-sm p-2"
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Trending Relevance</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </Form.Select>
      </Form.Group>

      <Button 
        variant="primary" 
        className="w-100 py-2.5 rounded-3 fw-bold d-md-none shadow-sm mt-2" 
        onClick={() => setShowMobileFilters(false)}
      >
        Apply Active Filters
      </Button>
    </div>
  );

  // Modern star component helper
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      i < rating ? <FaStar key={i} className="text-warning" /> : <FaRegStar key={i} className="text-muted" />
    ));
  };

  // Internal Sub-component for individual cards to handle its hooks correctly safely
  const ProductCardWrapper = ({ product, addToCart }) => {
    // Dynamic review fetching scoped cleanly down to product name definitions
    const { reviewData, loading: reviewLoading } = useFetchReviews(product.name);
    
    // Fallback safe value assignments preventing global crashes
    const currentPrice = product.price || 0;
    const currentDiscount = product.discount || 0;
    const isProductDiscounted = currentDiscount > 0;
    
    const discountedPrice = isProductDiscounted 
      ? (currentPrice * (1 - currentDiscount / 100)).toFixed(2) 
      : currentPrice.toFixed(2);

    const averageRating = reviewData?.length > 0
      ? Math.round(reviewData.reduce((acc, r) => acc + r.rating, 0) / reviewData.length)
      : 0;

    return (
      <Card className="product-card border-0 shadow-sm h-100 overflow-hidden d-flex flex-column" 
            style={{ borderRadius: '15px' }}>
        
        {/* Badges Overlay */}
        <div className="position-absolute top-0 start-0 p-2 d-flex flex-column gap-1" style={{ zIndex: 2 }}>
          {isProductDiscounted && (
            <Badge bg="danger" className="rounded-pill px-2.5 py-1.5 shadow-sm small">
              {currentDiscount}% OFF
            </Badge>
          )}
        </div>

        {/* Image Container with Hover Effect */}
        <div className="card-image-container position-relative overflow-hidden">
          <Link to={`/clicksearchpage/${product.id}`}>
            <Card.Img
              variant="top"
              src={product.url}
              alt={product.name}
              style={{ height: "180px", objectFit: "cover" }}
            />
          </Link>
        </div>

        <Card.Body className="d-flex flex-column p-3 flex-grow-1">
          <small className="text-uppercase text-muted fw-bold mb-1" style={{ fontSize: '10px', letterSpacing: '1px' }}>
            Ebook/Guides
          </small>
          
          <Link to={`/clicksearchpage/${product.id}`} className="text-decoration-none text-dark">
            <Card.Title className="h6 mb-2 text-truncate-2 fw-bold" style={{ height: '2.5rem', lineHeight: '1.25', overflow:'hidden' }}>
              {product.name}
            </Card.Title>
          </Link>

          {/* Social Proof */}
          <div className="d-flex align-items-center mb-3">
            <div className="me-2 d-flex gap-1 text-warning" style={{ fontSize: '0.8rem' }}>
              {reviewLoading ? <span className="text-muted small">...</span> : renderStars(averageRating)}
            </div>
            <span className="text-muted small">({reviewData?.length || 0})</span>
          </div>

          {/* Pricing & CTA Engine Optimizations */}
           <div className="mt-auto d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex ">
              {isProductDiscounted && (
                <span className="text-muted text-decoration-line-through x-small" style={{ fontSize: '0.75rem' }}>
                  ₱{currentPrice.toFixed(2)}
                </span>
              )}
              <span className="fw-extrabold h5 mb-0 text-primary">
                ₱{Number(discountedPrice).toLocaleString(undefined, {minimumFractionDigits: 2})}
              </span>
            </div>
            
            <Button 
            as={Link} 
            to={`/clicksearchpage/${product.id}`}
            variant= "outline-primary"
            className="btn-sm rounded-pill px-3 fw-bold"
           
          >
           View
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  };

  return (
    <>
      <Container fluid className="py-5 px-4 bg-light-subtle">
        <Row className="g-4">

          {/* Desktop Sidebar */}
          <Col md={3} className="d-none d-md-block">
            <Card
              className="border-0 shadow-sm rounded-4 p-3 bg-white"
              style={{ position: "sticky", top: "100px", zIndex: 10 }}
            >
              <FilterContent />
            </Card>
          </Col>

          {/* Results Area */}
          <Col xs={12} md={9}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h4 className="fw-extrabold text-dark mb-1">Available Blueprints</h4>
                <p className="text-muted small mb-0">{filteredProducts.length} expert guides found ready for download</p>
              </div>

              {/* Mobile filter button */}
              <Button
                className="d-md-none rounded-pill px-4 py-2 fw-bold shadow-sm d-flex align-items-center gap-2"
                variant="white"
                style={{ border: "1px solid #dee2e6" }}
                onClick={() => setShowMobileFilters(true)}
              >
                <FaSlidersH size={14} className="text-primary" /> Filter
              </Button>
            </div>

            {/* Product Grid */}
            <Row className="g-3 g-md-4">
              {filteredProducts.map((product) => (
                <Col xs={6} sm={6} md={6} lg={4} key={product.id}>
                  <ProductCardWrapper product={product} addToCart={addToCart} />
                </Col>
              ))}
              
              {filteredProducts.length === 0 && (
                <Col xs={12} className="text-center py-5">
                  <div className="p-5 bg-white rounded-4 shadow-sm max-w-md mx-auto">
                    <p className="text-muted mb-3">No blueprints matching those specific criteria.</p>
                    <Button variant="outline-primary" size="sm" onClick={() => { setSelectedCategory("all"); setPriceRange([0, 5000]); }}>
                      Clear Active Search Parameters
                    </Button>
                  </div>
                </Col>
              )}
            </Row>
          </Col>
        </Row>

        {/* Mobile Filter Drawer Setup */}
        <Modal
          show={showMobileFilters}
          onHide={() => setShowMobileFilters(false)}
          fullscreen="sm-down"
          centered
          className="mobile-filter-modal"
        >
          <Modal.Header closeButton className="border-bottom-0 pb-0">
            <Modal.Title className="fw-extrabold fs-5">Filter Assets</Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-2">
            <FilterContent />
          </Modal.Body>
        </Modal>
      </Container>
      
      <YouMayLike addToCart={addToCart} youMayLikeProducts={youMayLikeProducts}/>
    </>
  );
}