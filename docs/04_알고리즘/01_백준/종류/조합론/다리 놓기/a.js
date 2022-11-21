const fs = require("fs");

const filePath = process.platform === "linux" ? "/dev/stdin" : "./in.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
num = +input.shift();
input = input.map((a) => a.split(" ").map(Number));

let max = Math.max(...input.flat());
let memo = Array.from(Array(max + 1), () => Array(max + 1).fill(0));

memo[0][0] = 0;
memo[1][0] = 1;
memo[1][1] = 1;

function DFS(N, R) {
  // console.log(N, R);
  if (memo[N][R] !== 0) return memo[N][R];
  if (R === 0 || N === R) {
    memo[N][R] = 1;
    return 1;
  }
  memo[N][R] = DFS(N - 1, R - 1) + DFS(N - 1, R);
  return memo[N][R];
}

for (let i = 0; i < num; i++) {
  let [r, n] = input[i];
  DFS(n, r);
  console.log(memo[n][r]);
}

// 재귀로 풀면 너무 오래 걸림 => 동적계획법 메모이제이션
// nCr = n-1Cr-1 + c-1Cr
// function DFS(L, check, end, m) {
//   if (L >= end && count === input[m][0]) {
//     // console.log(m, count, check);
//     answer += 1;
//     return;
//   }

//   for (let i = L; i < input[m][1]; i++) {
//     if (L !== 0 && i <= check[L - 1]) continue;
//     check[L] = i;
//     count += 1;
//     // console.log("---------", L, m, check);
//     DFS(L + 1, check, end, m);
//     check[L] = 45;
//     count -= 1;
//   }
// }

// for (let i = 0; i < n; i++) {
//   let check = Array(input[i][0]).fill(45);
//   DFS(0, check, input[i][0], i);
//   console.log(answer);
//   answer = 0;
// }
