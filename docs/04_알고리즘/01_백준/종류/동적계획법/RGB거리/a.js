const fs = require("fs");

const filePath = process.platform === "linux" ? "/dev/stdin" : "./in.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
let n = +input.shift();

let dp = Array.from(Array(n), () => Array(3).fill(0));

for (let i = 0; i < input.length; i++) {
  input[i] = input[i].split(" ").map((a) => +a);
}

dp[0] = input[0];

for (let i = 1; i < n; i++) {
  for (let x = 0; x < 3; x++) {
    // n 번째 집의 색을 선택
    console.log(dp[i - 1]);
    let min = dp[i - 1].reduce((prev, cur, curIndex) => {
      if (curIndex !== x && prev > cur) {
        return cur;
      }
      return prev;
    }, Number.MAX_SAFE_INTEGER);
    console.log(min);
    dp[i][x] = min + input[i][x];
  }
}

console.log(n);
console.log(input);

console.log(Math.min(...dp[n - 1]));

// 첫째 줄에 집의 수 N(2 ≤ N ≤ 1,000)이 주어진다.
// 둘째 줄부터 N개의 줄에는 각 집을 빨강, 초록, 파랑으로 칠하는 비용이 1번 집부터 한 줄에 하나씩 주어진다. 집을 칠하는 비용은 1,000보다 작거나 같은 자연수이다.

// 집은 빨강, 초록, 파랑 중 하나의 색으로 칠해야 한다. 각각의 집을 빨강, 초록, 파랑으로 칠하는 비용이 주어졌을 때, 아래 규칙을 만족하면서 모든 집을 칠하는 비용의 최솟값을 구해보자.

// 1번 집의 색은 2번 집의 색과 같지 않아야 한다.
// N번 집의 색은 N-1번 집의 색과 같지 않아야 한다.
// i(2 ≤ i ≤ N-1)번 집의 색은 i-1번, i+1번 집의 색과 같지 않아야 한다.
