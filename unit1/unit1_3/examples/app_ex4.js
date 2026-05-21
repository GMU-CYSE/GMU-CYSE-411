document.getElementById("loadBtn")
  .addEventListener("click", loadDataAsync);


  
function fakeFetch() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ role: "user" });
    }, 1000);
  });
}


async function loadDataAsync() {
  try {
    const data = await fakeFetch();
    document.getElementById("status").textContent =
      "Role: " + data.role;
  } catch (error) {
    document.getElementById("status").textContent =
      "Error loading data";
  }
}
