import React, { useContext } from "react";
import products from "../Context/Data/productsData";
import { CartContext } from "../Context/CartContext";
import "../styles/ProductsPage.css";
import Navbar from "../components/Navbar";

const ProductsPage = () => {
  const { addToCart } = useContext(CartContext);

  return (
    <>
      <Navbar />
      <div className="products-container">
        <h2>Food Menu</h2>

        <div className="grid">
          {products.map((item) => (
            <div className="card" key={item.id}>
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
              <button onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;