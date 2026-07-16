const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const app = express();
const db = new sqlite3.Database(':memory:');

// GET Endpoint: http://localhost:3000/login?u=alice&p=password123
app.get('/login', (req, res) => {
  const u = req.query.u; 
  const p = req.query.p; // The plain-text password from the user

  // 1. Fetch the user by username first
  db.get("SELECT * FROM users WHERE username=?", [u], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    try {
      // 2. Compare the plain-text password with the stored hash
      const match = await bcrypt.compare(p, user.passwordHash);
      
      if (match) {
        res.json({ success: true, message: "Welcome back!", user: { username: user.username } });
      } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    } catch (bcryptErr) {
      res.status(500).json({ error: "Error verifying password" });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});