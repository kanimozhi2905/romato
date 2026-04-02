import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import "../styles/Cart.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  const total = getTotalPrice();

  const handleIncrement = (id, currentQuantity) => {
    updateQuantity(id, currentQuantity + 1);
  };

  const handleDecrement = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    } else {
      removeFromCart(id);
    }
  };

  return (
    <>
      <Navbar />
      <div className="cart-container">
        <h2 className="cart-title">Your Shopping Cart</h2>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Add some delicious items to get started!</p>
            <button onClick={() => navigate("/")} className="shop-now-btn">
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item, index) => (
                <div className="cart-item" key={index}>
                  <div className="cart-item-image">
                    {item.image ? (
                      <img src={item.image} alt={item.name} onError={(e) => e.target.style.display = 'none'} />
                    ) : (
                      <div className="no-image">🍽️</div>
                    )}
                  </div>
                  <div className="cart-item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-price">₹{item.price}</p>
                    <p className="item-total">Total: ₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                  <div className="quantity-controls">
                    <button 
                      className="qty-btn qty-minus"
                      onClick={() => handleDecrement(item.id, item.quantity)}
                    >
                      -
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button 
                      className="qty-btn qty-plus"
                      onClick={() => handleIncrement(item.id, item.quantity)}
                    >
                      +
                    </button>
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Total Amount:</span>
                <span className="total-amount">₹{total.toLocaleString()}</span>
              </div>
              <button 
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Order →
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;