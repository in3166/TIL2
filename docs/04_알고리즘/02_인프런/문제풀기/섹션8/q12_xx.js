// 조합수 메모이제이션: 
// 만약 {1, 2, 3, 4, 5} 에서 3개를 뽑을 때
// 조합 공식: 
// 2차원 배열 만들기: 

function solution(n, r) {
  let answer;

  let memo = Array.from(Array(n+1), () => Array(r+1).fill(0));


  function DFS(n, r) {
    if(memo[n][r]>0) return memo[n][r];
    if(n===r || r ===0) return 1;
    else return memo[n][r] = DFS(n-1,r-1) + DFS(n-1,r);



  }
  
  answer = DFS(n, r);

  return answer;
}

console.log(solution(33, 19));







// 사용: nCr = n-1Cr-1 + n-1Cr
// 만약 {1, 2, 3, 4, 5} 에서 3개를 뽑을 때

// 5의 입장에선 뽑힌 3개 중 자신이 들어가는 경우와 아닌 경우로 나눌 쑤 있다
// 즉, {5, x, x}, {x, x, x} 그래서, 자신이 뽑힌 경우 나머지 4개 중 2개를 뽑아야하고, 안 뽑힌 경우 나머지 4개 중 3개를 뽑는 경우가 생긴다.
// r: 뽑는 경우가 0이거나, n = r 이면(3개중 3개 뽑기)는 1개의 경우의 수만 있으므로 1로 설정
// (2,1) = (1,0) + (1,1) = 2
// 메모이제이션: 수가 커지면 엄청 오래 걸림 -> 저장 (2차원 배열 사용)

function solution2(n, r) {
  let answer; // 행 크기, 열번호.초기화  == Array(n + 1).fill(Array(n + 1).fill(0));
  let memo = Array.from(Array(n+1), () => Array(r+1).fill(0));
     // === Array(n + 1).fill(Array(n + 1).fill(0)); 얕은 복사?

  function DFS(n, r) {
    if(memo[n][r] > 0) return memo[n][r];

    if(r === 0 || n === r) {
      return 1;
    } else {
      return (memo[n][r] = DFS(n - 1, r - 1) + DFS(n - 1, r));
    }
  }

  answer = DFS(n, r);
  return answer;
}

console.log(solution2(33, 19));