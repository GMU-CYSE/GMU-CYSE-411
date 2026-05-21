// ---- Runtime variable ----
let isAdmin = false;

// ---- Initialization ----
function initState() {
  localStorage.setItem("role", "user");
  sessionStorage.setItem("authenticated", "false");
  document.cookie = "role=user; path=/";
}

initState();

// ---- Helpers ----
function getSelectedSource() {
  return document.querySelector('input[name="source"]:checked').value;
}

function getCookie(name) {
  return document.cookie
    .split("; ")
    .find(row => row.startsWith(name + "="))
    ?.split("=")[1];
}

// ---- Core Logic ----
function checkAccess() {
  const source = getSelectedSource();
  let granted = false;

  if (source === "variable") {
    granted = isAdmin === true;
  }

  if (source === "localStorage") {
    granted = localStorage.getItem("role") === "admin";
  }

  if (source === "sessionStorage") {
    granted = sessionStorage.getItem("authenticated") === "true";
  }

  if (source === "cookie") {
    granted = getCookie("role") === "admin";
  }

  document.getElementById("status").textContent =
    granted ? "ACCESS GRANTED" : "ACCESS DENIED";

  renderDebug();
}

// ---- Reset ----
function resetState() {
  isAdmin = false;
  initState();
  document.getElementById("status").textContent = "UNDEFINED";
  renderDebug();
}

// ---- Debug Output ----
function renderDebug() {
  document.getElementById("debug").textContent =
    `Variable isAdmin: ${isAdmin}
localStorage.role: ${localStorage.getItem("role")}
sessionStorage.authenticated: ${sessionStorage.getItem("authenticated")}
cookie: ${document.cookie}`;
}

// ---- Event Binding ----
document.getElementById("checkBtn")
  .addEventListener("click", checkAccess);

document.getElementById("resetBtn")
  .addEventListener("click", resetState);

// Initial debug render
renderDebug();
