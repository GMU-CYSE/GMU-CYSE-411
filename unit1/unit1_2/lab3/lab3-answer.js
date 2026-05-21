function checkAccess(jsonInput) {
  try {
    const user = JSON.parse(jsonInput);

    if (
      typeof user !== "object" ||
      user === null ||
      typeof user.role !== "string"
    ) {
      return "user";
    }

    if (user.role === "admin") {
      return "admin";
    }

    return "user";

  } catch (error) {
    // Falha segura: qualquer erro resulta em menor privilégio
    return "user";
  }
}

console.log(checkAccess('{"name": "Alice", "role": "admin"}')) // "admin"
console.log(checkAccess('{"name": "Bob", "role": "user"}')) // "user"
console.log(checkAccess('{}')) // "user"


console.log(checkAccess('{"name": "Charlie"}')) // "user"
console.log(checkAccess('Invalid JSON')) // "user"

console.log(checkAccess('{role:admin}')) // "user"

console.log(checkAccess('{"role":true}')) // "user"
