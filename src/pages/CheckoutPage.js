import React, { useState, useEffect } from 'react';
import CheckoutForm from '../components/CheckoutForm';
import { Button, Container } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Keep useLocation
import CartItem from './CartItem'; // Make sure CartItem can display selected items
import VoucherForm from './Voucher';
import YouMayLike from '../components/YouMayLike';
import './CheckoutPage.css';
import AlertFreeShipping from '../components/AlertFreeShipping';
import AlertEmptyCart from '../components/AlertEmptyCart';
import { FaShippingFast } from 'react-icons/fa';

export default function CheckoutPage({
  // cartItems, // You will now get the relevant items from `location.state`
  removeFromCart, // Keep these if you want to allow removal from checkout summary, but typically not needed
  addToCart, // Not typically needed on checkout page
  selectedSize, // Pass these if they are relevant for *displaying* individual items
  selectedColor, // Pass these if they are relevant for *displaying* individual items
  fetchUserData,
  setFormattedGrandTotal,
  youMayLikeProducts,
}) {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [totalItemsPrice, setTotalItemsPrice] = useState(0);
  const [shippingRate, setShippingRate] = useState(0);
  const [voucherCode, setVoucherCode] = useState(0);
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [isFreeShipping, setIsFreeShipping] = useState(false);
  const [showFreeShippingAlert, setShowFreeShippingAlert] = useState(false);
  const [showEmptyCartAlert, setShowEmptyCartAlert] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState([]); // New state to hold selected items

  const navigate = useNavigate();
  const location = useLocation(); // Initialize useLocation hook

  // ** Step 1: Get selected items from location.state **
  useEffect(() => {
    if (location.state && location.state.selectedItems) {
      setCheckoutItems(location.state.selectedItems);
    } else {
      // Handle case where selectedItems are not passed (e.g., direct navigation to checkout)
      // You might want to redirect back to cart or show an error
      console.warn('No selected items passed to checkout page. Redirecting to cart.');
      setShowEmptyCartAlert(true); // Show alert
      const timer = setTimeout(() => {
        navigate('/cart'); // Redirect after a delay
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state, navigate]); // Depend on location.state and navigate

  // ** Step 2: Calculate total price based on checkoutItems **
  useEffect(() => {
    // Calculate total only for the items passed to the checkout
    const itemsPrice = checkoutItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalItemsPrice(itemsPrice);
  }, [checkoutItems]); // Depend on checkoutItems

  // ** Step 3: Calculate shipping rate based on checkoutItems **
  useEffect(() => {
    const FREE_SHIPPING_THRESHOLD = 2500;

    if (totalItemsPrice > FREE_SHIPPING_THRESHOLD) {
      setShippingRate(0);
      setIsFreeShipping(true);
      setShowFreeShippingAlert(true);
    } else {
      // Calculate total weight based on checkoutItems
      const totalWeight = checkoutItems.reduce((total, item) => total + (item.weight || 0), 0); // Add default 0 for safety
      const newMultiplier = totalWeight > 0 ? (0.145 + 30 / totalWeight) : 0;
      const calculatedShippingRate = (
        checkoutItems.reduce((total, item) =>
          total + (item.weight || 0) * newMultiplier, 0)).toFixed(2);
      setShippingRate(Number(calculatedShippingRate));
      setIsFreeShipping(false);
      setShowFreeShippingAlert(false);
    }
  }, [checkoutItems, totalItemsPrice]); // Depend on checkoutItems and totalItemsPrice


  const handleVoucherCode = (code) => {
    setVoucherCode(code / 100);
    setVoucherDiscount(code);
  };

  const discountMultiplier = 1 - voucherCode;
  const Total = (totalItemsPrice * discountMultiplier + shippingRate).toFixed(2);
  const grandTotal = Number(Total);

  const formattedGrandTotal = new Intl.NumberFormat('fil-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(Number(grandTotal));

  useEffect(() => {
    if (setFormattedGrandTotal) {
      setFormattedGrandTotal(formattedGrandTotal);
    }
  }, [formattedGrandTotal, setFormattedGrandTotal]);

  const handleProceedToCheckout = () => {
    setShowCheckoutForm(true);
  };

  // Adjust empty cart alert logic to use checkoutItems
  useEffect(() => {
    if (checkoutItems.length === 0 && location.state && location.state.selectedItems) {
      // This means selectedItems were passed but the array was empty
      setShowEmptyCartAlert(true);
      const timer = setTimeout(() => {
        navigate('/'); // Or navigate back to /cart
      }, 4000);
      return () => clearTimeout(timer);
    }
    // If no selectedItems were passed (handled by the first useEffect),
    // we don't need this specific empty cart alert to fire again.
  }, [checkoutItems, navigate, location.state]);


  return (
    <>
      {showFreeShippingAlert && (
        <AlertFreeShipping onClose={() => setShowFreeShippingAlert(false)} />
      )}
      {showEmptyCartAlert && (
        <AlertEmptyCart onClose={() => setShowEmptyCartAlert(false)} />
      )}
      <Container
        className="mb-4 d-flex justify-content-center aligned-items-center flex-column"
        style={{ maxWidth: '767px' }}
      >
        {!showCheckoutForm ? (
          <div>
            <div className="d-flex justify-content-center aligned-items-center">
              <h4 className="text-center mb-2" style={{ padding: '10px', marginBottom: '15px' }}>
                Checkout/Shipping Details
              </h4>
            </div>
            <div className="mb-4">
              {/* Render only the selected items for checkout */}
              {checkoutItems.length > 0 ? (
                checkoutItems.map((item) => (
                  <CartItem
                    key={item.id || item.name}
                    item={item}
                    // removeFromCart is likely not needed on checkout item display
                    // addToCart is likely not needed on checkout item display
                    selectedSize={selectedSize}
                    selectedColor={selectedColor}
                  />
                ))
              ) : (
                // This will be displayed if selectedItems are empty, before redirect
                <p className="text-center">No items selected for checkout.</p>
              )}
            </div>
            <div className="checkout_section">
              <div className="checkout_details">
                <div className="voucher">
                  <VoucherForm onVoucherValidate={handleVoucherCode} />
                </div>
                <div style={{ paddingLeft: '6px' }}>
                  <p className="items_details">Total Items Price: ₱{totalItemsPrice}</p>
                  {isFreeShipping ? (
                    <p style={{ color: '#067d62', fontSize: '14px', fontWeight: '500' }}>
                      <FaShippingFast style={{ color: '#0D6EFD' }} />Shipping Rate: ₱Free
                    </p>
                  ) : (
                    <p style={{ color: 'black', fontSize: '14px', fontWeight: '500' }}>
                      Shipping Rate: ₱{shippingRate.toFixed(2)}
                    </p>
                  )}
                  {voucherDiscount > 0 && (
                    <p style={{ color: '#067d62', fontSize: '14px', fontWeight: '500' }}>
                      Voucher Discount: {voucherDiscount}%
                    </p>
                  )}
                </div>
              </div>
              <h4 className="grandtotal"> Grand Total: {formattedGrandTotal}</h4>
              <div className="d-flex">
                <Button onClick={handleProceedToCheckout} style={{ backgroundColor: '#E92409', border: 'none' }}>
                  Continue to Shipping
                </Button>
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
            cartItems={checkoutItems} // Pass only the selected items to CheckoutForm
            formattedGrandTotal={formattedGrandTotal}
            // selectedSize={selectedSize} // Only pass these if CheckoutForm needs them for some reason
            // selectedColor={selectedColor}
            fetchUserData={fetchUserData}
            totalItemsPrice={totalItemsPrice} // Potentially useful for CheckoutForm
            shippingRate={shippingRate} // Potentially useful for CheckoutForm
            voucherDiscount={voucherDiscount} // Potentially useful for CheckoutForm
          />
        )}
      </Container>
      <YouMayLike addToCart={addToCart} youMayLikeProducts={youMayLikeProducts} />
    </>
  );
}