function checkAccess() {
  fetch("http://localhost:3000/api/check-access")
    .then(res => res.json())
    .then(data => {
      if (data.allowed) {
        document.getElementById("status").textContent =
          "ACCESS GRANTED";
      } else {
        document.getElementById("status").textContent =
          "ACCESS DENIED";
      }
    })
    .catch(() => {
      document.getElementById("status").textContent =
        "Error contacting server";
    });
}
