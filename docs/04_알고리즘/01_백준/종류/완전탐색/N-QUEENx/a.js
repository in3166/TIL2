const fs = require("fs");
// 대각선에 존재하는 퀸 찾기 !! => 체크는 분리하기
const filePath = process.platform === "linux" ? "/dev/stdin" : "./in.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
input = +input;
console.log(input);

let check = Array(input).fill(0);
let answer = 0;
let DFS = function (v) {
  if (v === input) {
    answer += 1;
    return;
  }

  for (let i = 0; i < input; i++) {
    // if (check[i]) continue;??
    let find = false;

    for (let k = 0; k < v; k++) {
      if (check[k] === i || Math.abs(k - v) === Math.abs(check[k] - i))
        find = true;
    }
    if (!find) {
      check[v] = i;
      DFS(v + 1);
    }
    check[v] = 0;
  }
};

DFS(0);


console.log(answer);











const sol = (input) => {
  // 조합 문제
  const visited = new Array(input).fill(0);
  let answer = 0;

  dfs(0);

  function dfs(x) {
    if (x === input) {
      answer += 1;
    } else {
      for (let i = 0; i < input; i++) {
        if (visited[x]) continue;
        visited[x] = i;
        if (check(x)) dfs(x + 1);
        visited[x] = 0;
      }
    }
  }

  function check(x) {
    for (let i = 0; i < x; i++) {
      if (visited[x] === visited[i]) return false;
      if (Math.abs(visited[x] - visited[i]) === x - i) return false;
    }
    return true;
  }

  return answer;
};

console.log("sol? ", sol(5));
