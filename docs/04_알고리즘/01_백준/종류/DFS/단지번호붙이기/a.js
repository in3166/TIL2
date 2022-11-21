const fs = require("fs");

const filePath = process.platform === "linux" ? "/dev/stdin" : "./in.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let n = +input.shift();

input = input.map((a) => a.split(""));
console.log(input);

for (let i = 0; i < input.length; i++) {
  input[i] = input[i].map((a) => +a);
}

let count = 0;

let dx = [-1, 0, 0, 1];
let dy = [0, 1, -1, 0];
let home = 1;
function DFS(x, y) {
  if (x >= n || y >= n || x < 0 || y < 0) return;
  if (input[x][y] === 1) {
    input[x][y] = 0;
    for (let i = 0; i < 4; i++) {
      let nx = dx[i] + x;
      let ny = dy[i] + y;
      if (nx >= 0 && nx < n && ny >= 0 && ny < n && input[nx][ny] === 1) {
        home++;
        DFS(nx, ny);
      }
    }
  }
}
let homes = [];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (input[i][j] === 1) {
      // console.log(input);
      home = 1;
      count++;
      DFS(i, j);
      homes.push(home);
    }
  }
}

console.log(count);
console.log(homes);
// homes.sort((a, b) => a - b).forEach((a) => console.log(a));
