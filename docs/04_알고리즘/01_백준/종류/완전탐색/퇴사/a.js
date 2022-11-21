const fs = require("fs");

const filePath = process.platform === "linux" ? "/dev/stdin" : "./in.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
let n = +input.shift();
input = input.map((a) => a.split(" ").map(Number));
console.log(input);
let check = Array(n).fill(0);
let sum = 0;
let max = 0;

function DFS(L, s) {
  if (sum > max) max = sum;
  if (s >= n || L >= n) {
    console.log(check);
    console.log(sum);
    return;
  }
  for (let i = s; i < n; i++) {
    if (check[i] === 1 || i + input[i][0] > n) {
      continue;
    }

    check[i] = 1;
    sum += input[i][1];
    DFS(L + 1, i + input[i][0]);
    sum -= input[i][1];

    check[i] = 0;
  }
}

DFS(0, 0);
console.log(max);
