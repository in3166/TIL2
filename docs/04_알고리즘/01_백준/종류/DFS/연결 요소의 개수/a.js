const fs = require("fs");

const filePath = process.platform === "linux" ? "/dev/stdin" : "./in.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
let t = input.shift().split(" ");
input = input.map((a) => a.split(" ")).map((a) => a.map((b) => +b));

let graph = Array.from(Array(+t[0] + 1), () => []);
let check = Array(+t[0] + 1).fill(0);

for (let i = 0; i < input.length; i++) {
  graph[input[i][0]].push(input[i][1]);
}

function DFS(v) {
  if (check[v] === 1) return;
  check[v] = 1;
  for (let i = 0; i < graph[v].length; i++) {
    DFS(graph[v][i]);
  }
}
let count = 0;
console.log(graph);
for (let i = 0; i < graph.length; i++) {
  if (graph[i].length > 0) {
    for (let j = 0; j < graph[i].length; j++) {
      if (check[graph[i][j]] === 1) continue;
      console.log(i, graph[i][j])
      check[i] = 1;
      count += 1;
      DFS(graph[i][j]);
    }
  }
}
console.log(check);
console.log(count + check.filter((a) => a === 0).length - 1);


// const fs = require("fs");

// const filePath = process.platform === "linux" ? "/dev/stdin" : "./in.txt";
// let input = fs.readFileSync(filePath).toString().trim().split("\n");
// let t = input.shift().split(" ");
// input = input.map((a) => a.split(" ")).map((a) => a.map((b) => +b));

// let graph = Array.from(Array(+t[0] + 1), () => []);
// let check = Array(+t[0] + 1).fill(0);

// for (let i = 0; i < input.length; i++) {
//   graph[input[i][0]].push(input[i][1]);
//   graph[input[i][1]].push(input[i][0]);
// }

// function DFS(v) {
//   check[v] = 1;
//   for (let i = 0; i < graph[v].length; i++) {
//     const next = graph[v][i];
//     if (check[next] === 0) DFS(next);
//   }
// }
// let count = 0;
// for (let i = 1; i < graph.length; i++) {
//   if (check[i] === 0) {
//     console.log(i)
//     DFS(i);
//     count += 1;
//   }
// }
// console.log(count);
