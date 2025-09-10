import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = () => {
    fetch("http://localhost:8080/allProducts")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`http://localhost:8080/deleteProduct?id=${id}`, {
        method: "POST",
      })
        .then((res) => res.text())
        .then(() => {
          alert("Product deleted");
          fetchProducts();
        })
        .catch((err) => {
          console.error("Delete failed:", err);
          alert("Failed to delete product.");
        });
    }
  };

  const handleUpdate = (product) => {
    navigate("/updateProduct", { state: { product } }); // ✅ Pass full product object
  };

  return (
    <div className="wrapper">
      <main className="card">
        <h1>All Products</h1>
        <p className="subtitle">Browse all available products below.</p>

        {loading ? (
          <p>Loading...</p>
        ) : products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="product-list">
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                <img
                  src={product.photo}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="muted">{product.category}</p>
                  <p>₹ {product.price}</p>
                  <p>{product.description}</p>
                  <div
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <button
                      onClick={() => handleUpdate(product)} // ✅ FIXED
                      style={{
                        padding: "6px 10px",
                        backgroundColor: "var(--primary)",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      style={{
                        padding: "6px 10px",
                        backgroundColor: "var(--danger)",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
html, body, #root { height: 100%; margin: 0; font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif; background: linear-gradient(135deg, var(--bg) 0%, #111927 100%); color: var(--fg); }
.wrapper { min-height: 100%; display: grid; place-items: center; padding: 2rem; }
.card { width: 100%; max-width: 900px; background: var(--bg-card); border-radius: var(--radius); box-shadow: var(--shadow); padding: 2rem; animation: pop .25s ease-out both; }
@keyframes pop { from { opacity: 0; transform: scale(.96) translateY(6px); } to { opacity: 1; transform: scale(1) translateY(0); } }
h1 { margin: 0 0 .5rem; font-weight: 700; letter-spacing: -.015em; }
.subtitle { margin: 0 0 1.75rem; color: var(--muted); line-height: 1.5; }

.product-list {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
.product-card {
  background: var(--bg);
  border-radius: .75rem;
  overflow: hidden;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
}
.product-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}
.product-info {
  padding: 1rem;
}
.product-info h3 {
  margin: 0 0 .25rem;
}
.product-info p {
  margin: .25rem 0;
}
.muted {
  color: var(--muted);
}
`;
