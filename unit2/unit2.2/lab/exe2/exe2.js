const express = require('express');
const path = require('path');
const initSqlJs = require('sql.js');

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// --- Secure login endpoint ---
app.post('/login', (req, res) => {
    const username = req.body.username ?? '';
    const password = req.body.password ?? '';

    // Validation: reject empty fields
    if (!username || !password) {
        return res.json({
            success: false,
            error: 'Username and password are required.',
            query: null,
            user: null,
        });
    }

    // Validation: allowlist characters — only letters, digits, _ and @
    const allowlist = /^[a-zA-Z0-9_@]+$/;
    if (!allowlist.test(username) || !allowlist.test(password)) {
        return res.json({
            success: false,
            error: 'Invalid characters in input.',
            query: null,
            user: null,
        });
    }

    // Validation: reasonable length limits
    if (username.length > 50 || password.length > 100) {
        return res.json({
            success: false,
            error: 'Input exceeds maximum length.',
            query: null,
            user: null,
        });
    }

    // Parameterized query — user input is NEVER concatenated into SQL.
    // sql.js accepts :name placeholders bound separately from the query string.
    const sql = 'SELECT * FROM Users WHERE username = :username AND password = :password';

    let user  = null;
    let dbErr = null;

    try {
        const stmt = db.prepare(sql);
        stmt.bind({ ':username': username, ':password': password });
        if (stmt.step()) {
            user = stmt.getAsObject();
        }
        stmt.free();
    } catch (e) {
        dbErr = e.message;
    }

    res.json({
        // Show the template (never the interpolated string — there is none)
        query:   sql,
        success: !dbErr && !!user,
        user:    user  ?? null,
        error:   dbErr ?? null,
    });
});

let db;
initSqlJs().then(SQL => {
    db = new SQL.Database();

    db.run(`
        CREATE TABLE Users (
            id       INTEGER PRIMARY KEY,
            username TEXT NOT NULL,
            password TEXT NOT NULL
        );
        INSERT INTO Users VALUES (1, 'admin',      'admin123');
        INSERT INTO Users VALUES (2, 'joao_silva', 'mudar123');
    `);

    app.listen(PORT, () => {
        console.log(`Secure lab server → http://localhost:${PORT}`);
    });
});
