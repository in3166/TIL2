// 섬나라 아일랜드(BFS)
// 1은 땅, 0은 바다, 몇 개의 섬이 있는가
function solution(board) {
  let answer = 0;
  let n = board.length;
  let chk = Array.from(Array(board.length), () =>
    Array.from({ length: board.length }, () => 0)
  );

  // BFS(0, 0);

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

//console.log(solution(arr));

// 8 방향 탐색은 동일하나 해당 인접 땅을 모두 queue에 넣는다.
function solution2(board) {
  let answer = 0;
  let n = board.length;
  // chk 안해줘도 0으로 초기화
  // 0 이면 안들어가면 됨
  let dx = [-1, -1, 0, 1, 1, 1, 0, -1];
  let dy = [0, 1, 1, 1, 0, -1, -1, -1];

  let queue = [];

  function BFS(x, y) {
    if (board[x][y] === 1) {
      board[x][y] = 0;

      for (let k = 0; k < 8; k++) {
        let nx = x + dx[k];
        let ny = y + dy[k];
        if (nx >= 0 && ny >= 0 && nx < n && ny < n && board[nx][ny] === 1)
          queue.push([nx, ny]);
      }
    }

    while (queue.length > 0) {
      let nt = queue.shift();
      BFS(nt[0], nt[1]);
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 1) {
        answer++;
        queue.push([i, j]);
        BFS(i, j);
      }
    }
  }

  return answer;
}

console.log(solution2(arr));

// 재귀 함수 없이
function solution3(board) {
  let answer = 0;
  let n = board.length;
  let dx = [-1, -1, 0, 1, 1, 1, 0, -1];
  let dy = [0, 1, 1, 1, 0, -1, -1, -1];

  let queue = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 1) {
        board[i][j] = 0;
        queue.push([i, j]);
        answer++;
        while (queue.length) {
          let [x, y] = queue.shift();
          for (let k = 0; k < 8; k++) {
            let nx = x + dx[k];
            let ny = y + dy[k];
            if (nx >= 0 && ny >= 0 && nx < n && ny < n && board[nx][ny] === 1) {
              board[nx][ny] = 0;
              queue.push([nx, ny]);
            }
          }
        }
      }
    }
  }
}
