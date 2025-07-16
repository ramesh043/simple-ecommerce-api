
# Simple E-commerce API

This project is a simple e-commerce API built to manage product listings, shopping cart operations, order creation, and user authentication with role-based access control. The API uses JSON Web Tokens (JWT) for securing routes and supports two user roles: Customer and Admin. A basic frontend is included for interacting with the API, and optional features like pagination and product search are implemented for enhanced functionality.


## Include This Features

- Product Listings: Fetch a list of available products with optional pagination and search by name or category.
- Cart Management: Customers can add, update, or remove items from their shopping cart.
- Order Creation: Customers can create orders from their cart.
- User Authentication: JWT-based authentication for secure access.
- User Roles:
Customer: Can view products, manage their cart, and place orders.

- Admin: Can manage products (add, update, delete) in addition to customer privileges.

- Frontend: Using ReactJS to create Register,Login, Products, Cart,Order, interact with the API.



## Tech Stack

Technologies Used

**Backend**:
Node.js with Express.js, PostgreSQL,
JSON Web Tokens (JWT) for authentication, cors, bcrypt for password hashing)

**Frontend**:
ReactJS , axios(Fetch API for making requests to the backend
Other Tools

**Postman (for API testing)**
Any other libraries or tools used (e.g., dotenv for environment variables)

## API Reference

#### Get all items

```http
  POST /api/auth/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | Required. User's username |
| `password` | `string` | Required. User's username |
| `role` | `string` | Optional. Role (customer or admin, defaults to customer)|

#### POST item

```http
  POST /api/auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. username |
| `password`      | `string` | **Required**. password |

#### add(num1, num2)

```http
  GET /api/products
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `page`      | `num` | Optional. Page number for pagination (e.g., 1)|
| `search`      | `string` | Optional. Search products by name |
| `limit`      | `num` | Optional. Number of items per page (e.g., 10)|
| `category`      | `string` | Optional. Filter products by category |

```http
  POST /api/products/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `num` | Product name|
| `price`      | `num` | Required. Product price |
| `desc`      | `string` |  Product desc|
| `category`      | `string` | Product category |


```http
  PUT /api/products/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Product update|
| `name`      | `string` | product name|
| `price`      | `string` | product price |
| `category`      | `string` | Product category |



```http
  DELETE /api/products/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Product delete|

## Installation

Clone the Repository:

```bash
  git clone <repository-url>
cd simple-ecommerce-api
```
Install Dependencies for backend:
```bash
  npm install express,dotenv,bycrypt,jsonwebtoken,pg
```

Install Dependencies for frontend:

```bash
  npm create vite@latest -- --template react
  cd app-name
  npm install

```
Run the Application:


```bash
  
  npm run dev

```



## Register Page

```javascript
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";
const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        form
      );
      setMessage(res.data.msg);
      // Navigate only on success
      navigate("/login");
    } catch (error) {
      setMessage(error.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />

      <select name="role" value={form.role} onChange={handleChange}>
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>

      <button type="submit">Register</button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default Register;
```


## LoginPage

```JavaScript
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        form
      );
      localStorage.setItem("token", res.data.token);
      setMessage("Login successful");
      navigate("/products");
    } catch (err) {
      setMessage("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Please Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default LoginPage;
```

## Products Page
```javascript
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
```
## Authors

- [@ramesh](https://github.com/ramesh043/simple-ecommerce-api)

