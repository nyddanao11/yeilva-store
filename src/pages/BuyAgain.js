import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import CheckoutForm from '../components/CheckoutForm';
import { Button, Container } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import CartItem from './CartItem';
import VoucherForm from './Voucher';
import YouMayLike from '../components/YouMayLike';
import './CheckoutPage.css';
import AlertFreeShipping from '../components/AlertFreeShipping';
import AlertEmptyCart from '../components/AlertEmptyCart';
import { FaShippingFast } from 'react-icons/fa';

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
      <Container
        className="mb-4 d-flex justify-content-center align-items-center flex-column"
        style={{ maxWidth: "767px" }}
      >
        {!showCheckoutForm ? (
          <div>
            <div className="d-flex justify-content-center align-items-center">
              <h4 className="text-center mb-2" style={{ padding: '10px', marginBottom: '15px' }}>
                Checkout/Shipping Details
              </h4>
            </div>
            <div className="mb-4">
              {currentCheckoutItems.length === 0 ? (
                <p className="text-center">Your cart is empty. Add items to proceed.</p>
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
            </div>
            <div className="checkout_section">
              <div className="checkout_details">
                <div className="voucher">
                  {/* Ensure VoucherForm calls onVoucherValidate */}
                  <VoucherForm onVoucherValidate={handleVoucherValidate} />
                </div>
                <div style={{ paddingLeft: "6px" }}>
                  <p className="items_details">Total Items Price: ₱{totalItemsPrice.toFixed(2)}</p>
                  {isFreeShipping ? (
                    <p style={{ color: "#067d62", fontSize: "14px", fontWeight: "500" }}>
                      <FaShippingFast style={{ color: "#0D6EFD" }} />Shipping Rate: ₱Free
                    </p>
                  ) : (
                    <p style={{ color: "black", fontSize: "14px", fontWeight: "500" }}>Shipping Rate: ₱{shippingRate.toFixed(2)}</p>
                  )}
                  {voucherDiscount > 0 && (
                    <p style={{ color: "#067d62", fontSize: "14px", fontWeight: "500" }}>Voucher Discount: {voucherDiscount}%</p>
                  )}
                </div>
              </div>
              <h4 className="grandtotal"> Grand Total: {formattedGrandTotal}</h4>
              <div className="d-flex">
                <Button onClick={handleProceedToCheckout} style={{ backgroundColor: '#E92409', border: 'none' }}>Continue to Shipping</Button>
                <Link to="/cart">
                  <Button variant="outline-secondary" className="ms-2">
                    Back to Cart
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <CheckoutForm
            cartItems={currentCheckoutItems}
            formattedGrandTotal={formattedGrandTotal}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            fetchUserData={fetchUserData}
          />
        )}
      </Container>
      <YouMayLike addToCart={addToCart} youMayLikeProducts={youMayLikeProducts} />
    </>
  );
}