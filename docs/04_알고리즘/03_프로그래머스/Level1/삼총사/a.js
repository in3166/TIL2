function solution(number) {
  var answer = 0;
  var checkArray = Array.from({ length: number.length }, () => 0);
  function DFS(sum, L, c) {
    if (L >= 3) {
      console.log(checkArray, sum);
      if (sum === 0) answer += 1;
      return;
    }
    for (let i = c; i < number.length; i++) {
      // console.log("L: ", L, " i: ", i);
      if (checkArray[i] === 0) {
        // console.log("1: ", checkArray);
        checkArray[i] = 1;
        DFS(sum + number[i], L + 1, c + 1);
        checkArray[i] = 0;
      }
      // checkArray[i] = 0;
      // DFS(sum + number[i], L + 1);
    }
  }
  DFS(0, 0, 0);
  return answer;
}

console.log(solution([-2, 3, 0, 2, -5])); // 2
// console.log(solution([-3, -2, -1, 0, 1, 2, 3])); //5
// console.log(solution([-1, 1, -1, 1])); // 0
