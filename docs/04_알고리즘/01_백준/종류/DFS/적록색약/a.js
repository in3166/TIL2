const fs = require("fs");

const filePath = process.platform === "linux" ? "/dev/stdin" : "./in.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let n = +input.shift();
input = input.map((a) => a.split(""));
console.log(input);

let graph2 = input.slice().map((v) =>
  v.map((a) => {
    if (a === "G") return "R";
    return a;
  })
);
console.log(graph2);
let dx = [-1, 0, 0, 1];
let dy = [0, -1, 1, 0];
function DFS(x, y, g, char) {
  g[x][y] = 0;
  for (let i = 0; i < 4; i++) {
    let nx = x + dx[i];
    let ny = y + dy[i];
    if (
      nx >= 0 &&
      nx < g.length &&
      ny >= 0 &&
      ny < g.length &&
      g[nx][ny] === char
    ) {
      g = DFS(nx, ny, g, char);
    }
  }
  return g;
}
let count = 0;
let count2 = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (input[i][j] !== 0) {
      count += 1;
      input = DFS(i, j, input, input[i][j]);
    }
    if (graph2[i][j] !== 0) {
      count2 += 1;
      graph2 = DFS(i, j, graph2, graph2[i][j]);
    }
  }
}
console.log(count + " " + count2);
