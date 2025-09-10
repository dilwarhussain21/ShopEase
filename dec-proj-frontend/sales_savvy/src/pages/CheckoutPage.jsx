import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loadRazorpay from "../utils/loadRzp";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(""); // "success" | "failed" | ""

  const navigate = useNavigate();

  // ✅ Get logged-in user's email from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email || "";

  // Redirect to login if no user found
  useEffect(() => {
    if (!email) {
      navigate("/signin");
    }
  }, [email, navigate]);

  // Fetch cart items
  useEffect(() => {
    if (!email) return;
    (async () => {
      try {
        const res = await fetch(`http://localhost:8080/getCartItems/${email}`);
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setCart(data);
      } catch (e) {
        setError(e.message || "Failed to load cart");
      } finally {
        setLoading(false);
      }
    })();
  }, [email]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const clearBackendCart = async () => {
    try {
      await fetch(`http://localhost:8080/clearCart/${email}`, { method: "DELETE" });
    } catch (err) {
      console.error("Failed to clear backend cart:", err);
    }
  };

  async function handlePayment() {
    if (!cart.length || !shippingAddress) {
      alert("Please enter shipping address and ensure cart is not empty.");
      return;
    }

    const ok = await loadRazorpay();
    if (!ok) {
      alert("Razorpay SDK failed to load. Check your internet connection.");
      return;
    }

    try {
      // Create order in backend
      const res = await fetch("http://localhost:8080/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total, shippingAddress, email }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();

      if (!data?.razorpayOrderId) {
        throw new Error("Invalid order creation response from backend.");
      }

      const rzp = new window.Razorpay({
        key: data.key,
        amount: data.amount,
        currency: "INR",
        name: "SalesSavvy",
        description: "Purchase from SalesSavvy",
        order_id: data.razorpayOrderId,
        handler: async (resp) => {
          try {
            // Verify payment in backend
            const vr = await fetch("http://localhost:8080/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: resp.razorpay_order_id,
                paymentId: resp.razorpay_payment_id,
                signature: resp.razorpay_signature,
                shippingAddress,
                email,
              }),
            });

            if (!vr.ok) throw new Error(await vr.text());
            const vrData = await vr.json();

            if (!vrData?.orderId) {
              throw new Error("Backend verification did not return orderId.");
            }

            setPaymentStatus("success");
            clearCart();
            await clearBackendCart();

            // Redirect to Order Summary
            navigate(`/order-summary/${vrData.orderId}`);
          } catch (err) {
            console.error("Verification error:", err);
            setPaymentStatus("failed");
            alert("Payment verification failed");
          }
        },
        prefill: { name: user?.name || "Guest", email },
        theme: { color: "#1976D2" },
      });

      rzp.open();
    } catch (e) {
      setError(e.message || "Payment error");
      console.error("Payment error:", e);
    }
  }

  return (
    <div className="wrapper">
      <main className="card">
        <h1>Checkout</h1>

        {loading && <p className="message">Loading…</p>}
        {error && <p className="message error">{error}</p>}
        {paymentStatus === "success" && (
          <p className="message success">Payment Successful! Redirecting...</p>
        )}
        {paymentStatus === "failed" && (
          <p className="message error">Payment Failed. Try again.</p>
        )}

        {!loading && !error && cart.length === 0 && paymentStatus !== "success" && (
          <p className="message">Your cart is empty.</p>
        )}

        {!loading && !error && cart.length > 0 && paymentStatus === "" && (
          <>
            <h2>Order Summary</h2>
            <ul className="cart-items">
              {cart.map((item, idx) => (
                <li key={idx} className="cart-item">
                  {item.name} - ₹{item.price} x {item.quantity} = ₹
                  {(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="total">Total: ₹{total}</p>

            <input
              type="text"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="Enter shipping address"
              className="form-control mb-2"
            />

            <button className="btn payment-btn" onClick={handlePayment}>
              Buy Now
            </button>
          </>
        )}
      </main>

      <style>{styles}</style>
    </div>
  );
}

const styles = `
  :root {
    color-scheme: light dark;
    --bg: #0f172a;
    --bg-card: #1e293b;
    --fg: #e2e8f0;
    --muted: #94a3b8;
    --primary: #1976D2;
    --radius: 1rem;
    --shadow: 0 10px 25px -10px rgba(0,0,0,.4);
    --success: #22c55e;
    --danger: #f44336;
  }
  @media (prefers-color-scheme: light) {
    :root {
      --bg: #f8fafc;
      --bg-card: #ffffff;
      --fg: #0f172a;
      --muted: #64748b;
      --shadow: 0 10px 25px -15px rgba(0,0,0,.15);
    }
  }
  html, body, #root { height: 100%; margin: 0; font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif; background: linear-gradient(135deg, var(--bg) 0%, #111927 100%); color: var(--fg); }
  .wrapper { min-height: 100%; display: grid; place-items: center; padding: 2rem; }
  .card { width: 100%; max-width: 500px; background: var(--bg-card); border-radius: var(--radius); box-shadow: var(--shadow); padding: 2.25rem 2rem 2rem; }
  h1 { margin: 0 0 .5rem; font-weight: 700; letter-spacing: -.015em; }
  h2 { margin: 1rem 0 .5rem; font-weight: 600; color: var(--muted); }
  .message { margin: 0.5rem 0; text-align: center; }
  .success { color: var(--success); }
  .error { color: var(--danger); }
  .cart-items { list-style: none; padding: 0; margin: 0 0 1rem; }
  .cart-item { padding: 0.5rem; border-bottom: 1px solid var(--muted); }
  .total { font-weight: 600; margin: 1rem 0; text-align: right; }
  .payment-btn { width: 100%; background: var(--bg-card); color: var(--fg); border: 1px solid var(--muted); padding: .75rem; border-radius: .5rem; cursor: pointer; }
  .payment-btn:hover { background: color-mix(in srgb, var(--primary) 10%, var(--bg-card)); }
  .form-control { width: 100%; padding: 0.5rem; margin-bottom: 0.5rem; border: 1px solid var(--muted); border-radius: 0.25rem; }
`;
