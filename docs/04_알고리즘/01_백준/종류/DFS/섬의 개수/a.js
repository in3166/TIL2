const fs = require("fs");

const filePath = process.platform === "linux" ? "/dev/stdin" : "./in.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

input = input.map((a) => a.split(" ").map((b) => +b));

// console.log("input: ", input);

let dx = [-1, -1, -1, 0, 0, 1, 1, 1];
let dy = [0, -1, 1, -1, 1, -1, 1, 0];

let head = 0;

function DFS(x, y, g) {
  g[x][y] = 0;
  let newG =g.slice();
  for (let i = 0; i < dx.length; i++) {
    let nx = x + dx[i];
    let ny = y + dy[i];
    if (
      nx >= 0 &&
      ny >= 0 &&
      nx < g.length &&
      ny < g[0].length &&
      g[nx][ny] === 1
    )
      newG = DFS(nx, ny, newG);
  }
  return newG;
}

for (let i = 0; i < input.length; i++) {
  let graph = [];
  if (i === head) {
    // console.log("head: ", head);
    // console.log(input[head]);
    let [n, m] = input[head];
    if(n===0&&m===0) break
    tail = head + input[head][1] + 1;

    for (let j = head + 1; j < tail; j++) {
      graph.push(input[j]);
    }
    let count = 0;

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        // console.log(graph);
        // console.log(i, j)
        if (graph[i][j] === 1) {
          count += 1;
          graph = DFS(i, j, graph);
        }
      }
    }
    console.log(count);
    head = tail;
  }
}
