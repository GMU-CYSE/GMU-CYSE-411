const express = require("express");
const path = require("path");

const app = express();

// Serve static frontend files (index.html, app.js)
app.use(express.static(__dirname));

// API route
app.get("/api/check-access", (req, res) => {
  res.json({ allowed: false });
});

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
  console.log("Open http://localhost:3000/index.html");
});
