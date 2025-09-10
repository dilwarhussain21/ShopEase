import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, User, Search } from "lucide-react";

const API_BASE_URL = "http://localhost:8080"; 

export default function Customer_home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [cart, setCart] = useState([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE_URL}/allProducts`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email) {
      setUserName(storedUser.name || "");
      setUserEmail(storedUser.email || "");
    } else {
      setError("Please log in to access the cart");
      setLoading(false);
      navigate("/login");
      return;
    }

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
      })
      .catch((err) => setError(err.message));
  }, [navigate]);

  const handleAddToCart = async (product) => {
    if (!userEmail) {
      setError("Please log in to add items to the cart");
      navigate("/login");
      return;
    }

    try {
      await fetch(`${API_BASE_URL}/addToCart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, productIds: [product.id] }),
      }).then((res) => {
        if (!res.ok) throw new Error("Failed to add to cart");
        return res.json();
      });

      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.productId === product.id);
        if (existingItem) {
          return prevCart.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevCart, { productId: product.id, name: product.name, photo: product.photo, price: product.price, quantity: 1 }];
      });

      setError(null);
      alert(`${product.name} added to cart!`);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleViewCart = async () => {
    if (!userEmail) {
      setError("Please log in to view the cart");
      navigate("/login");
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/getCartItems/${userEmail}`);
      if (!res.ok) throw new Error("Failed to fetch cart items");
      const data = await res.json();
      setCart(data.map((item) => ({ productId: item.productId, name: item.name, photo: item.photo, price: item.price, quantity: item.quantity })));
      navigate("/view-cart");
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (categoryFilter ? product.category === categoryFilter : true)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-blue-600">ShopEase</h1>

        <div className="flex-1 mx-6 relative max-w-lg">
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
          />
          <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
        </div>

        <div className="flex gap-4">
          <button onClick={handleViewCart} className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <ShoppingCart />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <User />
          </button>
        </div>
      </header>

      {/* Welcome */}
      <section className="text-center py-6">
        <h2 className="text-2xl font-semibold">Welcome {userName ? userName : "Customer"} 👋</h2>
        <p className="text-gray-500 dark:text-gray-400">Explore our latest products</p>
      </section>

      {/* Error */}
      {error && <div className="bg-red-500 text-white p-3 rounded mx-6 mb-4 text-center">{error}</div>}

      {/* Filter */}
      <div className="flex justify-center gap-4 mb-6">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg dark:bg-gray-700"
        >
          <option value="">All Categories</option>
          {[...new Set(products.map((p) => p.category))].map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Products */}
      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 pb-10">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">
              <img src={product.photo} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex-1 overflow-hidden line-clamp-2">{product.description}</p>
                <p className="font-bold text-blue-600 mt-2">₹{product.price}</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
