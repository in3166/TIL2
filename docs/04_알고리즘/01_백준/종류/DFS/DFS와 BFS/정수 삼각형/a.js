const fs = require("fs");

const filePath = process.platform === "linux" ? "/dev/stdin" : "./in.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let n = input.shift().split(" ");

input = input.map((a) => a.split(" "));

for (let i = 0; i < input.length; i++) {
  input[i] = input[i].map((a) => +a);
  if (i === 0) {
    n = n.map((a) => +a);
  }
}
console.log(n);
console.log("input: ", input);

let dis = Array.from(Array(n[0] + 1), () => []);
let check = Array(n[0] + 1).fill(0);

console.log("check: ", check);
for (let i = 0; i < n[1]; i++) {
  let cur = input[i];
  console.log(cur)
  dis[cur[0]].push(cur[1]);
  dis[cur[1]].push(cur[0]);
}
for (let i = 0; i < dis.length; i++) {
  console.log("dis1: ", dis[i]);
  dis[i].sort((a, b) => a - b);
}
console.log("dis: ", dis);

let dfs = [];
function DFS(v) {
  if (check[v] === 1) return;
  check[v] = 1;
  dfs.push(v);
  // console.log("v: ", v);
  for (let i = 0; i < dis[v].length; i++) {
    // console.log(dis[v][i]);
    DFS(dis[v][i]);
  }
}

DFS(n[2]);
console.log(...dfs);

let check2 = Array(n[0] + 1).fill(0);
let queue = [n[2]];
let bfs = [];

while (queue.length) {
  let v = queue.shift();
  bfs.push(v);
  check2[v] = 1;
  for (let i = 0; i <= dis[v].length; i++) {
    if (check2[dis[v][i]] === 0) {
      check2[dis[v][i]] = 1;
      queue.push(dis[v][i]);
    }
  }
}

console.log(...bfs);

// 정점의 개수 N, 간선의 개수 5, 탐색 위치 v
// 그래프를 DFS로 탐색한 결과와 BFS로 탐색한 결과를 출력하는 프로그램을 작성하시오. 단, 방문할 수 있는 정점이 여러 개인 경우에는 정점 번호가 작은 것을 먼저 방문하고, 더 이상 방문할 수 있는 점이 없는 경우 종료한다. 정점 번호는 1번부터 N번까지이다.

// 첫째 줄에 정점의 개수 N(1 ≤ N ≤ 1,000), 간선의 개수 M(1 ≤ M ≤ 10,000), 탐색을 시작할 정점의 번호 V가 주어진다. 다음 M개의 줄에는 간선이 연결하는 두 정점의 번호가 주어진다. 어떤 두 정점 사이에 여러 개의 간선이 있을 수 있다. 입력으로 주어지는 간선은 양방향이다.
