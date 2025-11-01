import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Container, Row, Col, Form, Card, Button, Spinner } from "react-bootstrap";
import useSearchProducts from "../hooks/useSearchProducts";

export default function SearchPage({ addToCart }) {
  const [params, setParams] = useSearchParams();
  const urlQuery = params.get("query") || "";

  const [searchQuery, setSearchQuery] = useState(urlQuery);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState("none");

  const { searchProducts, fetchSearchProducts, searchLoading } = useSearchProducts();

  useEffect(() => {
    if (urlQuery) fetchSearchProducts(urlQuery);
  }, [urlQuery]);

  const handleSearchInput = (value) => {
    setSearchQuery(value);
    setParams({ query: value });
  };

  // Unique categories from results
  const categories = useMemo(() => {
    const set = new Set(searchProducts?.map(p => p.category));
    return ["all", ...Array.from(set)];
  }, [searchProducts]);

  // Filter + sort results
  const filteredProducts = useMemo(() => {
    let products = [...(searchProducts || [])];

    // Category filter
    if (selectedCategory !== "all") {
      products = products.filter(p => p.category === selectedCategory);
    }

    // Price filter
    if (minPrice) products = products.filter(p => p.price >= Number(minPrice));
    if (maxPrice) products = products.filter(p => p.price <= Number(maxPrice));

    // Sorting
    switch (sortOption) {
      case "price-asc":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        products.sort((a, b) => b.price - a.price);
        break;
      case "alpha":
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "new":
        products.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return products;
  }, [searchProducts, selectedCategory, minPrice, maxPrice, sortOption]);

  return (
    <Container className="py-4">

      {/* Search Bar */}
      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => handleSearchInput(e.target.value)}
          style={{ padding: "0.8rem", fontSize: "1.1rem" }}
        />
      </Form>

      <Row>

        {/* ─── Filters Sidebar ───────────────────────────── */}
        <Col md={3} sm={12} className="mb-4">

          <Card className="p-3 shadow-sm" style={{position: "sticky", top: "80px",zIndex: 1}}>
            <h5 className="mb-3">Filters</h5>

            {/* Category */}
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Price */}
            <Form.Group className="mb-3">
              <Form.Label>Price Range</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <Form.Control
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </Form.Group>

            {/* Sort */}
            <Form.Group className="mb-2">
              <Form.Label>Sort</Form.Label>
              <Form.Select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="none">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="alpha">A → Z</option>
                <option value="new">Newest</option>
              </Form.Select>
            </Form.Group>

            <Button
              variant="secondary"
              size="sm"
              className="mt-3"
              onClick={() => {
                setSelectedCategory("all");
                setMinPrice("");
                setMaxPrice("");
                setSortOption("none");
              }}
            >
              Reset Filters
            </Button>
          </Card>
        </Col>

        {/* ─── Results ───────────────────────────── */}
        <Col md={9}>

          <h6 className="mb-3">
            Showing results for: <strong>"{urlQuery}"</strong>
          </h6>

          {searchLoading && (
            <div className="text-center my-5">
              <Spinner animation="border" /> <p>Searching products...</p>
            </div>
          )}

          {!searchLoading && filteredProducts.length === 0 && (
            <p className="text-muted text-center my-5">No products match your filters.</p>
          )}

          <Row>
            {filteredProducts.map((product) => (
              <Col key={product.id} xs={6} sm={4} lg={3} className="mb-4">
                <Card className="shadow-sm h-100">
                 <Link to={`/clicksearchpage/${product.id}`}>
                  <Card.Img
                    src={product.url || "placeholder.jpg"}
                    style={{ height: "160px", objectFit: "cover" }}
                     alt={product.name || "Product image"}
                  />
                  </Link>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title style={{ fontSize: "1rem", fontWeight: "600" }}>
                      {product.name}
                    </Card.Title>
                    <Card.Text><strong>₱{product.price}</strong></Card.Text>
                    <Card.Text
                      className={product.stock === 0 ? "text-danger" : "text-success"}
                      style={{ fontSize: "0.9rem" }}
                    >
                      {product.stock === 0 ? "Out of stock" : "In stock"}
                    </Card.Text>
                    <Button
                      variant="success"
                      className="mt-auto"
                      disabled={product.stock === 0}
                      onClick={() => addToCart(product)}
                    >
                      {product.stock === 0 ? "Unavailable" : "Add to Cart"}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
