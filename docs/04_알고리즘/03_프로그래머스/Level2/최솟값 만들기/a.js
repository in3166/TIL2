// A, B에서 한 수를 뽑아 곲한다. 배열의 길이만큼 반복
// 곱한 값을 누적, 그 값이 최소가 되도록

// 공식? sort
function solution(A, B) {
  var answer = 0;
  A.sort((a, b) => a - b);
  B.sort((a, b) => a - b);
  for (let i = 0; i < A.length; i++) {
    answer += A[i] * B[A.length - 1 - i];
  }
  return answer;
}
//  B.sort((a, b) => b - a)
// return A.reduce((total, val, idx) => total + val * B[idx], 0)

// 시간 초과
function solution2(A, B) {
  var answer = Number.MAX_SAFE_INTEGER;
  let chkB = Array.from({ length: A.length }, () => 0);

  function DFS(L, sum) {
    if (L >= A.length) {
      console.log("sum: ", sum);
      answer = Math.min(sum, answer);
      return;
    }

    for (let i = 0; i < A.length; i++) {
      if (chkB[i] !== 1) {
        chkB[i] = 1;
        console.log(A[L], B[i]);
        DFS(L + 1, sum + B[i] * A[L]);
        chkB[i] = 0;
      }
    }
  }
  DFS(0, 0);
  return answer;
}

console.log(solution([1, 4, 2], [5, 4, 4])); // 29
console.log(solution([1, 2], [3, 4])); // 10
