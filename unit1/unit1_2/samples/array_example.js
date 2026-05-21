const arr = [1, 2, 3];
arr[3] = 5;

console.log("Array contents:", arr);

console.log("Array length:", arr.length);

arr.push(6);
console.log("Array after push:", arr);

const removedElement = arr.pop();
console.log("Removed element:", removedElement);
console.log("Array after pop:", arr);
console.log("Accessing index 2:", arr[2]);