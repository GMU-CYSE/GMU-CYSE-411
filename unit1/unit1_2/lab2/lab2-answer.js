function isZero(value) {
  return value === 0;
}

function isValidUsername(input) {
  return (
    typeof input === "string" &&
    input.length > 0
  );
}

function isTrueFlag(flag) {
  return flag === true;
}

console.log(isZero(0)) // true
console.log(isZero('0')) // false


console.log(isValidUsername("user123")) // true
console.log(isValidUsername("")) // false
console.log(isValidUsername(123)) // false



console.log(isTrueFlag(true)) // true
console.log(isTrueFlag(1)) // false
console.log(isTrueFlag("true")) // false


