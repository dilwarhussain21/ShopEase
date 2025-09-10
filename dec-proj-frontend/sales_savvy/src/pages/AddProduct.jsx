import React, { useState } from "react";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    photo: "",
    category: "",
  });

  const [touched, setTouched] = useState({});
  const errors = validate(form);

  function validate(values) {
    const errs = {};
    if (!values.name) errs.name = "Product name is required.";
    if (!values.description) errs.description = "Description is required.";
    if (!values.price) errs.price = "Price is required.";
    else if (isNaN(values.price)) errs.price = "Price must be a number.";
    if (!values.photo) errs.photo = "Photo URL is required.";
    if (!values.category) errs.category = "Category is required.";
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({
      name: true,
      description: true,
      price: true,
      photo: true,
      category: true,
    });

    if (Object.keys(errors).length === 0) {
      const data = {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        photo: form.photo,
        category: form.category,
      };

      try {
        const resp = await fetch("http://localhost:8080/addProduct", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const text = await resp.text();

        if (resp.ok) {
          alert("Product added successfully!");
          setForm({
            name: "",
            description: "",
            price: "",
            photo: "",
            category: "",
          });
          setTouched({});
        } else {
          alert(text || "Failed to add product.");
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong. Please try again later.");
      }
    }
  }

  return (
    <div className="wrapper">
      <main className="card">
        <h1>Add Product</h1>
        <p className="subtitle">Fill the details to add a new product.</p>

        <form onSubmit={handleSubmit} noValidate>
          <FormField
            label="Product Name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            error={touched.name && errors.name}
            placeholder="Enter product name"
          />

          <FormField
            label="Description"
            name="description"
            type="text"
            value={form.description}
            onChange={handleChange}
            onBlur={() => setTouched((t) => ({ ...t, description: true }))}
            error={touched.description && errors.description}
            placeholder="Enter product description"
          />

          <FormField
            label="Price"
            name="price"
            type="text"
            value={form.price}
            onChange={handleChange}
            onBlur={() => setTouched((t) => ({ ...t, price: true }))}
            error={touched.price && errors.price}
            placeholder="Enter price"
          />

          <FormField
            label="Photo URL"
            name="photo"
            type="text"
            value={form.photo}
            onChange={handleChange}
            onBlur={() => setTouched((t) => ({ ...t, photo: true }))}
            error={touched.photo && errors.photo}
            placeholder="Enter image URL"
          />

          <FormField
            label="Category"
            name="category"
            type="text"
            value={form.category}
            onChange={handleChange}
            onBlur={() => setTouched((t) => ({ ...t, category: true }))}
            error={touched.category && errors.category}
            placeholder="e.g., Electronics, Fashion"
          />

          <button
            type="submit"
            className="btn btn--primary btn--full"
            disabled={
              Object.keys(errors).length > 0 && Object.keys(touched).length > 0
            }
          >
            Add Product
          </button>
        </form>
      </main>

      <style>{styles}</style>
    </div>
  );
}

function FormField({ label, name, type = "text", error, ...rest }) {
  const id = `field-${name}`;
  return (
    <div className={`field ${error ? "field--error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={name} type={type} aria-invalid={!!error} {...rest} />
      {error && <span className="error">{error}</span>}
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
  --primary-foreground: #ffffff;
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
.card { width: 100%; max-width: 420px; background: var(--bg-card); border-radius: var(--radius); box-shadow: var(--shadow); padding: 2.25rem 2rem 2rem; animation: pop .25s ease-out both; }
@keyframes pop { from { opacity: 0; transform: scale(.96) translateY(6px); } to { opacity: 1; transform: scale(1) translateY(0); } }
h1 { margin: 0 0 .5rem; font-weight: 700; letter-spacing: -.015em; }
.subtitle { margin: 0 0 1.75rem; color: var(--muted); line-height: 1.5; }
.btn { border: 0; border-radius: calc(var(--radius) - 4px); padding: .75rem 1rem; font-size: 1rem; font-weight: 600; cursor: pointer; transition: transform .08s ease, opacity .15s ease; text-align: center; }
.btn:active { transform: translateY(1px) scale(.995); }
.btn--primary { background: var(--primary); color: var(--primary-foreground); }
.btn--full { width: 100%; }
.btn:disabled { opacity: .5; cursor: not-allowed; }
.field { display: flex; flex-direction: column; gap: .35rem; margin-bottom: 1rem; }
.field label { font-weight: 600; font-size: .9rem; }
.field input {
  padding: .7rem .85rem;
  border-radius: .6rem;
  border: 1px solid transparent;
  background: color-mix(in srgb, var(--bg) 10%, var(--bg-card));
  color: var(--fg);
  outline: none;
  transition: border-color .15s ease, box-shadow .15s ease;
}
.field input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 12%, transparent);
}
.field--error input { border-color: var(--danger); }
.error { color: var(--danger); font-size: .8rem; }
`;
