const express = require('express');
const path = require('path');
const initSqlJs = require('sql.js');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// --- Vulnerable login endpoint ---
// A real app would look exactly like this if the developer skipped parameterization.
app.post('/login', (req, res) => {
    const username = req.body.username ?? '';
    const password = req.body.password ?? '';

    // VULNERABILITY: raw user input concatenated directly into SQL
    const query =
        `SELECT * FROM Users WHERE username = '${username}' AND password = '${password}'`;

    console.log(`[SQL] ${query}`);

    let user  = null;
    let dbErr = null;

    try {
        const stmt = db.prepare(query);
        if (stmt.step()) {
            user = stmt.getAsObject();
        }
        stmt.free();
    } catch (e) {
        dbErr = e.message;
    }

    res.json({
        query,
        success: !dbErr && !!user,
        user:    user  ?? null,
        error:   dbErr ?? null,
    });
});

// Start only after the in-memory database is ready
// sql.js = SQLite compiled to WebAssembly — no native dependencies, no files on disk
let db;
initSqlJs().then(SQL => {
    db = new SQL.Database();

    // Seed the database (mirrors create_db_exe.sql)
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
        console.log(`Lab server → http://localhost:${PORT}`);
    });
});
