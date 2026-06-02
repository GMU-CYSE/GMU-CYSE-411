5 == "5"  // true, because == performs type coercion
null == undefined  // true, because null and undefined are considered equal with ==
0 == false  // true, because 0 is considered falsy and == performs type coercion
[] == false  // true, because an empty array is considered falsy and == performs type coercion


5 === "5"  // false, because === does not perform type coercion
null === undefined  // false, because null and undefined are not considered equal with ===
0 === false  // false, because 0 and false are not considered equal with ===
[] === false  // false, because an empty array and false are not considered equal with ===

