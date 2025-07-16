import { useEffect, useState } from "react";
import API from "../services/api";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeFromCart = async (product_id) => {
    try {
      await API.delete("/cart", { data: { product_id } });
      setMessage("Item removed");
      fetchCart();
    } catch (err) {
      console.error("Remove failed:", err);
    }
  };

  const placeOrder = async () => {
    try {
      const res = await API.post("/orders", { items: cart });
      setMessage(res.data.msg || "Order placed!");
      setCart([]);
    } catch (err) {
      setMessage("Order failed");
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {message && <p>{message}</p>}
      <ul>
        {cart.map((item, idx) => (
          <li key={idx}>
            Product ID: {item.product_id}, Qty: {item.quantity}
            <button onClick={() => removeFromCart(item.product_id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      {cart.length > 0 && <button onClick={placeOrder}>Place Order</button>}
    </div>
  );
};

export default Cart;
