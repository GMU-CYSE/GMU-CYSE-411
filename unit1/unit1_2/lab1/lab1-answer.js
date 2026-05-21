function isEven(n) {
  return typeof n === "number" && n % 2 === 0;
}

function sumArray(arr) {
  if (!Array.isArray(arr)) {
    return 0;
  }

  let sum = 0;
  for (const value of arr) {
    if (typeof value === "number") {
      sum += value;
    }
  }
  return sum;
}

function getEmail(user) {
  if (typeof user !== "object" || user === null) {
    return undefined;
  }
  return user.email;
}

function isAdmin(user) {
  return (
    typeof user === "object" &&
    user !== null &&
    user.role === "admin"
  );
}

console.log(isEven(2))//true

console.log(sumArray([1, 2, 3, 4]))//true

console.log(getEmail({ name: "Ana", email: "a@gmu.edu" })) //a@gmu.edu
console.log(isAdmin({ name: "Bob", role: "admin" }))//true


