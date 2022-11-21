const fs = require("fs");

const filePath = process.platform === "linux" ? "/dev/stdin" : "./in.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
let n = +input.shift();
input = input.map((a) => a.split(" ").map(Number));
console.log(n);

input.sort((a, b) => (a[1] === b[1] ? a[0] - b[0] : a[1] - b[1]));

console.log(input);
let end = 0;
let count = 0;
for (let i = 0; i < input.length; i++) {
  if (end <= input[i][0]) {
    end = input[i][1];
    count++;
  }
}
console.log(count);
