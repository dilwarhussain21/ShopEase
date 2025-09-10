import React from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="wrapper">
      <main className="card">
        <h1>Welcome 👋</h1>
        <p className="subtitle">Please choose how you’d like to continue.</p>

        <div className="actions">
          <Link to="/signin" className="btn btn--primary">Sign In</Link>
          <Link to="/signup" className="btn btn--ghost">Sign Up</Link>
        </div>
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
  --primary-foreground: #ffffff;
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
.actions { display: flex; gap: .75rem; margin-top: 1.25rem; }
.btn { border: 0; border-radius: calc(var(--radius) - 4px); padding: .75rem 1rem; font-size: 1rem; font-weight: 600; cursor: pointer; transition: transform .08s ease, opacity .15s ease; text-align: center; }
.btn:active { transform: translateY(1px) scale(.995); }
.btn--primary { background: var(--primary); color: var(--primary-foreground); text-decoration: none; }
.btn--ghost { background: transparent; color: var(--fg); outline: 1px solid color-mix(in srgb, var(--fg) 18%, transparent); text-decoration: none; }
`;
