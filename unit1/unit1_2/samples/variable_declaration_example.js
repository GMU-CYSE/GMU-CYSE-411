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




function checkAccess_let(isAdmin) {
  if (isAdmin) {
    let role = "admin";
  }

  if (role === "admin") {
    return "ACCESS GRANTED";
  }

  return "ACCESS DENIED";
}


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

