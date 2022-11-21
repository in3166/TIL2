const fs = require("fs");

const filePath = process.platform === "linux" ? "/dev/stdin" : "./in.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
let n = +input[0];
let time = input[1].split(" ").map((a) => +a);
let sum = 0;
let sum2 = 0;
time
  .sort((a, b) => a - b)
  .reduce((prev, cur) => {
    sum += cur;
    sum2 += sum;
    return sum;
  }, 0);

console.log(sum2);
