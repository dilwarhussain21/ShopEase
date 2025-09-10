import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateProduct() {
  const location = useLocation();
  const navigate = useNavigate();

  const productToUpdate = location.state?.product;

  const [product, setProduct] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    photo: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  // Populate form with productToUpdate
  useEffect(() => {
    if (productToUpdate) {
      setProduct(productToUpdate);
    }
  }, [productToUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/updateProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        setMessage("Product updated successfully!");
        setTimeout(() => navigate("/all-products"), 1500);
      } else {
        setMessage("Failed to update product");
      }
    } catch (error) {
      console.error("Update error:", error);
      setMessage("Error occurred during update");
    }
  };

  return (
    <div className="wrapper">
      <main className="card">
        <h1>Update Product</h1>
        <p className="subtitle">Edit the product details below.</p>

        <form onSubmit={handleUpdate} className="form">
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            required
          />

          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            placeholder="Category"
            required
          />

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />

          <input
            type="text"
            name="photo"
            value={product.photo}
            onChange={handleChange}
            placeholder="Photo URL"
            required
          />

          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            rows="4"
            required
          />

          <button type="submit">Update Product</button>
        </form>

        {message && <p style={{ marginTop: "1rem", color: "var(--primary)" }}>{message}</p>}
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
  --primary: #6366f1;
  --danger: #ef4444;
  --radius: 1rem;
  --shadow: 0 10px 25px -10px rgba(0,0,0,.4);
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
.wrapper {
  min-height: 100%;
  display: grid;
  place-items: center;
  padding: 2rem;
}
.card {
  width: 100%;
  max-width: 600px;
  background: var(--bg-card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 2rem;
  animation: pop .25s ease-out both;
}
@keyframes pop {
  from { opacity: 0; transform: scale(.96) translateY(6px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
h1 {
  margin: 0 0 .5rem;
  font-weight: 700;
  letter-spacing: -.015em;
}
.subtitle {
  margin: 0 0 1.75rem;
  color: var(--muted);
  line-height: 1.5;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
input, textarea {
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  background: var(--bg);
  color: var(--fg);
  box-shadow: inset 0 0 0 1px var(--muted);
}
input::placeholder, textarea::placeholder {
  color: var(--muted);
}
button {
  background: var(--primary);
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}
button:hover {
  background: #4f46e5;
}
`;
