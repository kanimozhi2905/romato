import "./LandingPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../Context/CartContext";
import fish from "../images/fish & chips.jpg";
import garlic from "../images/garlic bread.jpg";
import gulab from "../images/gulab jamun.jpg";
import lobster from "../images/lobster.jpg";
import rasamalai from "../images/rasamalai.jpg";
import shawarma from "../images/shawarma.jpg";

const menuItems = [
  { id: 1, name: "Classic Burger", price: 249, category: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop" },
  { id: 2, name: "Cheese Pizza", price: 349, category: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop" },
  { id: 3, name: "Chicken Wings", price: 199, category: "Wings", image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&h=300&fit=crop" },
  { id: 4, name: "Pasta Alfredo", price: 279, category: "Pasta", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop" },
  { id: 5, name: "Sushi Roll", price: 399, category: "Sushi", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop" },
  { id: 6, name: "Tacos", price: 179, category: "Mexican", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop" },
  { id: 7, name: "Fried Rice", price: 229, category: "Asian", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop" },
  { id: 8, name: "Grilled Steak", price: 549, category: "Grill", image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop" },
  { id: 9, name: "Caesar Salad", price: 169, category: "Salads", image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop" },

  { id: 10, name: "Fish & Chips", price: 299, category: "Seafood", image: fish },

  { id: 11, name: "BBQ Ribs", price: 449, category: "Grill", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop" },
  { id: 12, name: "Chocolate Ice Cream", price: 129, category: "Dessert", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop" },
  { id: 13, name: "Margherita Pizza", price: 299, category: "Pizza", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop" },
  { id: 14, name: "Double Cheese Burger", price: 329, category: "Burgers", image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop" },
  { id: 15, name: "Butter Chicken", price: 379, category: "Indian", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop" },
  { id: 16, name: "Paneer Tikka", price: 289, category: "Indian", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop" },
  { id: 17, name: "Biryani", price: 349, category: "Indian", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop" },
  { id: 18, name: "Masala Dosa", price: 149, category: "Indian", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=300&fit=crop" },
  { id: 19, name: "Samosa", price: 49, category: "Indian", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop" },
  { id: 20, name: "Vada Pav", price: 59, category: "Indian", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop" },
  { id: 21, name: "Chicken Tikka", price: 329, category: "Indian", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop" },
  { id: 22, name: "Rogan Josh", price: 429, category: "Indian", image: "https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=400&h=300&fit=crop" },
  { id: 23, name: "Naan Bread", price: 49, category: "Indian", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop&auto=format" },

  { id: 24, name: "Gulab Jamun", price: 99, category: "Dessert", image: gulab },
  { id: 25, name: "Rasmalai", price: 119, category: "Dessert", image: rasamalai },

  { id: 26, name: "Spring Rolls", price: 149, category: "Asian", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop" },
  { id: 27, name: "Dim Sum", price: 249, category: "Asian", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=300&fit=crop" },
  { id: 28, name: "Ramen", price: 299, category: "Asian", image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&h=300&fit=crop" },

  { id: 29, name: "Shawarma", price: 199, category: "Middle Eastern", image: shawarma },

  { id: 30, name: "Falafel", price: 179, category: "Middle Eastern", image: "https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?w=400&h=300&fit=crop" },
  { id: 31, name: "Lamb Kebab", price: 349, category: "Grill", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop" },
  { id: 32, name: "Prawn Curry", price: 399, category: "Seafood", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop" },

  { id: 33, name: "Lobster", price: 899, category: "Seafood", image: lobster },

  { id: 34, name: "Chicken Nuggets", price: 159, category: "Wings", image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop" },
  { id: 35, name: "Mozzarella Sticks", price: 189, category: "Appetizers", image: "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=400&h=300&fit=crop" },
  { id: 36, name: "Onion Rings", price: 129, category: "Appetizers", image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&h=300&fit=crop" },
  { id: 37, name: "French Fries", price: 99, category: "Appetizers", image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=400&h=300&fit=crop" },

  { id: 38, name: "Garlic Bread", price: 119, category: "Appetizers", image: garlic },

  { id: 39, name: "Nachos", price: 229, category: "Mexican", image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&h=300&fit=crop" },
  { id: 40, name: "Burrito", price: 259, category: "Mexican", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop" },
  { id: 41, name: "Quesadilla", price: 239, category: "Mexican", image: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&h=300&fit=crop" },
  { id: 42, name: "Enchiladas", price: 279, category: "Mexican", image: "https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=400&h=300&fit=crop" },
  { id: 43, name: "Pepperoni Pizza", price: 379, category: "Pizza", image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=400&h=300&fit=crop" },
  { id: 44, name: "BBQ Chicken Pizza", price: 399, category: "Pizza", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop" },
  { id: 45, name: "Veggie Pizza", price: 329, category: "Pizza", image: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=400&h=300&fit=crop" },
  { id: 46, name: "Greek Salad", price: 199, category: "Salads", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop" },
  { id: 47, name: "Cobb Salad", price: 249, category: "Salads", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop" },
  { id: 48, name: "Fruit Salad", price: 149, category: "Salads", image: "https://images.unsplash.com/photo-1568158879083-c42860933ed7?w=400&h=300&fit=crop" },
  { id: 49, name: "Chocolate Cake", price: 179, category: "Dessert", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop" },
  { id: 50, name: "Cheesecake", price: 199, category: "Dessert", image: "https://images.unsplash.com/photo-1567171466295-4afa63d45416?w=400&h=300&fit=crop" },
];
function LandingPage() {
  const navigate = useNavigate();
  const { cart, addToCart } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Burgers", "Pizza", "Wings", "Pasta", "Sushi", "Mexican", "Asian", "Indian", "Grill", "Salads", "Seafood", "Dessert", "Appetizers", "Middle Eastern"];

  const filteredItems = selectedCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const handleAddToCart = (item) => {
    addToCart(item);
    alert(item.name + ' added to cart!');
  };

  const scrollToMenu = () => {
    document.getElementById('menu-section').scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="container">
      
      {/* NAVBAR */}
      <nav className="navbar">
        <h2 className="logo">
          Food
        </h2>

        <ul className="nav-links">
          <li onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</li>
          <li onClick={scrollToMenu}>Menu</li>
          <li onClick={scrollToContact}>Contact</li>
          <li onClick={scrollToMenu}>Shop</li>
        </ul>

        <div className="nav-right">
          <input type="text" placeholder="Search" />
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/signup" className="nav-link signup-link">Sign Up</Link>
          <span className="cart" onClick={() => navigate('/cart')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
          </span>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="hero">
        
        {/* LEFT */}
        <div className="hero-left">
          <h1>
            <span className="highlight">Tasty</span> Food Journey
          </h1>

          <p>
            Discover magical flavors delivered to your doorstep. Fresh, warm & made with love! 🌸
          </p>

          <div className="buttons">
            <button className="order-btn" onClick={scrollToMenu}>Order Now</button>
            <button className="video-btn">Watch Story</button>
          </div>

          <div className="rating">
            <span className="stars">★★★★★</span>
            <span>Lovely food, happy customers! 🌟</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hero-right">
          <img
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=500&fit=crop"
            alt="delicious food"
          />
        </div>

      </div>

      {/* MENU SECTION */}
      <section id="menu-section" className="menu-section">
        <h2 className="section-title">Our <span className="highlight">Menu</span></h2>
        
        <div className="category-filter">
          {categories.map(cat => (
            <button 
              key={cat}
              className={'category-btn ' + (selectedCategory === cat ? 'active' : '')}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="menu-card">
              <img 
                src={item.image} 
                alt={item.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop`;
                }}
              />
              <div className="menu-card-info">
                <h3>{item.name}</h3>
                <p className="category-tag">{item.category}</p>
                <p className="price">₹{item.price}</p>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(item)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact-section" className="contact-section">
        <h2 className="section-title">Send a <span className="highlight">Message</span></h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Visit Our Place</h3>
            <p>🏡 123 Meadow Lane, Green Hills</p>
            <p>📞 +91 98765 43210</p>
            <p>💌 hello@ghiblifood.com</p>
            <p>🌅 Open Sunrise to Sunset</p>
          </div>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <textarea placeholder="Your Message"></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>&copy; 2024 Ghibli Food. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default LandingPage;