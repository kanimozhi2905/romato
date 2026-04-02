import { createContext, useState } from "react";
import API_URL from "../utils/api";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = async (item) => {
    // Check if item already exists in cart
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    
    if (existingItem) {
      // If item exists, increment its quantity
      setCart(cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      // If item doesn't exist, add it with quantity 1
      setCart([...cart, { ...item, quantity: 1 }]);
    }

    // Sync with backend
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch(`${API_URL}/api/cart/add/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            food_item_id: item.id,
            quantity: 1
          })
        });
      }
    } catch (error) {
      console.error('Error syncing cart with backend:', error);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCart(cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const loadCartFromBackend = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await fetch(`${API_URL}/api/cart/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data.items) {
            // Convert backend cart items to frontend format
            const frontendCart = result.data.items.map(item => ({
              id: item.food_item.id,
              name: item.food_item.name,
              price: item.food_item.price,
              category: item.food_item.category?.name || 'Other',
              image: item.food_item.image,
              quantity: item.quantity
            }));
            setCart(frontendCart);
          }
        }
      }
    } catch (error) {
      console.error('Error loading cart from backend:', error);
    }
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems,
      loadCartFromBackend
    }}>
      {children}
    </CartContext.Provider>
  );
};