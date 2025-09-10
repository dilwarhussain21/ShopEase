import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const errors = validate(form);

  function validate(values) {
    const errs = {};
    if (!values.email) errs.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(values.email))
      errs.email = "Enter a valid email.";
    if (!values.password) errs.password = "Password is required.";
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    setErrorMessage(""); // clear error on new input
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      email: form.email,
      password: form.password,
    };

    try {
      const response = await fetch("http://localhost:8080/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Login failed: ${errorText || `Status ${response.status}`}`);
      }

      // Get raw text first to handle potential invalid JSON
      const text = await response.text();
      console.log("Raw response text:", text); // Log raw response for debugging
      let user;
      try {
        user = JSON.parse(text);
      } catch (parseError) {
        console.error("Invalid JSON response:", text);
        throw new Error("Invalid response from server: Not valid JSON. Check console for details.");
      }

      // Validate user object
      if (!user || typeof user !== "object" || !user.role || !user.email) {
        throw new Error("Invalid user data received from server");
      }

      // Store only necessary fields in localStorage, exclude password
      localStorage.setItem("user", JSON.stringify({
        email: user.email,
        name: user.name || "User",
      }));

      // Navigate based on role
      const role = user.role.trim().toLowerCase();
      if (role === "admin") {
        navigate("/admin_home");
      } else if (role === "customer") {
        navigate("/customer_home");
      } else {
        throw new Error("Unknown role: " + user.role);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(`Login error: ${error.message}`);
    }
  }

  return (
    <div className="wrapper">
      <main className="card">
        <h1>Welcome back</h1>
        <p className="subtitle">Sign in to continue.</p>

        <form onSubmit={handleSubmit} noValidate>
          <FormField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            error={touched.email && errors.email}
            placeholder="you@example.com"
            autoComplete="email"
          />

          <FormField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            error={touched.password && errors.password}
            placeholder="••••••••"
            autoComplete="current-password"
          />

          {errorMessage && <p className="error">{errorMessage}</p>}

          <button
            type="submit"
            className="btn btn--primary btn--full"
            disabled={
              Object.keys(errors).length > 0 &&
              Object.keys(touched).length > 0
            }
          >
            Sign in
          </button>
        </form>

        <p className="swap">
          Don't have an account?{" "}
          <Link to="/signup" className="link">
            Sign up
          </Link>
        </p>
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
.swap { margin-top: 1rem; color: var(--muted); font-size: .9rem; text-align: center; }
.link { color: var(--primary); font-weight: 600; text-decoration: underline; }
`;