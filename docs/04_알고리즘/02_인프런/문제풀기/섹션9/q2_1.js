// 경로탐색(인접리스트)
function solution(n, arr) {
  let answer = 0;
  let chk = Array.from({ length: arr.length + 1 }, () => 0);
  function DFS(v) {
    if (v === n) {
      answer++;
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][0] === v && !chk[arr[i][1]]) {
        chk[arr[i][1]] = 1;
        DFS(arr[i][1]);
        chk[arr[i][1]] = 0;
      }
    }
  }
  chk[1] = 1;
  DFS(1);
  return answer;
}

let arr = [
  [1, 2],
  [1, 3],
  [1, 4],
  [2, 1],
  [2, 3],
  [2, 5],
  [3, 4],
  [4, 2],
  [4, 5],
];

console.log(solution(4, arr));

// 인접 리스트? => 1행은 1이 갈 수 있는 정점으로 초기화 (len:3 / 2, 3, 4) ...
// g[v].length / v=1 이면 3번만 돌면 된다.

function solution2(n, arr) {
  let answer = 0;
  let chk = Array.from({ length: n + 1 }, () => 0);
  let graph = Array.from(Array(n + 1), () => Array());
  let path = [];

  for (const [a, b] of arr) {
    graph[a].push(b);
  }

  console.log(graph);

  function DFS(v) {
    if (v === n) {
      answer++;
      console.log(path)
      return;
    }

    for (let i = 0; i < graph[v].length; i++) {
      if (!chk[graph[v][i]]) {
        chk[graph[v][i]] = 1;
        path.push(graph[v][i]);
        DFS(graph[v][i]);
        path.pop();
        chk[graph[v][i]] = 0;
      }
    }
  }

  chk[1] = 1;
  path.push(1);
  DFS(1);
  return answer;
}
console.log(solution2(5, arr));
