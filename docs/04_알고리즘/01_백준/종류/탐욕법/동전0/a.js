const fs = require("fs");

const filePath = process.platform === "linux" ? "/dev/stdin" : "./in.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
let [n, k] = input.shift().split(" ").map(Number);
input = input.map(Number);
console.log(input);
console.log(n, k);
let sum = 0,
  count = 0;

while (sum < k) {
  for (let i = n; i >= 0; i -= 1) {
    if (sum + input[i] <= k) {
      sum += input[i];
      break;
    }
  }
  console.log(sum);
  count += 1;
}

console.log(count);
