const fs = require("fs");

const filePath = process.platform === "linux" ? "/dev/stdin" : "./in.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let computerAmount = +input.shift();
let connected = +input.shift();

input = input.map((a) => a.split(" "));

for (let i = 0; i < input.length; i++) {
  input[i] = input[i].map((a) => +a);
}
console.log(computerAmount);
console.log(connected);
console.log("input: ", input);

let count = 0;
let check = Array(computerAmount + 1).fill(0);
let graph = Array.from(Array(computerAmount + 1), () => []);

for (let i = 0; i < input.length; i++) {
  let cur = input[i];
  graph[cur[0]].push(cur[1]);
  graph[cur[1]].push(cur[0]);
}

for (let i = 0; i < graph.length; i++) {
  graph[i].sort((a, b) => a - b);
}

console.log("graph: ", graph);
console.log("check: ", check);

function DFS(v) {
  if (v > computerAmount) return;
  console.log("v: ", v);
  for (let i = 0; i < graph[v].length; i++) {
    // console.log(graph[v]);
     console.log(graph[v][i]);
    if (check[graph[v][i]] === 0) {
      check[graph[v][i]] = 1;
      count++;
      DFS(graph[v][i]);
    }
  }
}
check[1] = 1;
DFS(1);
console.log(count);
