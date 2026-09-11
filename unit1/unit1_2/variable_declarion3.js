
function checkAccess_let(isAdmin) {
  if (isAdmin) {
    let role = "admin";
  }

  if (role === "admin") {
    return "ACCESS GRANTED";
  }

  return "ACCESS DENIED";
}


console.log(checkAccess_let(true))

