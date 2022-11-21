// 계단은 한 번에 한 계단씩 또는 두 계단씩 오를 수 있다. 즉, 한 계단을 밟으면서 이어서 다음 계단이나, 다음 다음 계단으로 오를 수 있다.
// 연속된 세 개의 계단을 모두 밟아서는 안 된다. 단, 시작점은 계단에 포함되지 않는다.
// 마지막 도착 계단은 반드시 밟아야 한다.
const fs = require("fs");

const filePath = process.platform === "linux" ? "/dev/stdin" : "./in.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
let n = +input[0];
let card = input[1].split(" ").map((a) => +a);

// for (let i = 1; i < input.length; i++) {
//   input[i] = +input[i];
// }

console.log(n);
console.log(card);
let len = card.length;
let dp = Array.from({ length: len }, () => 0);
dp[0] = card[0];

if (len >= 2) dp[1] = Math.max(card[0] * 2, card[1]);

for (let i = 2; i < len; i++) {
  let max = card[i];
  console.log("i: ", i);
  for (let j = i - 1; j >= 0; j--) {
    console.log("j: ", j);
    let sum = dp[j] + card[i - j - 1];
    console.log("sum: ", sum);
    if (max < sum) max = sum;
  }
  dp[i] = max;
}

console.log(dp);
