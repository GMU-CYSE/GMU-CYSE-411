const express = require('express');

const app = express();

/**
 * SOLUTION (reference):
 * - Output encoding for reflected input
 * - Secure cookie flags (HttpOnly + SameSite + Secure in production only)
 * - CSP header (default-src 'self'; script-src 'self')
 */

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// CSP for all responses (defense-in-depth)
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'"
  );
  next();
});

app.get('/login', (req, res) => {
  const isProd = process.env.NODE_ENV === 'production';

  res.cookie('sessionId', 'SESSION-ABC-123', {
    httpOnly: true,
    sameSite: 'lax',      // tests accept lax or strict
    secure: isProd        // true only in production (HTTPS expected)
  });

  res.send(`
    <h1>Logged in</h1>
    <p>Secure session cookie set.</p>
    <a href="/profile?name=Guest">Go to profile</a>
  `);
});

app.get('/profile', (req, res) => {
  const name = escapeHtml(req.query.name || 'Guest');

  res.send(`
    <h1>Profile</h1>
    <p>Hello ${name}</p>
    <p>Try XSS:</p>
    <pre>/profile?name=&lt;script&gt;alert(document.cookie)&lt;/script&gt;</pre>
  `);
});

const PORT = process.env.PORT || 3000;

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Secure app listening on http://localhost:${PORT}`);
  });
}
