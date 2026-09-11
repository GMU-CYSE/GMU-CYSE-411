function checkAccess_const(isAdmin) {
  const role = "noadmin";
  
  if (isAdmin) {
    role = "admin";
  }

  if (role === "admin") {
    return "ACCESS GRANTED";
  }

  return "ACCESS DENIED";
}
console.log(checkAccess_const(true))
