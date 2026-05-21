document.getElementById("loadBtn")
  .addEventListener("click", loadDataWithPromise);

function fakeFetch() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ role: "user" });
    }, 1000);
  });
}

function loadDataWithPromise() {
  fakeFetch()
    .then(data => {
      document.getElementById("status").textContent =
        "Role: " + data.role;
    })
    .catch(error => {
      document.getElementById("status").textContent =
        "Error loading data";
    });
}
