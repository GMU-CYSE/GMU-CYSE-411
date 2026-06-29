# CYSE 411 — Unit 2.3 Lab: XSS & Client-Side Threats (Defense-in-Depth)

This lab is designed to connect **Unit 2.2 (Injection)** to **Unit 2.3 (XSS & Client-Side Threats)** by showing how an injection flaw can target the **browser runtime** and how engineers mitigate impact using **secure defaults** and **defense-in-depth**.

You will work in the `challenge/` folder. The `solutions/` folder contains one possible secure implementation (for instructors / reference).

## Learning objectives

By the end of this lab, you will be able to:

- Explain **why XSS is client-side injection** (browser is the target).
- Identify a **reflected XSS** vulnerability in server-side HTML generation.
- Demonstrate how XSS can steal a session cookie **when HttpOnly is missing**.
- Implement defensive controls:
  - **Output encoding** (server-side)
  - **Cookie flags**: `HttpOnly`, `Secure`, `SameSite`
  - **Content Security Policy (CSP)** response header

## Repository structure

```
.
├── README.md
├── package.json
├── challenge/
│   └── server.js          # vulnerable starter code (you will modify this)
├── solutions/
│   └── server.js          # one possible secure implementation
└── tests/
    └── app.test.js        # autograder tests (Jest + Supertest)
```

---

# Part 0 — Setup

## Prerequisites
- Node.js 18+ recommended
- npm

## Install dependencies
From the repo root:

```bash
npm install
```

## Run the vulnerable app
In one terminal:

```bash
node challenge/server.js
```

Open:

- `http://localhost:3000/login`
- `http://localhost:3000/profile?name=Guest`

---

# Part 1 — Observe the vulnerability (Reflected XSS)

The `/profile` endpoint reflects the `name` query parameter directly into HTML without encoding.

## Exploit payload (didactic)
Open:

```
http://localhost:3000/profile?name=<script>alert(document.cookie)</script>
```

Expected behavior (vulnerable version):
- A JavaScript alert pops up showing the session cookie.

---

# Part 2 — Use Chrome DevTools to verify cookie flags

1. Open Chrome DevTools (F12)
2. Go to **Application**
3. In the left panel, select **Storage → Cookies → http://localhost:3000**
4. Confirm the cookie `sessionId` exists
5. In the vulnerable version, **HttpOnly is not set**

---

# Part 3 — Your tasks (edit `challenge/server.js`)

You must implement all items below. The tests will check them.

## Task A — Output encode the reflected input (fix XSS)
- The app must treat user input as **data**, never as HTML/JS.
- Encode the `name` parameter before embedding it into the response HTML.
- After the fix, `<script>` should render as text, not execute.

## Task B — Set secure session cookie flags
In `/login`, set the session cookie with:

- `HttpOnly: true`
- `SameSite: Lax` (or `Strict` if you prefer; tests accept Lax or Strict)
- `Secure: true` **in production only**

For local development, HTTPS is not configured; therefore the cookie should be:
- `Secure: false` when `NODE_ENV !== "production"`
- `Secure: true` when `NODE_ENV === "production"`

## Task C — Add a CSP header
Set a CSP header for all responses:

- `default-src 'self'`
- `script-src 'self'`

This policy blocks inline scripts and reduces XSS exploitability (defense-in-depth).

---

# Part 4 — Run the tests (Autograder)

```bash
npm test
```

All tests must pass.

---

# Notes / Hints

- **XSS is not “fixed” by CSP**. CSP reduces exploitability; output encoding prevents injection.
- **HttpOnly** prevents JavaScript from reading the cookie, but XSS can still perform actions on behalf of the user.
- In real deployments, also enable HTTPS and set `Secure: true`.

---

# Optional reflection questions (submit in Canvas if requested)

1. Why does the Same-Origin Policy (SOP) *not* stop XSS?
2. What does CSP protect against, and what does it *not* protect against?
3. If `HttpOnly` is enabled, what can an attacker still do with XSS?

---

# Quick start (copy/paste)

```bash
npm install
node challenge/server.js
# visit http://localhost:3000/login then try XSS on /profile
npm test
```
