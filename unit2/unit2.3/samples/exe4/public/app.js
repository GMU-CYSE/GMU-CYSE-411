function handleSubmit() {
    const input = document.getElementById("msgInput").value;
    // VULNERABLE: direct innerHTML — but CSP blocks injected scripts
    document.getElementById("output").innerHTML = "You searched for: " + input;
}
