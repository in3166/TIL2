function solution(n) {
  var answer = [];

  function Hanoi(n, from, bojo, to) {
    if (n === 1) {
      answer.push([from, to]);
      return;
    }
    Hanoi(n - 1, from, to, bojo);
    answer.push([from, to]);
    // 제일 큰게 목적지로
    Hanoi(n - 1, bojo, from, to);
  }
  Hanoi(n, 1, 2, 3);
  return answer;
}

console.log(solution(2)); // [ [1,2], [1,3], [2,3] ]

// 재귀적으로 생각하기
// 3개를 다 c축으로 옮기려면 2개를 B축으로 옮겨야 한다.
// 그럼 1개를 먼저 C축으로 옮겨야한다.
// n개를 from에서 to로 보조기둥을 사용하여
