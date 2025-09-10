import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function OrderSummary() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) {
      setError("No order ID provided.");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const res = await fetch(`http://localhost:8080/getOrderById/${orderId}`);
        if (!res.ok) throw new Error("Order not found or server error");
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [orderId]);

  if (loading) return <p className="message">Loading order...</p>;

  if (error)
    return (
      <div className="wrapper">
        <p className="message error">{error}</p>
        <button className="btn home-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );

  if (!order) return <p className="message">No order found.</p>;

  return (
    <div className="wrapper">
      <main className="card">
        <h1>Thank You for Your Purchase!</h1>
        <p className="success-message">Your payment was successful.</p>

        <div className="order-info">
          <h2>Order Details</h2>
          <p>
            <strong>Order ID:</strong> {order.razorpayOrderId || order.orderId}
          </p>
          <p>
            <strong>Amount Paid:</strong> ₹{order.amount.toFixed(2)}
          </p>
          <p>
            <strong>Status:</strong> {order.status || "Completed"}
          </p>
          <p>
            <strong>Shipping Address:</strong> {order.shippingAddress || "N/A"}
          </p>
        </div>

        <Link className="btn home-btn" to="/">
          Back to Home
        </Link>
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
html, body, #root { 
  height: 100%; 
  margin: 0; 
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif; 
  background: linear-gradient(135deg, var(--bg) 0%, #111927 100%); 
  color: var(--fg); 
}
.wrapper { min-height: 100%; display: grid; place-items: center; padding: 2rem; }
.card { width: 100%; max-width: 500px; background: var(--bg-card); border-radius: var(--radius); box-shadow: var(--shadow); padding: 2.25rem 2rem 2rem; text-align: center; }
h1 { margin: 0 0 0.5rem; font-weight: 700; letter-spacing: -.015em; }
.success-message { color: var(--success); margin-bottom: 1.5rem; font-weight: 600; }
.order-info { text-align: left; margin-bottom: 2rem; }
.order-info h2 { margin-bottom: 0.75rem; color: var(--muted); }
.order-info p { margin: 0.25rem 0; }
.btn { display: inline-block; background: var(--bg-card); color: var(--fg); border: 1px solid var(--muted); padding: 0.75rem 1rem; border-radius: 0.5rem; cursor: pointer; text-decoration: none; font-weight: 600; transition: background 0.2s; }
.btn:hover { background: color-mix(in srgb, var(--primary) 15%, var(--bg-card)); }
.message { font-size: 1rem; }
.message.error { color: var(--danger); }
.home-btn { margin-top: 1rem; }
`;
