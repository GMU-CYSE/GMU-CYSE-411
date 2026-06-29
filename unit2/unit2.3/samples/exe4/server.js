const express = require('express');
const path = require('path');
const app = express();

// CSP header applied to every response
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self'"
    );
    next();
});

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
