const fs = require("fs");

const filePath = process.platform === "linux" ? "/dev/stdin" : "./in.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
// input = input.map((v) => v.split(' ').map(Number));
let n = +input.shift();
input = input.map((a) => a.split(" ").map((b) => +b));
console.log(n);
console.log(input);
let check = Array(n - 1).fill(0);

let list = Array.from(Array(n + 1), () => []);

for (let [x, y] of input) {
  list[x].push(y);
  list[y].push(x);
}

// check[1] = 1;
function DFS(v) {
  // console.log(v);
  for (let i = 0; i < list[v].length; i++) {
    if (check[list[v][i]-2] === 0) {
      check[list[v][i] - 2] = v;
      DFS(list[v][i]);
    }
  }
}

DFS(1);

let result = "";

check.forEach((ans) => (result += ans + "\n"));

console.log(result);
