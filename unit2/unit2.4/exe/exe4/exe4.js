const express = require('express');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const app = express();
const db = new sqlite3.Database(':memory:');

// 1. Middleware to parse JSON or Form Data from the POST body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Middleware to handle sessions
app.use(session({
  secret: 'super-secret-key-change-this-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS in production
}));

// Setup: Create a dummy user in our in-memory database
db.serialize(async () => {
  db.run("CREATE TABLE users (username TEXT UNIQUE, passwordHash TEXT)");
  
  const hash = await bcrypt.hash('password123', 10);
  db.run("INSERT INTO users VALUES ('alice', ?)", [hash]);
  console.log("Database seeded with user: alice / password123");
});

// 3. POST Login Endpoint
app.post("/login", (req, res) => {
  // Grab credentials from the POST request body
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  // Fetch the user by username
  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid username or password" });
    }

    try {
      // Compare submitted plain-text password with stored hash
      const match = await bcrypt.compare(password, user.passwordHash);

      if (match) {
        // SUCCESS: Save user info to the session
        req.session.user = { username: user.username };
        
        res.json({ success: true, message: "Logged in successfully!" });
      } else {
        res.status(401).json({ success: false, message: "Invalid username or password" });
      }
    } catch (bcryptErr) {
      res.status(500).json({ error: "Error verifying password" });
    }
  });
});

// 4. Example Protected Route (to test if the session actually works)
app.get("/dashboard", (req, res) => {
  if (req.session.user) {
    res.send(`Welcome to your dashboard, ${req.session.user.username}!`);
  } else {
    res.status(401).send("Unauthorized. Please log in first.");
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});


app.post("/login", (req, res) => {
    req.session.user = username;
});