import React, { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import API_URL from "../utils/api";
import "../styles/Cart.css";

const CheckoutPage = () => {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });
  
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const total = getTotalPrice();

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation (required, min 3 characters)
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }
    
    // Phone validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    // Address validation (required)
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    // City validation (required)
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    // Pincode validation (6 digits)
    const pincodeRegex = /^[0-9]{6}$/;
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!pincodeRegex.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleOrder = async () => {
    if (!validateForm()) {
      return;
    }
    
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('Please login to place an order');
        navigate('/login');
        return;
      }
      
      // Prepare order data (backend will get items from cart automatically)
      const orderData = {
        delivery_name: formData.name,
        delivery_phone: formData.phone,
        delivery_address: formData.address,
        delivery_city: formData.city,
        delivery_pincode: formData.pincode
      };
      
      // Call backend API
      const response = await fetch(`${API_URL}/api/orders/place/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        setOrderId(result.data.id);
        clearCart();
        setOrderPlaced(true);
      } else {
        // Show detailed error messages
        const errorMsg = result.errors ? Object.values(result.errors).join('\n') : result.message || 'Failed to place order';
        console.error('Order placement error:', result);
        alert(errorMsg);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Network error. Please check your connection and try again.');
    }
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <>
        <Navbar />
        <div className="checkout-container">
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Add items before proceeding to checkout</p>
            <button onClick={() => navigate("/")} className="shop-now-btn">
              Start Shopping
            </button>
          </div>
        </div>
      </>
    );
  }

  if (orderPlaced) {
    return (
      <>
        <Navbar />
        <div className="checkout-container">
          <div className="order-success">
            <div className="success-icon">✓</div>
            <h2>Order Placed Successfully! 🎉</h2>
            <p className="order-id">Order ID: {orderId}</p>
            <div className="success-details">
              <p>Your order has been placed successfully!</p>
              <p>We will deliver it to:</p>
              <div className="delivery-address">
                <strong>{formData.name}</strong><br />
                {formData.address}<br />
                {formData.city} - {formData.pincode}<br />
                Phone: {formData.phone}
              </div>
            </div>
            <button onClick={() => navigate("/")} className="continue-shopping-btn">
              Continue Shopping
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="checkout-container">
        <h2 className="checkout-title">Complete Your Order</h2>
        
        <div className="checkout-content">
          {/* Address Form */}
          <div className="address-form-section">
            <h3 className="form-heading">Delivery Address</h3>
            <form className="address-form">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter 10-digit mobile number"
                  maxLength="10"
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="address">Complete Address *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="House no., Street name, Area, Landmark"
                  rows="3"
                  className={errors.address ? 'error' : ''}
                />
                {errors.address && <span className="error-text">{errors.address}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter city name"
                    className={errors.city ? 'error' : ''}
                  />
                  {errors.city && <span className="error-text">{errors.city}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="pincode">Pincode *</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="6-digit pincode"
                    maxLength="6"
                    className={errors.pincode ? 'error' : ''}
                  />
                  {errors.pincode && <span className="error-text">{errors.pincode}</span>}
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="order-summary-section">
            <h3 className="summary-heading">Order Summary</h3>
            <div className="order-items">
              {cart.map((item, index) => (
                <div className="summary-item" key={index}>
                  <div className="summary-item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-qty">x{item.quantity}</span>
                  </div>
                  <span className="item-price">₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            
            <div className="summary-totals">
              <div className="summary-row">
                <span>Total Amount:</span>
                <span className="total-amount">₹{total.toLocaleString()}</span>
              </div>
            </div>
            
            <button 
              className="place-order-btn"
              onClick={handleOrder}
            >
              Place Order ✓
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;