const user = {
  name: "admin",
  role: "user"
};

console.log(user.name);  // "admin"
console.log(user["role"]);  // "user"

user.role = "superuser";
console.log(user.role);  // "superuser"