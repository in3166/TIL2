// 백 트래킹
// n*n 체스판의 n개의 퀸이 서로를 공격못하는 경우의 수 (가로, 세로, 대각선 이동 가능)
function solution(n) {
  var answer = 0;
  let chk = Array.from({ length: n }, () => 0);

  function DFS(L) {
    if (L === n) {
      answer++;
      return;
    }
  }

  DFS(0);

  return answer;
}

console.log(solution(4)); //2

// HINT: 우선 한 행에 하나의 퀸만 있다고 전제하고 접근
// 1차원 배열로 각 행에 어디에 퀸이 있는지 저장
// (X, Y)의 대각선에 위치한 좌표 (A, B)는 반드시 X-A = Y-B를 만족
function solution2(n) {
  var answer = 0;
  let chk = Array.from({ length: n }, () => 0);

  function DFS(L) {
    if (L === n) {
      answer++;
      return;
    }
    for (let i = 0; i < n; i++) {
      // 열
      let flag = true;
      chk[L] = i + 1;
      for (let j = 0; j < L; j++) {
        // 이전 행들까지
        if (chk[j] === chk[L]) flag = false;
        if (Math.abs(L - j) === Math.abs(chk[L] - chk[j])) flag = false;
      }
      if (flag) {
        DFS(L + 1);
      }
    }
  }

  DFS(0);

  return answer;
}
