import React, { useState, useEffect, useRef } from "react";

/* ─── Inline CSS — Light theme: off-white background, black & grey text ──── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:           #f4f3f1;      /* warm off-white page background      */
    --bg-box:       #eeede9;      /* slightly darker box background       */
    --bg-box-hover: #e6e4df;      /* box hover state                      */
    --border:       #d0cdc8;      /* subtle warm grey borders             */
    --text-primary: #111111;      /* near-black — headings & labels       */
    --text-body:    #2e2e2e;      /* dark grey — body copy                */
    --text-muted:   #777777;      /* medium grey — hints, subtitles       */
    --text-faint:   #aaaaaa;      /* light grey — numbers, taglines       */
    --accent-line:  #111111;      /* thin accent line on hover            */
  }

  html, body, #root {
    height: 100%;
    background: var(--bg);
    color: var(--text-primary);
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    letter-spacing: 0.05em;
    overflow-x: hidden;
  }

  /* ─── Layout ──────────────────────────────────────────────────────────── */
  .site-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* ─── Header ──────────────────────────────────────────────────────────── */
  .site-header {
    width: 100%;
    padding: 3rem 4rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 1px solid var(--border);
    opacity: 0;
    transform: translateY(-16px);
    animation: fadeDown 1s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
  }

  .logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.4rem, 2.5vw, 2rem);
    font-weight: 400;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--text-primary);
    text-decoration: none;
  }

  .logo span {
    color: var(--text-muted);
    font-style: italic;
    font-weight: 300;
  }

  .header-tagline {
    font-size: 0.6rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--text-faint);
  }

  /* ─── Hero grid ───────────────────────────────────────────────────────── */
  .hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    flex: 1;
    min-height: 70vh;
  }

  .service-box {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 3rem 3.5rem;
    cursor: pointer;
    text-decoration: none;
    overflow: hidden;
    background: var(--bg-box);
    border-bottom: 1px solid var(--border);
    opacity: 0;
    transform: translateY(24px);
    transition: background 0.5s ease;
  }

  .service-box:first-child {
    border-right: 1px solid var(--border);
    animation: fadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards;
  }

  .service-box:last-child {
    animation: fadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 0.7s forwards;
  }

  .service-box:hover { background: var(--bg-box-hover); }

  .box-number {
    position: absolute;
    top: 2.5rem;
    left: 3.5rem;
    font-size: 0.55rem;
    letter-spacing: 0.4em;
    color: var(--text-faint);
    text-transform: uppercase;
  }

  .box-line-top {
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    background: var(--accent-line);
    width: 0;
    transition: width 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .service-box:hover .box-line-top { width: 100%; }

  .box-label {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3rem, 6vw, 5.5rem);
    font-weight: 300;
    line-height: 1;
    letter-spacing: 0.05em;
    color: var(--text-primary);
    transition: letter-spacing 0.5s ease;
    position: relative;
    z-index: 1;
  }

  .service-box:hover .box-label { letter-spacing: 0.1em; }

  .box-sub {
    margin-top: 0.75rem;
    font-size: 0.6rem;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: var(--text-muted);
    position: relative;
    z-index: 1;
    transition: color 0.4s ease;
  }

  .service-box:hover .box-sub { color: var(--text-body); }

  .box-arrow {
    position: absolute;
    bottom: 3rem;
    right: 3.5rem;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    color: var(--text-faint);
    text-transform: uppercase;
    transition: color 0.4s ease, transform 0.4s ease;
  }

  .service-box:hover .box-arrow {
    color: var(--text-primary);
    transform: translateX(6px);
  }

  /* ─── Vault section ───────────────────────────────────────────────────── */
  .vault-section {
    width: 100%;
    padding: 5rem 4rem;
    border-top: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    opacity: 0;
    animation: fadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 1s forwards;
  }

  .vault-header { text-align: center; }

  .vault-eyebrow {
    font-size: 0.55rem;
    letter-spacing: 0.5em;
    text-transform: uppercase;
    color: var(--text-faint);
    margin-bottom: 1rem;
  }

  .vault-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    font-weight: 300;
    font-style: italic;
    color: var(--text-body);
    letter-spacing: 0.08em;
  }

  /* ─── Code input ──────────────────────────────────────────────────────── */
  .vault-input-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    width: 100%;
    max-width: 320px;
  }

  .code-input {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--border);
    padding: 1rem 0;
    font-family: 'Montserrat', sans-serif;
    font-size: 2rem;
    font-weight: 300;
    letter-spacing: 0.5em;
    color: var(--text-primary);
    text-align: center;
    outline: none;
    transition: border-color 0.3s ease;
    -moz-appearance: textfield;
  }

  .code-input::-webkit-outer-spin-button,
  .code-input::-webkit-inner-spin-button { -webkit-appearance: none; }

  .code-input::placeholder { color: var(--text-faint); }
  .code-input:focus { border-color: var(--text-body); }
  .code-input.error { border-color: #aa3333; }
  .code-input.success { border-color: #2e2e2e; }

  .input-hint {
    font-size: 0.55rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--text-muted);
    text-align: center;
    height: 1rem;
    transition: color 0.3s ease;
  }

  .input-hint.error { color: #aa3333; }
  .input-hint.success { color: var(--text-body); }

  /* ─── Proceed button ──────────────────────────────────────────────────── */
  .proceed-btn {
    display: inline-block;
    padding: 0.9rem 3rem;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-body);
    font-family: 'Montserrat', sans-serif;
    font-size: 0.6rem;
    font-weight: 400;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    cursor: pointer;
    text-decoration: none;
    opacity: 0;
    pointer-events: none;
    transform: translateY(8px);
    transition: opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease,
                color 0.3s ease, background 0.3s ease;
  }

  .proceed-btn.visible {
    opacity: 1;
    pointer-events: all;
    transform: translateY(0);
  }

  .proceed-btn:hover {
    border-color: var(--text-primary);
    color: var(--text-primary);
    background: rgba(0,0,0,0.04);
  }

  /* ─── Footer ──────────────────────────────────────────────────────────── */
  .site-footer {
    width: 100%;
    padding: 2rem 4rem;
    border-top: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .footer-copy {
    font-size: 0.55rem;
    letter-spacing: 0.25em;
    color: var(--text-faint);
    text-transform: uppercase;
  }

  .footer-domain {
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    color: var(--text-muted);
    font-style: italic;
  }

  /* ─── Animations ──────────────────────────────────────────────────────── */
  @keyframes fadeDown {
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeUp {
    to { opacity: 1; transform: translateY(0); }
  }

  /* ─── Responsive ──────────────────────────────────────────────────────── */
  @media (max-width: 768px) {
    .site-header { padding: 2rem; flex-direction: column; align-items: flex-start; gap: 0.5rem; }
    .hero-grid { grid-template-columns: 1fr; min-height: auto; }
    .service-box:first-child { border-right: none; border-bottom: 1px solid var(--border); }
    .service-box { min-height: 40vh; }
    .vault-section { padding: 3rem 2rem; }
    .site-footer { padding: 1.5rem 2rem; flex-direction: column; gap: 0.5rem; text-align: center; }
  }
`;

/* ─── API base — update to your actual Flask URL in production ─────────────── */
const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://skyconsults.in/api"
    : "http://localhost:5000/api";

export default function App() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("idle"); // idle | checking | valid | invalid
  const [proceedUrl, setProceedUrl] = useState(null);
  const inputRef = useRef(null);

  /* Inject styles */
  useEffect(() => {
    const tag = document.createElement("style");
    tag.textContent = styles;
    document.head.appendChild(tag);
    return () => document.head.removeChild(tag);
  }, []);

  /* Verify code whenever 4 digits are entered */
  useEffect(() => {
    if (code.length !== 4) {
      setStatus("idle");
      setProceedUrl(null);
      return;
    }

    setStatus("checking");

    fetch(`${API_BASE}/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: parseInt(code, 10) }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.valid) {
          if (data.redirect) {
            // Specific redirect — navigate immediately
            window.location.href = data.redirect;
          } else {
            setStatus("valid");
            setProceedUrl(null); // Generic unlock — button links to default
          }
        } else {
          setStatus("invalid");
        }
      })
      .catch(() => setStatus("invalid"));
  }, [code]);

  const hintText = {
    idle: "enter your 4-digit access code",
    checking: "verifying...",
    valid: "access granted",
    invalid: "invalid code",
  }[status];

  const inputClass = `code-input${status === "invalid" ? " error" : status === "valid" ? " success" : ""}`;
  const hintClass = `input-hint${status === "invalid" ? " error" : status === "valid" ? " success" : ""}`;

  return (
    <div className="site-wrapper">
      {/* ── Header ── */}
      <header className="site-header">
        <a href="/" className="logo">
          Sky<span>Consults</span>
        </a>
        <p className="header-tagline">Spaces · Properties · Possibilities</p>
      </header>

      {/* ── Hero boxes ── */}
      <div className="hero-grid">
        <a
          href="https://interiors.skyconsults.in"
          className="service-box"
          rel="noopener noreferrer"
        >
          <div className="box-line-top" />
          <span className="box-number">01</span>
          <h2 className="box-label">Interiors</h2>
          <p className="box-sub">Design · Space Planning · Execution</p>
          <span className="box-arrow">Visit →</span>
        </a>

        <a
          href="https://realestate.skyconsults.in"
          className="service-box"
          rel="noopener noreferrer"
        >
          <div className="box-line-top" />
          <span className="box-number">02</span>
          <h2 className="box-label">Real Estate</h2>
          <p className="box-sub">Acquisition · Advisory · Investment</p>
          <span className="box-arrow">Visit →</span>
        </a>
      </div>

      {/* ── Client Vault ── */}
      <section className="vault-section">
        <div className="vault-header">
          <p className="vault-eyebrow">Restricted</p>
          <h3 className="vault-title">Client Access</h3>
        </div>

        <div className="vault-input-wrap">
          <input
            ref={inputRef}
            type="number"
            className={inputClass}
            placeholder="_ _ _ _"
            maxLength={4}
            value={code}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 4);
              setCode(val);
            }}
            aria-label="Client access code"
          />
          <p className={hintClass}>{hintText}</p>

          <a
            href={proceedUrl || "https://realestate.skyconsults.in"}
            className={`proceed-btn${status === "valid" ? " visible" : ""}`}
            rel="noopener noreferrer"
          >
            Proceed
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <span className="footer-copy">© {new Date().getFullYear()} SkyConsults. All rights reserved.</span>
        <span className="footer-domain">skyconsults.in</span>
      </footer>
    </div>
  );
}
