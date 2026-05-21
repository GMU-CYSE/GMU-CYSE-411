// ---- Initial application state ----
let isAdmin = false;

// Initialize browser storage explicitly
localStorage.setItem("role", "user");
sessionStorage.setItem("authenticated", "false");
document.cookie = "role=user; path=/";

// ---- Core logic ----
function checkAccess() {
  const role = localStorage.getItem("role");
  const authenticated = sessionStorage.getItem("authenticated");

  if (isAdmin === true || role === "admin" || authenticated === "true") {
    document.getElementById("status").textContent = "ACCESS GRANTED";
  } else {
    document.getElementById("status").textContent = "ACCESS DENIED";
  }

  renderDebug();
}

// ---- Reset logic ----
function resetState() {
  console.log("resetState executed");

  isAdmin = false;
  localStorage.setItem("role", "user");
  sessionStorage.setItem("authenticated", "false");
  document.cookie = "role=user; path=/";

  document.getElementById("status").textContent = "UNDEFINED";

  renderDebug();
}


// ---- Debug output ----
function renderDebug() {
  document.getElementById("debug").textContent =
    `Runtime variable (isAdmin): ${isAdmin}
localStorage.role: ${localStorage.getItem("role")}
sessionStorage.authenticated: ${sessionStorage.getItem("authenticated")}
cookie: ${document.cookie}`;
}

// ---- Initial render (do NOT change status here) ----
renderDebug();
