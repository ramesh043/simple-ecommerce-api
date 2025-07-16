import { useEffect, useState } from "react";
import axios from "axios";
import "./product.css";
import { toast } from "react-toastify";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();

  // ✅ Redirect to login if no token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warning("Please login to continue");
      navigate("/login");
    }
  }, [navigate]);

  // ✅ Fetch products
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/products`)
      .then((res) => setProducts(res.data))
      .catch(() => setError("Failed to fetch products"));
  }, []);

  // ✅ Add to cart
  const handleAddToCart = async (product_id) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/cart/add`,
        { product_id, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(res.data.msg);
      setCartCount((prev) => prev + 1);
    } catch (err) {
      const backendMessage =
        err.response?.data?.msg || err.message || "Unknown error";

      console.error("Add to Cart Error:", backendMessage);
      toast.error(`Add to cart failed: ${backendMessage}`);
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div>
      {/* ✅ Navbar */}
      <nav className="navbar">
        <h1 className="nav-logo">
          🛍️ ECommerce-Web
        </h1>

        <div className="nav-actions">
          <div className="cart-icon">
            <HiOutlineShoppingCart size={24} color="#333" />
            <span className="cart-count">{cartCount}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <LuLogOut size={18} /> Logout
          </button>
        </div>
      </nav>

      <div className="products-container">
        <h2 style={{ textAlign: "left" }}>Let's Shopping</h2>
        {error && <p className="error">{error}</p>}

        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <h4>{product.title}</h4>
              <p>₹ {product.price}</p>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product.id)}
              >
                Add To Cart <HiOutlineShoppingCart size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
