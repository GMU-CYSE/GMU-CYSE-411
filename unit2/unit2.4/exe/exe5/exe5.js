const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.json());
app.use(session({
  secret: 'weak-secret',
  resave: false,
  saveUninitialized: true
}));

// Mock transfer function
function transfer(from, to, amount) {
  console.log(`Transferred $${amount} from Account [${from}] to Account [${to}]`);
}

// ❌ VULNERABLE ROUTE (Matches Slides 1-4)
app.post("/transfer", (req, res) => {
  // Vulnerability 1 & 2: Parameter Tampering & Broken Access Control
  // The server trusts the client to define who the money is being taken "from".
  const from = req.body.fromAccount; 
  const to = req.body.toAccount;

  // Vulnerability 3: CSRF
  // No token verification exists. A third-party malicious site can trigger this POST request.
  transfer(from, to, req.body.amount);

  res.send("Transfer complete");
});

app.listen(3000, () => console.log('Vulnerable server running on port 3000'));