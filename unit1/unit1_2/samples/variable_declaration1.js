function checkAccess_var(isAdmin) {
  if (isAdmin) {
    var role = "admin";
  }

  // role exists even if isAdmin === false
  if (role === "admin") {
    return "ACCESS GRANTED";
  }

  return "ACCESS DENIED";
}

console.log(checkAccess_const(true))
