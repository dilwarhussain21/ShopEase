import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Define API_BASE_URL as a constant with a default value
const API_BASE_URL = "http://localhost:8080"; // Use .env later after configuration

export default function ViewCart() {
  const [cart, setCart] = useState([]); // { productId, name, photo, price, quantity }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Load user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email) {
      setUserEmail(storedUser.email);
    } else {
      setError("Please log in to view the cart");
      setLoading(false);
      navigate("/signin"); // Adjusted to match your /signin route
      return;
    }

    // Fetch cart items from backend
    fetch(`${API_BASE_URL}/getCartItems/${storedUser.email}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch cart items");
        return res.json();
      })
      .then((data) => {
        setCart(
          data.map((item) => ({
            productId: item.productId,
            name: item.name,
            photo: item.photo,
            price: item.price,
            quantity: item.quantity,
          }))
        );
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [navigate]);

  const handleRemoveFromCart = async (productId) => {
    if (!userEmail) {
      setError("Please log in to remove items from the cart");
      navigate("/signin");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/removeCartItem/${userEmail}/${productId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to remove item from cart");
      setCart(cart.filter((item) => item.productId !== productId));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (!userEmail) {
      setError("Please log in to update cart quantities");
      navigate("/signin");
      return;
    }

    if (newQuantity < 1) return; // Prevent invalid quantities

    try {
      const res = await fetch(`${API_BASE_URL}/updateCartItem`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          productId,
          quantity: newQuantity,
        }),
      });
      if (!res.ok) throw new Error("Failed to update cart item quantity");
      setCart(
        cart.map((item) =>
          item.productId === productId ? { ...item, quantity: newQuantity } : item
        )
      );
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) {
      setError("Your cart is empty!");
      return;
    }
    navigate("/checkout", { state: { cart, total: totalPrice } });
  };

  return (
    <div
      style={{
        backgroundColor: "#1A202C",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        color: "#fff",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#e0e1dd" }}>
        🛒 Your Shopping Cart
      </h1>

      {error && (
        <div
          style={{
            backgroundColor: "#f44336",
            color: "#fff",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      {loading ? (
        <p style={{ textAlign: "center", fontSize: "18px" }}>Loading cart...</p>
      ) : cart.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px" }}>Your cart is empty.</p>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {cart.map((item) => (
              <div
                key={item.productId}
                style={{
                  backgroundColor: "#212B3C",
                  borderRadius: "12px",
                  padding: "15px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <img
                  src={item.photo}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
                <h3 style={{ color: "#e0e1dd", marginBottom: "5px" }}>{item.name}</h3>
                <p
                  style={{
                    color: "#b0b7c0",
                    fontSize: "14px",
                    marginBottom: "10px",
                    height: "40px",
                    overflow: "hidden",
                  }}
                >
                  Item details...
                </p>
                <p
                  style={{
                    fontWeight: "bold",
                    color: "#e0e1dd",
                    marginBottom: "10px",
                  }}
                >
                  ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                </p>

                {/* Quantity controls */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <button
                    onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                    style={{
                      backgroundColor: "#1976D2",
                      color: "#fff",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      marginRight: "10px",
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#1565C0")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#1976D2")}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                    style={{
                      backgroundColor: "#1976D2",
                      color: "#fff",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      marginLeft: "10px",
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#1565C0")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#1976D2")}
                  >
                    +
                  </button>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => handleRemoveFromCart(item.productId)}
                  style={{
                    backgroundColor: "#d32f2f",
                    color: "#fff",
                    border: "none",
                    padding: "8px 15px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#b71c1c")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#d32f2f")}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Total price & Checkout */}
          <div
            style={{
              marginTop: "30px",
              backgroundColor: "#212B3C",
              padding: "20px",
              borderRadius: "12px",
              maxWidth: "500px",
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
            }}
          >
            <h2 style={{ marginBottom: "10px", color: "#e0e1dd" }}>
              Total: ₹{totalPrice}
            </h2>
            <button
              onClick={handleCheckout}
              style={{
                backgroundColor: "#1976D2",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "25px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#1565C0")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#1976D2")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}

      {/* Continue Shopping */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={() => navigate("/customer_home")}
          style={{
            backgroundColor: "#2E7D32",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "25px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#1b5e20")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#2E7D32")}
        >
          ← Continue Shopping
        </button>
      </div>
    </div>
  );
}
