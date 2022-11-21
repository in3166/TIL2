// 재귀로 풀면 스택 호출 초과 에러가 뜬다. => 메모리 많이 잡아먹어 반복문으로
function solution(n) {
  var answer = 0;
  let chk = Array.from({ length: n + 1 }, () => 0);

  function DFS(L) {
    console.log(L, chk[L]);
    if (L === 0) return 0;
    if (L === 1) return 1;
    if (chk[L] !== 0) return chk[L];
    chk[L] = (DFS(L - 1) + DFS(L - 2)) % 1234567;
    return chk[L];
  }

  answer = DFS(n);
  return answer;
}

function solution(n) {
  var ans = [0, 1];
  if (n <= 1) return ans[n];
  for (var i = 2; i < n + 1; i++) {
    ans.push((ans[i - 2] + ans[i - 1]) % 1234567);
  }
  return ans[n];
}

console.log(solution(3));
console.log(solution(5));
console.log(solution(9999));
