const fs = require("fs");

const filePath = process.platform === "linux" ? "/dev/stdin" : "./in.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
let n = +input.shift();

let dp = Array(n + 1).fill(0);
console.log(input);
input = input[0].split(" ");

for (let i = 0; i < input.length; i++) {
  input = input.map((a) => +a);
}

console.log(input);

dp[1] = 1;

// let count = 1;
// let max = input[0];

// for (let i = 2; i < n + 1; i++) {
//   let current = input[i - 1];
//   console.log(current, max);
//   if (current > max) {
//     count += 1;
//     max = current;
//   }
//   dp[i] = count;
// }

for (let i = 0; i <= n; i++) {
  let max = 0;
  for (let j = i - 1; j >= 0; j--) {
    if (input[i] > input[j] && dp[j] > max) {
      max = dp[j];
    }
  }
  dp[i] = max + 1;
}

console.log(dp);
console.log(Math.max(...dp));
