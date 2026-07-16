const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database(':memory:'); // Temporary in-memory database


// GET Endpoint: http://localhost:3000/login?u=alice&p=password123
app.get('/login', (req, res) => {
  // Extract parameters from the query string (req.query)
  const u = req.query.u; 
  const p = req.query.p;

  // Run the SQL query safely
  db.get("SELECT * FROM users WHERE username=? AND password=?", [u, p], (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    
    if (row) {
      res.json({ success: true, message: "Welcome back!", user: row });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});