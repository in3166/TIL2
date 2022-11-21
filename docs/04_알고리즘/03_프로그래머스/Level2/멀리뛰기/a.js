// 1칸, 2칸을 뛸 수 있다. 끝에 도달할 방법의 수
function solution(n) {
  let dy = Array.from({ length: n + 1 }, () => 0);
  var answer = 0;
  dy[1] = 1;
  dy[2] = 2;
  function DYN(L) {
    if (L === 1) return 1;
    if (L === 2) return 2;
    if (dy[L] !== 0) return dy[L]; // 없으면 시간 초과
    dy[L] = (DYN(L - 1) + DYN(L - 2))% 1234567;
    return dy[L];
  }

  // for (let i = 3; i <= n; i++) {
  //   dy[i] = (dy[i - 1] + dy[i - 2]) % 1234567;
  // }

  console.log(DYN(n));
  answer = DYN(n);
  return answer % 1234567;
}

console.log(solution(2000)); // 5
console.log(solution(4)); // 5
console.log(solution(3)); // 3
console.log(solution(2)); // 3
console.log(solution(1)); // 3
