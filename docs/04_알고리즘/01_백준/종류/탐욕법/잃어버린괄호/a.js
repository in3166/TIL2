const fs = require("fs");

const filePath = process.platform === "linux" ? "/dev/stdin" : "./in.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
input = input[0].split("-");

input = input.map((a) => a.split("+"));
console.log(input);
let plus = function (arr) {
  if (arr.length === 1) return +arr[0];
  return arr.reduce((prev, cur) => +prev + +cur, 0);
};
let count = plus(input[0]);

for (let i = 1; i < input.length; i++) {
  count -= plus(input[i]);
}

console.log(count);
