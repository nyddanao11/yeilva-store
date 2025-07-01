import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import CheckoutForm from '../components/CheckoutForm';
import { Button, Container, Row, Col, Card } from 'react-bootstrap'; // Added Card for sections
import { Link, useNavigate, useLocation } from 'react-router-dom';
import CartItem from './CartItem';
import VoucherForm from './Voucher';
import YouMayLike from '../components/YouMayLike';
import './CheckoutPage.css';
import AlertFreeShipping from '../components/AlertFreeShipping';
import AlertEmptyCart from '../components/AlertEmptyCart';
import { FaShippingFast, FaCheckCircle, FaMoneyBillWave } from 'react-icons/fa'; // Added more icons
import { useCart } from './CartContext'; // Correct path to your context

export default function CheckoutPageBuyAgain({
  cartItems,
  removeFromCart,
  addToCart,
  selectedSize,
  selectedColor,
  fetchUserData,
  setFormattedGrandTotal, // This prop allows updating parent component
  youMayLikeProducts
}) {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [shippingRate, setShippingRate] = useState(0);
  const [voucherDiscount, setVoucherDiscount] = useState(0); // This holds the percentage discount
  const [isFreeShipping, setIsFreeShipping] = useState(false);
  const [showFreeShippingAlert, setShowFreeShippingAlert] = useState(false);
  const [showEmptyCartAlert, setShowEmptyCartAlert] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { itemToReorder } = location.state || {};

  const hasAddedItemToCartRef = useRef(false);

  // Determine the items currently being checked out (either the reordered item or the full cart)
  const currentCheckoutItems = useMemo(() => {
    // For "Buy Again", ensure the itemToReorder is added to a temporary cart-like structure
    if (itemToReorder && !hasAddedItemToCartRef.current) {
        // Important: If buyAgain is meant to only checkout that one item
        // make sure it's the *only* item in currentCheckoutItems.
        // For a more robust solution, you might want a `checkoutMode` state ('cart' | 'buyAgain')
        // and add itemToReorder to the actual cartItems state if it's not already there.
        // For now, we'll assume this component directly processes `itemToReorder`
        // or the `cartItems` based on its presence.
        // Let's ensure if itemToReorder has been used, we don't accidentally fall back to cartItems
        // if cartItems is empty but itemToReorder is present.
        // The previous logic was good for this.
        return [{ ...itemToReorder, quantity: itemToReorder.quantity || 1 }];
    }
    // If not a 'buy again' scenario, or if itemToReorder has been handled, use the regular cartItems
    return cartItems;
  }, [itemToReorder, cartItems]);


  // Calculate total price of items currently being checked out
  const totalItemsPrice = useMemo(() => {
    return currentCheckoutItems.reduce((acc, item) => {
      const itemPrice = parseFloat(item.price) || 0;
      const itemQuantity = item.quantity || 1;
      return acc + (itemPrice * itemQuantity);
    }, 0);
  }, [currentCheckoutItems]);

  // --- Shipping Rate Calculation ---
  useEffect(() => {
    const FREE_SHIPPING_THRESHOLD = 2500; // Example threshold in PHP

    // If free shipping is already active from a voucher, override other calculations
    if (isFreeShipping) {
      setShippingRate(0);
      setShowFreeShippingAlert(true); // Keep alert visible if voucher applied free shipping
      return; // Exit early
    }

    // Check for automatic free shipping based on totalItemsPrice
    if (totalItemsPrice >= FREE_SHIPPING_THRESHOLD) {
      setShippingRate(0);
      setIsFreeShipping(true); // Set state for display
      setShowFreeShippingAlert(true); // Show alert
    } else {
      // Calculate shipping based on weight if not free shipping
      // Ensure each item in currentCheckoutItems has a 'weight' property.
      // Default to 0 if not present to prevent calculation errors.
      const totalWeight = currentCheckoutItems.reduce((total, item) => total + (item.weight || 0), 0);

      let calculatedShippingRate = 0;
      if (totalWeight > 0) {
        // Your custom shipping multiplier logic
        // This formula `(0.145 + 30 / totalWeight)` looks a bit unusual.
        // Ensure it mathematically makes sense for your pricing.
        // For example, as totalWeight increases, `30 / totalWeight` decreases, making the multiplier smaller.
        // This might result in *lower* shipping for heavier items, which is counter-intuitive.
        // Double-check your shipping logic. A more common approach might be:
        // const ratePerKg = 50; // Example rate per kg
        // calculatedShippingRate = totalWeight * ratePerKg;
        // Or tiered rates based on weight.

        // Using your provided formula for now, but be aware of its behavior:
        const newMultiplier = (0.145 + 30 / totalWeight);
        calculatedShippingRate = currentCheckoutItems.reduce((total, item) =>
          total + (item.weight || 0) * newMultiplier, 0);
      }
      setShippingRate(Number(calculatedShippingRate.toFixed(2))); // Round to 2 decimal places and convert back to number
      setIsFreeShipping(false); // Ensure this is false if not meeting free shipping
      setShowFreeShippingAlert(false); // Hide alert if free shipping is removed
    }
  }, [currentCheckoutItems, totalItemsPrice, isFreeShipping]); // Depend on relevant values


  // --- Voucher Handling ---
  // Use the existing handleVoucherValidate for consistency
  const handleVoucherValidate = useCallback((discountPercentage, freeShipping) => {
    setVoucherDiscount(discountPercentage);
    setIsFreeShipping(freeShipping); // Update isFreeShipping based on voucher
    setShowFreeShippingAlert(freeShipping); // Show alert if voucher gives free shipping
  }, []);


  // --- Grand Total Calculation (using useMemo for efficiency) ---
  const grandTotal = useMemo(() => {
    let subtotal = totalItemsPrice;

    // Apply voucher discount
    subtotal -= (subtotal * (voucherDiscount / 100));

    // Apply shipping rate, only if not free shipping
    let finalTotal = subtotal + (isFreeShipping ? 0 : shippingRate);

    return Math.max(0, finalTotal); // Ensure total doesn't go below zero
  }, [totalItemsPrice, voucherDiscount, isFreeShipping, shippingRate]);


  // --- Formatted Grand Total for display and passing to CheckoutForm ---
  const formattedGrandTotal = useMemo(() => {
    return new Intl.NumberFormat('fil-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(grandTotal);
  }, [grandTotal]);


  // --- Update Parent Component's Formatted Grand Total ---
  useEffect(() => {
    if (setFormattedGrandTotal) {
      setFormattedGrandTotal(formattedGrandTotal);
    }
  }, [formattedGrandTotal, setFormattedGrandTotal]);


  // --- Empty Cart Alert Logic ---
  useEffect(() => {
    // Show empty cart alert only if it's *not* a buy-again flow and the cart is empty
    if (!itemToReorder && cartItems.length === 0) {
      setShowEmptyCartAlert(true);
    } else {
      setShowEmptyCartAlert(false);
    }
  }, [itemToReorder, cartItems]); // Depend on itemToReorder and cartItems


  const handleProceedToCheckout = () => {
    if (currentCheckoutItems.length === 0) {
      setShowEmptyCartAlert(true);
      return;
    }
    setShowCheckoutForm(true);
  };

  return (
    <>
      {showFreeShippingAlert && (
        <AlertFreeShipping onClose={() => setShowFreeShippingAlert(false)} />
      )}
      {showEmptyCartAlert && (
        <AlertEmptyCart onClose={() => setShowEmptyCartAlert(false)} />
      )}

      <Container className="checkout-page-container my-4">
        {/* Progress Indicator */}
        <div className="checkout-progress-bar mb-4">
          <div className={`step ${!showCheckoutForm ? 'active' : 'completed'}`}>
            <FaCheckCircle className="step-icon" /> Order Summary
          </div>
          <div className="separator"></div>
          <div className={`step ${showCheckoutForm ? 'active' : ''}`}>
            <FaMoneyBillWave className="step-icon" /> Payment Details
          </div>
        </div>
        {/* End Progress Indicator */}

        {!showCheckoutForm ? (
          // --- STEP 1: ORDER SUMMARY & SHIPPING DETAILS ---
          <Row>
            <Col lg={7} className="mb-4">
              <Card className="shadow-sm">
                <Card.Header className="bg-primary text-white">
                  <h5 className="mb-0">Your Order Summary</h5>
                </Card.Header>
                <Card.Body>
                 {currentCheckoutItems.length === 0 ? (
                 <p className="text-center text-muted">No items selected for checkout. Please go back to cart.</p>
              ) : (
                currentCheckoutItems.map((item) => (
                  <CartItem
                    key={item.id || item.name}
                    item={item}
                    removeFromCart={removeFromCart}
                    addToCart={addToCart}
                    selectedSize={selectedSize}
                    selectedColor={selectedColor}
                  />
                ))
              )}
                </Card.Body>
              </Card>
            </Col>

            <Col lg={5}>
              <Card className="shadow-sm">
                <Card.Header className="bg-info text-white">
                  <h5 className="mb-0">Order Totals & Voucher</h5>
                </Card.Header>
                <Card.Body>
                  <VoucherForm onVoucherValidate={handleVoucherValidate} />
                  <hr className="my-3" />
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted">Items Total:</span>
                    <strong>₱{totalItemsPrice.toFixed(2)}</strong>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted">Shipping Rate:</span>
                    {isFreeShipping ? (
                      <strong className="text-success">₱Free <FaShippingFast /></strong>
                    ) : (
                      <strong>₱{shippingRate.toFixed(2)}</strong>
                    )}
                  </div>
                  {voucherDiscount > 0 && (
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-muted">Voucher Discount:</span>
                      <strong className="text-danger">-₱{voucherDiscount.toFixed(2)}</strong>
                    </div>
                  )}
                  <hr className="my-3" />
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Grand Total:</h5>
                    <h4 className="text-primary mb-0">{formattedGrandTotal}</h4>
                  </div>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between p-3">
                  <Link to="/cart">
                    <Button variant="outline-secondary" className="me-2">
                      Back to Cart
                    </Button>
                  </Link>
                  <Button
                    onClick={handleProceedToCheckout}
                    style={{ backgroundColor: '#E92409', border: 'none' }}
                   
                  >
                    Continue to Shipping & Payment
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        ) : (
          // --- STEP 2: SHIPPING ADDRESS & PAYMENT METHOD ---
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="shadow-sm">
                <Card.Header className="bg-success text-white">
                  <h5 className="mb-0">Shipping & Payment</h5>
                </Card.Header>
                <Card.Body>
                 <CheckoutForm
            cartItems={currentCheckoutItems}
            formattedGrandTotal={formattedGrandTotal}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            fetchUserData={fetchUserData}
          />
                </Card.Body>
                <Card.Footer className="text-end">
                    <Button variant="outline-secondary" onClick={() => setShowCheckoutForm(false)}>
                        Back to Order Summary
                    </Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
      <YouMayLike addToCart={addToCart} youMayLikeProducts={youMayLikeProducts} />
    </>
  );
}