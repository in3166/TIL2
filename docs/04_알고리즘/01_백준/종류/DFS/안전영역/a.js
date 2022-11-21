const fs = require("fs");

const filePath = process.platform === "linux" ? "/dev/stdin" : "./in.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let n = +input.shift();
input = input.map((a) => a.split(" ").map((b) => +b));

let max = Math.max(...input.flat());
let example = [];
for (let index = 0; index < max; index++) {
  const temp = input.map((b) =>
    b.map((a) => {
      if (a <= index) return 0;
      return a;
    })
  );
  example.push(temp);
}
// console.log(input, max);
// console.log(example);

let dx = [-1, 0, 0, 1];
let dy = [0, -1, 1, 0];

function DFS(x, y, g) {
  g[x][y] = 0;
  // console.log(x, y);
  for (let i = 0; i < 4; i++) {
    let nx = x + dx[i];
    let ny = y + dy[i];
    // console.log('n: ',nx, ny);
    if (
      nx >= 0 &&
      nx < input.length &&
      ny >= 0 &&
      ny < input.length &&
      g[nx][ny] !== 0
    ) {
      DFS(nx, ny, g);
    }
  }
  return g;
}
let countMax = 0;
for (let k = 0; k < example.length; k++) {
  let tempGraph = example[k];
  console.log(tempGraph);
  let count = 0;
  console.log("k: ", k, count);
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      if (tempGraph[i][j] !== 0) {
        count += 1;
        tempGraph = DFS(i, j, tempGraph);
        // console.log("temp: ", tempGraph);
      }
    }
  }
  console.log("count: ", count);
  if (count > countMax) countMax = count;
}

console.log(countMax);
