const fs = require("fs");

const filePath = process.platform === "linux" ? "/dev/stdin" : "./in.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
let n = +input.shift();

let dp = Array.from(Array(n), () => Array(n).fill(0));
input = input.map((a) => a.split(" "));

for (let i = 0; i < input.length; i++) {
  input[i] = input[i].map((a) => +a);
}

console.log(input);
dp[0] = input[0];

console.log(dp);
for (let i = 1; i < n; i++) {
  let len = input[i].length;
  for (let j = 0; j < len; j++) {
    if (j === 0) {
      dp[i][j] = dp[i - 1][j] + input[i][j];
    } else if (j === len - 1) {
      dp[i][j] = dp[i - 1][j - 1] + input[i][j];
    } else {
      dp[i][j] = Math.max(dp[i - 1][j - 1], dp[i - 1][j]) + input[i][j];
    }
  }
}
console.log(dp);

