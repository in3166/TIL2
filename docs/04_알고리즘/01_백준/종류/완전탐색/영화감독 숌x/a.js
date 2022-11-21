const fs = require("fs");

const filePath = process.platform === "linux" ? "/dev/stdin" : "./in.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
input = +input;
console.log(input);
// 666 1666 2666 3666 4666 5666 6660 6661 ...
let count = 0;
let title = 0;
while (input > count) {
  title++;
  let temp = title;
  while (temp >= 666) {
    if (temp % 1000 === 666) {
      count += 1;
      break;
    }
    temp = Math.floor(temp/10);
  }
}

console.log(count, title);
