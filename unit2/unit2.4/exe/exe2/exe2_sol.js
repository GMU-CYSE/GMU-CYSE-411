app.get("/account/:id", (req, res) => {
    // 1. Ensure the session exists
    if (!req.session || !req.session.userId) {
        return res.status(401).send("Unauthorized");
    }

    // 2. Safely compare by converting both to Strings (avoids type mismatches)
    if (String(req.session.userId) !== String(req.params.id)) {
        return res.status(403).send("Forbidden");
    }

    // 3. Query the database (else block removed for cleaner code)
    db.get("SELECT * FROM accounts WHERE id = ?", [req.params.id], (err, data) => {
        // 4. Handle database errors
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send("Internal Server Error");
        }

        // 5. Handle case where account is not found
        if (!data) {
            return res.status(404).send("Account not found");
        }

        res.json(data);
    });
});