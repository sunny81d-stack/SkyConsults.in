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

  /* ─── Top Bar ──────────────────────────────────────────────────────────── */
  .top-bar {
    width: 100%;
    padding: 1rem 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--border);
    background: var(--bg-box);
    opacity: 0;
    transform: translateY(-16px);
    animation: fadeDown 1s cubic-bezier(0.22, 1, 0.36, 1) 0s forwards;
  }

  .top-bar-left {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .top-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-weight: 400;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--text-primary);
    text-decoration: none;
  }

  .top-logo span {
    color: var(--text-muted);
    font-style: italic;
    font-weight: 300;
  }

  .contact-info {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    color: var(--text-body);
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .contact-item:hover {
    color: var(--text-primary);
  }

  .contact-icon {
    font-size: 0.9rem;
    color: var(--text-muted);
  }

  .whatsapp-btn {
    padding: 0.6rem 1.5rem;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-body);
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .whatsapp-btn:hover {
    background: #25D366;
    color: white;
    border-color: #25D366;
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
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    border-bottom: 1px solid var(--border);
    opacity: 0;
    transform: translateY(24px);
    transition: all 0.5s ease;
  }

  .service-box::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.55);
    transition: background 0.5s ease;
    z-index: 1;
  }

  .service-box:first-child {
    background-image: url('https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1600');
    border-right: 1px solid var(--border);
    animation: fadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards;
  }

  .service-box:last-child {
    background-image: url('https://images.pexels.com/photos/3707517/pexels-photo-3707517.jpeg?auto=compress&cs=tinysrgb&w=1600');
    animation: fadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 0.7s forwards;
  }

  .service-box:hover::before { background: rgba(0, 0, 0, 0.45); }

  .box-number {
    position: absolute;
    top: 2.5rem;
    left: 3.5rem;
    font-size: 0.55rem;
    letter-spacing: 0.4em;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    z-index: 2;
  }

  .box-line-top {
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    background: white;
    width: 0;
    transition: width 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    z-index: 3;
  }

  .service-box:hover .box-line-top { width: 100%; }

  .box-label {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3rem, 6vw, 5.5rem);
    font-weight: 300;
    line-height: 1;
    letter-spacing: 0.05em;
    color: white;
    transition: letter-spacing 0.5s ease;
    position: relative;
    z-index: 2;
  }

  .service-box:hover .box-label { letter-spacing: 0.1em; }

  .box-sub {
    margin-top: 0.75rem;
    font-size: 0.6rem;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.8);
    position: relative;
    z-index: 2;
    transition: color 0.4s ease;
  }

  .service-box:hover .box-sub { color: white; }

  .box-arrow {
    position: absolute;
    bottom: 3rem;
    right: 3.5rem;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    transition: color 0.4s ease, transform 0.4s ease;
    z-index: 2;
  }

  .service-box:hover .box-arrow {
    color: white;
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
    .top-bar { padding: 1rem 2rem; flex-direction: column; gap: 1rem; align-items: flex-start; }
    .top-bar-left { flex-direction: column; gap: 1rem; width: 100%; }
    .contact-info { flex-direction: column; gap: 0.75rem; align-items: flex-start; width: 100%; }
    .whatsapp-btn { width: 100%; justify-content: center; }
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
      {/* ── Top Bar with Contact ── */}
      <div className="top-bar">
        <div className="top-bar-left">
          <a href="/" className="top-logo">
            Sky<span>Consults</span>
          </a>
          <div className="contact-info">
            <a href="tel:+919008827003" className="contact-item">
              <span className="contact-icon">📞</span>
              <span>+91 900 8827 003</span>
            </a>
            <a href="mailto:Invest@skyconsults.in" className="contact-item">
              <span className="contact-icon">✉</span>
              <span>Invest@skyconsults.in</span>
            </a>
          </div>
        </div>
        <a
          href="https://wa.me/919008827003"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
        >
          <span>💬</span>
          <span>WhatsApp</span>
        </a>
      </div>

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
