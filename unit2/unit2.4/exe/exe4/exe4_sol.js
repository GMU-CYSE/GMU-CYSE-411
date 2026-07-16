const express = require('express');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const app = express();
const db = new sqlite3.Database(':memory:');

app.use(express.json());

// Secure configuration for express-session
app.use(session({
  secret: 'highly-confidential-secret-123',
  resave: false,
  saveUninitialized: false, // Avoids creating empty/unauthenticated sessions
  cookie: { 
    secure: false, // Set to true in production if using HTTPS
    httpOnly: true, // Prevents malicious client-side scripts (XSS) from accessing the session cookie
    sameSite: 'strict' // Protects against Cross-Site Request Forgery (CSRF) attacks
  }
}));

// --- SECURE LOGIN ROUTE (PROTECTED AGAINST SESSION FIXATION) ---
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    if (user) {
      const match = await bcrypt.compare(password, user.passwordHash);
      if (match) {
        
        // Save the data we need to keep temporarily before regeneration
        const tempUsername = user.username;

        // 🛡️ THE SOLUTION: Regenerate the session ID asynchronously
        req.session.regenerate((err) => {
          if (err) {
            return res.status(500).json({ error: "Error generating new session" });
          }

          // At this point, a brand new Session ID has been generated.
          // It is now safe to associate the authenticated user data with this new session.
          req.session.user = tempUsername;

          return res.json({ 
            success: true, 
            message: "Successfully logged in and protected!",
            newSessionID: req.sessionID // This ID is completely different from the pre-login ID
          });
        });
        
        return; // Return to prevent execution from continuing outside the callback
      }
    }
    
    res.status(401).send("Invalid credentials");
  });
});

app.listen(3000, () => console.log('Protected server running on port 3000'));