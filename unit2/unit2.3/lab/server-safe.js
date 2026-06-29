const express = require('express');
const app = express();

/*
 * Login endpoint — sets a session cookie WITH HttpOnly (safe)
 */
app.get('/login', (req, res) => {
  res.cookie('sessionId', 'SESSION-ABC-123', {
    httpOnly: true,    // ✅ JS cannot access this cookie via document.cookie
    secure: false,     // false for localhost demo
    sameSite: 'lax'
  });

  res.send(`
    <h1>Logged in</h1>
    <p>Secure session cookie set.</p>
    <a href="/profile">Go to profile</a>
  `);
});

/*
 * Safe page — escapes user input before rendering
 */
app.get('/profile', (req, res) => {
  const name = (req.query.name || 'Guest')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  res.send(`
    <h1>Profile</h1>
    <p>Hello ${name}</p>
    <p>XSS is now blocked by output encoding.</p>
  `);
});

app.listen(3001, () => {
  console.log('Server running at http://localhost:3001');
});
