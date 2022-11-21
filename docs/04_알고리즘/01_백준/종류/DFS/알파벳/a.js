// string includes는 시간 많이 걸림 => set을 사용 => count 안해주고 size 해주면 됨
// 방문했던 곳은 스킵
// const visited = Array(26).fill(false);
// visited[input[x][y].charCodeAt() - 65] = true;
// 위 처럼 하면 문자열 검색과 방문 기록을 한 번에 할 수 있음.
// 어차피 방문 했던 곳의 알파벳은 추가되어 있으므로 2차원 배열로 체크안해도..

// 4방향을 탐색할 때 위아래보다는 양옆을 먼저 이동하는
// 편이 속도가 더 빠르다는 사실이다. 그 이유는 2차원 데이터는 메모리에서는 1차원으로 저장되는데
// 위아래로 이동할 경우에는 더 많은 거리의 메모리로 이동해야 하는데 좌우일 경우에는 그냥 1을 이동하면 되기 때문이다.
const fs = require("fs");

const filePath = process.platform === "linux" ? "/dev/stdin" : "./in.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [n, m] = input
  .shift()
  .split(" ")
  .map((a) => +a);
input = input.map((a) => a.split(""));
console.log(input);
let string = new Set();

const dx = [0, 0, 1, -1];
const dy = [-1, 1, 0, 0];

let max = 1;

function DFS(x, y) {
  string.add(input[x][y]);
  max = Math.max(max, string.size);

  for (let i = 0; i < 4; i++) {
    let nx = x + dx[i];
    let ny = y + dy[i];
    console.log(nx, ny);
    if (nx >= 0 && nx < n && ny >= 0 && ny < m && !string.has(input[nx][ny])) {
      console.log(nx, ny, input[nx][ny]);
      DFS(nx, ny);
    }
  }
  string.delete(input[x][y]);
}

DFS(0, 0);
console.log(max);

// const fs = require("fs");

// const filePath = process.platform === "linux" ? "/dev/stdin" : "./in.txt";
// let input = fs.readFileSync(filePath).toString().trim().split("\n");

// let n = input[0].split(" ").map((a) => +a);
// input = input.slice(1).map((a) => a.split(""));
// console.log(input);
// console.log(n);

// const visited = Array(26).fill(false);

// let dx = [-1, 0, 0, 1];
// let dy = [0, -1, 1, 0];

// let count = 1;
// let max = 0;

// function DFS(x, y) {
//   max = count;
//   visited[input[x][y].charCodeAt() - 65] = true;
//   // console.log(x, y);
//   for (let i = 0; i < 4; i++) {
//     let nx = x + dx[i];
//     let ny = y + dy[i];
//     if (
//       nx >= 0 &&
//       nx < input.length &&
//       ny >= 0 &&
//       ny < input.length &&
//       !visited[input[nx][ny].charCodeAt() - 65]
//     ) {
//       count += 1;
//       // console.log("n: ", nx, ny, input[nx][ny]);
//       max = Math.max(max, DFS(nx, ny));
//       count -= 1;
//     }
//   }
//   visited[input[x][y].charCodeAt() - 65] = false;
//   return max;
// }

// DFS(0, 0);
// console.log(count, max);
