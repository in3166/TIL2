// 계단은 한 번에 한 계단씩 또는 두 계단씩 오를 수 있다. 즉, 한 계단을 밟으면서 이어서 다음 계단이나, 다음 다음 계단으로 오를 수 있다.
// 연속된 세 개의 계단을 모두 밟아서는 안 된다. 단, 시작점은 계단에 포함되지 않는다.
// 마지막 도착 계단은 반드시 밟아야 한다.
const fs = require("fs");

const filePath = process.platform === "linux" ? "/dev/stdin" : "./in.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
input[0] = 0;
for (let i = 1; i < input.length; i++) {
  input[i] = +input[i];
}

console.log(input);
let answer = 0;
let check = Array.from({ length: input.length }, () => 0);
check[1] = input[1];
if (input.length >= 3) check[2] = input[1] + input[2];
if (input.length >= 4)
  check[3] = Math.max(input[1] + input[3], input[2] + input[3]);

for (let i = 3; i < input.length; i++) {
  check[i] = Math.max(
    input[i] + check[i - 2],
    input[i] + check[i - 3] + input[i - 1]
  );
}

console.log(check);

console.log(check[input.length - 1]);

// 전칸을 밟는 경우: 3칸을 연속 밟을 수 있으므로 전전칸을 안밟도록한다 => 전전전칸의 누적값을 가져온다.


// const fs = require("fs");
// const filePath = process.platform === "linux" ? "/dev/stdin" : "../input.txt";

// let [count, ...input] = fs.readFileSync(filePath).toString().trim().split("\n");
// input = input.map(Number);

// solution(input);

// function solution(input) {
//   const dp = Array(input.length).fill(0);
//   dp[0] = input[0];
//   dp[1] = input[0] + input[1];
//   dp[2] = Math.max(input[0], input[1]) + input[2];

//   for (let i = 3; i < input.length; i += 1) {
//     dp[i] = Math.max(dp[i - 2] + input[i], dp[i - 3] + input[i - 1] + input[i]);
//   }
//   console.log(dp[dp.length - 1]);
// }
