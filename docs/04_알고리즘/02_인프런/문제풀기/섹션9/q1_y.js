// 경로탐색(DFS) - 인접행렬: 노드 개수가 적을 때
// 방향 그래프가 주어지면 1번 정점에서 N번 정점으로 가는 모든 경로의 가지 수 출력
function solution(n, arr) {
  let answer = 0;
  let chk = Array.from({ length: n + 1 }, () => 0);

  function DFS(v) {
    
    
  }

  DFS(1);
  return answer;
}


// 1->2, 1->3 ...
let arr4 = [
  [1, 2], [1, 3], [1, 4], [2, 1], [2, 3], [2, 5], 
  [3, 4], [4, 2], [4, 3], [4, 5], [5, 2], [5, 4],
];
















function solution(n, arr) {
  let answer = 0;
  let chk = Array.from({ length: n + 1 }, () => 0);

  function DFS(v) {
    console.log("v: ", v);
    if (v === n) {
      console.log(chk);
      answer++;
      return;
    }
    chk[v] = 1;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][0] === v && !chk[arr[i][1]]) {
        // chk[i] = 1;
        DFS(arr[i][1]);
        chk[arr[i][1]] = 0;
      }
    }
  }

  DFS(1);
  return answer;
}
// 1->2, 1->3 ...
let arr = [
  [1, 2],
  [1, 3],
  [1, 4],
  [2, 1],
  [2, 3],
  [2, 5],
  [3, 4],
  [4, 2],
  [4, 3],
  [4, 5],
  [5, 2],
  [5, 4],
];

//console.log(solution(5, arr));

// 인접 행렬
// 체크 배열 필요 순환때문
function solution2(n, arr) {
  let answer = 0;
  // n+1의 빈 배열
  let matrix = Array.from(Array(6), () => Array(6).fill(0));
  let chk = Array.from({ length: arr.length + 1 }, () => 0);

  console.log(matrix);

  for (const [a, b] of arr) {
    console.log(a, b);
    matrix[a][b] = 1;
  }

  console.log(matrix);
  let path = [];

  function DFS(L) {
    console.log("L: ", L, "path: ", path);
    if (L === n) {
      answer++;
      console.log("path: ", path);
      return;
    }

    for (let i = 1; i <= matrix.length; i++) {
      if (matrix[L][i] === 1 && chk[i] === 0) {
        chk[i] = 1;
        path.push(i);
        DFS(i);
        chk[i] = 0;
        path.pop();
      }
    }
  }
  
  chk[1] = 1;
  path.push(1);
  DFS(1);
  return answer;
}

//console.log(solution2(3, arr));
