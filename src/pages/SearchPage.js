import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Container, Row, Col, Card, Form, Button, Modal
} from "react-bootstrap";
import YouMayLike from'../components/YouMayLike';

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
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) =>
      selectedCategory === "all"
        ? true
        : product.category === selectedCategory
    )
    .filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .sort((a, b) => {
      if (sortBy === "low-high") return a.price - b.price;
      if (sortBy === "high-low") return b.price - a.price;
      return 0;
    });

  const FilterContent = () => (
    <>
      <h5 className="fw-bold mb-3">Filters</h5>

      {/* Category */}
      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="wellness product">Wellness Products</option>
          <option value="grocery items">Grocery</option>
          <option value="beauty and hygiene">Beauty & Hygiene</option>
          <option value="personal collection">Personal Collection</option>
        </Form.Select>
      </Form.Group>

      {/* Price */}
      <Form.Group className="mb-3">
        <Form.Label>Max Price: ₱{priceRange[1]}</Form.Label>
        <Form.Range
          min={0}
          max={5000}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
        />
      </Form.Group>

      {/* Sort */}
      <Form.Group className="mb-3">
        <Form.Label>Sort by</Form.Label>
        <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="default">Default</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </Form.Select>
      </Form.Group>

      <Button className="w-100 mt-3" onClick={() => setShowMobileFilters(false)}>
        Apply Filters
      </Button>
    </>
  );

  return (
  <>
    <Container fluid className="py-4">
      <Row>

        {/* Desktop Sidebar */}
        <Col md={3} className="d-none d-md-block">
          <Card
            className="p-3 shadow-sm"
            style={{ position: "sticky", top: "80px", zIndex: 1 }}
          >
            <FilterContent />
          </Card>
        </Col>

        {/* Results */}
        <Col xs={12} md={9}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold">Search Results</h4>

            {/* Mobile filter button */}
            <Button
              className="d-md-none"
              variant="outline-primary"
              onClick={() => setShowMobileFilters(true)}
            >
              Filters
            </Button>
          </div>

          {/* Product Grid */}
          <Row>
            {filteredProducts.map((product) => (
              <Col xs={6} sm={4} md={4} lg={3} key={product.id} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={product.url}
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title className="small fw-bold">{product.name}</Card.Title>
                    <Card.Text>₱{product.price}</Card.Text>
                    <Button
                      size="sm"
                      className="w-100"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Mobile Filter Drawer */}
      <Modal
        show={showMobileFilters}
        onHide={() => setShowMobileFilters(false)}
        fullscreen="sm-down"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Filters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FilterContent />
        </Modal.Body>
      </Modal>
    </Container>
     <YouMayLike addToCart={addToCart} youMayLikeProducts={youMayLikeProducts}/>
    </>
  );
}
