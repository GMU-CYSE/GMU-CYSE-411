const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.json());

// Secure session configuration (Adds SameSite & HttpOnly as extra CSRF protection)
app.use(session({
  secret: 'super-strong-and-secure-random-secret-key-12345',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    httpOnly: true, 
    secure: false, // Set to true in production with HTTPS
    sameSite: 'strict' // 🛡️ Extra CSRF Protection: Prevents browser from sending session cookies on cross-site requests
  }
}));

// Mock database authorization check
function userOwnsAccount(userId, accountNum) {
  const mockUserDb = {
    "user_123": ["account_abc_999", "account_xyz_888"]
  };
  const userAccounts = mockUserDb[userId] || [];
  return userAccounts.includes(accountNum);
}

function transfer(from, to, amount) {
  console.log(`[SECURE] Transferred $${amount} from ${from} to ${to}`);
}

// 🛡️ SECURE ROUTE (Matches Slide 5 + Best Practices)
app.post("/transfer", (req, res) => {
  
  // 1. 🛡️ EXTRA CSRF Protection (Defense-in-depth): Verify Origin header
  const targetOrigin = "http://localhost:3000";
  if (req.headers.origin !== targetOrigin) {
    return res.status(403).send("CSRF Protection: Origin mismatch");
  }

  // 2. ✅ CSRF Protection: Verify the anti-CSRF token
  if (!req.body.csrfToken || req.body.csrfToken !== req.session.csrfToken) {
    return res.status(403).send("CSRF validation failed");
  }

  // 3. ✅ Do NOT trust client input for ownership: Pull "from" directly from the session
  const from = req.session.userAccount; 
  const to = req.body.toAccount;

  // 4. ✅ Authorization check (Extra safety layer)
  if (!userOwnsAccount(req.session.userId, from)) {
    return res.status(403).send("Forbidden: You do not own this account");
  }

  // Execute safe transfer
  transfer(from, to, req.body.amount);

  res.send("Transfer complete");
});

app.listen(3000, () => console.log('Secure server running on port 3000'));