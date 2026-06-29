const express = require('express');

const app = express();

/**
 * VULNERABLE STARTER CODE — Unit 2.3 (XSS)
 *
 * Your tasks (see README):
 *  A) Fix reflected XSS in /profile (output encoding)
 *  B) Set secure cookie flags in /login (HttpOnly + SameSite + Secure in production)
 *  C) Add a CSP header for all responses (default-src 'self'; script-src 'self')
 */

// -------------------------------
// TODO (Task C): Add CSP header here (for all responses)
// Example (do not copy blindly, implement properly):
// app.use((req, res, next) => { res.setHeader('Content-Security-Policy', "..."); next(); });
// -------------------------------

/**
 * /login sets a session cookie.
 * VULNERABLE: cookie is missing HttpOnly/Secure/SameSite protections.
 */
app.get('/login', (req, res) => {
  res.cookie('sessionId', 'SESSION-ABC-123', {
    // TODO (Task B): add httpOnly, sameSite, secure (production only)
  });

  res.send(`
    <h1>Logged in</h1>
    <p>Session cookie set.</p>
    <a href="/profile?name=Guest">Go to profile</a>
  `);
});

/**
 * /profile reflects a user-controlled parameter directly into HTML.
 * VULNERABLE: reflected XSS.
 */
app.get('/profile', (req, res) => {
  const name = req.query.name || 'Guest';

  // TODO (Task A): output encode `name` before embedding into HTML
  res.send(`
    <h1>Profile</h1>
    <p>Hello ${name}</p>
    <p>Try XSS:</p>
    <pre>/profile?name=&lt;script&gt;alert(document.cookie)&lt;/script&gt;</pre>
  `);
});

const PORT = process.env.PORT || 3000;

// Export for tests
module.exports = app;

// Start only if run directly (not during tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Vulnerable app listening on http://localhost:${PORT}`);
  });
}
