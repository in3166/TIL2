// 섬나라 아일랜드(DFS)
// 1은 땅, 0은 바다, 몇 개의 섬이 있는가 (대각선 연결도 허용)
function solution(board) {
  let answer = 0;
  let len1 = board[0].length;
  let len2 = board.length;

  return answer;
}

let arr = [
  [1, 1, 0, 0, 0, 1, 0],
  [0, 1, 1, 0, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 0, 0],
  [1, 0, 0, 0, 1, 0, 0],
  [1, 0, 1, 0, 1, 0, 0],
];

//console.log(solution(arr2));

// 하나씩 탐색해서 8방으로 탐색하여 1이 있는 곳으로 이동
// 재귀 몇번 호출했는지 체크
function solution2(board) {
  let answer = 0;
  let n = board.length;

  let visited = Array.from(Array(board.length), () =>
    Array.from({ length: board.length }, () => 0)
  );
  let chk = false;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < board[0].length; j++) {
      chk = false;
      if (visited[j][i] === 1) continue;
      DFS(j, i);
      visited[j][i] = 1;
      if (chk) {
        answer++;
      }
    }
  }

  function DFS(x, y) {
    if (visited[x][y] === 1) return;
    console.log("DFS 돈다"); // 49번
    visited[x][y] = 1;
    if (board[x][y] === 1) {
      chk = true;
      board[x][y] = 0;
      let loop = [
        [x - 1, y],
        [x - 1, y - 1],
        [x - 1, y + 1],
        [x, y - 1],
        [x, y + 1],
        [x + 1, y + 1],
        [x + 1, y],
        [x + 1, y - 1],
      ];

      for (const v of loop) {
        if (
          v[0] >= 0 &&
          v[1] >= 0 &&
          v[0] < board[0].length &&
          v[1] < n &&
          visited[v[0]][v[1]] === 0 &&
          board[v[0]][v[1]] === 1
        ) {
          DFS(v[0], v[1]);
        }
      }
    } else {
      return;
    }
  }

  return answer;
}

console.log(solution2(arr));

function solution3(board) {
  let answer = 0;
  let n = board.length;
  let dx = [-1, -1, 0, 1, 1, 1, 0, -1];
  let dy = [0, 1, 1, 1, 0, -1, -1, -1];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if(board[i][j]===1){
        answer++;
        DFS(i, j);
      }
    }
  }

  function DFS(x, y) {
    board[x][y] = 0;
    for (let k = 0; k < 8; k++) {
      let nx = x + dx[k];
      let ny = y + dy[k];
      if(nx>=0 && nx <n && ny >=0 && vy <n && board[nx][ny]===1){
        DFS(nx, ny);
      }
    }
  }
  return answer;
}

console.log(solution3(arr));
