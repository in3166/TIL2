// DP
function solution(land) {
  var answer = 0;

  return answer;
}

console.log([[1,2,3,5],[5,6,7,8],[4,3,2,1]]) // 16





























// Hint
// 해당 행의 요소(열) 값은 이전 행에서 자신을 더한 것들 중 최대값으로 초기화한다.(자신의 열을 제외한 누적들 중)

// function solution2(land) {
//   var answer = 0;


// for (let row = 1; row < land.length; row++) {
//   for (let col = 0; col < land[0].length; col++) {
//     land[row][col] += Math.max(
//       ...land[row - 1].slice(0, col),
//       ...labd[row - 1].slice(col + 1)
//     );
//   }
// }
// return Math.max(...land[land.length - 1]);
// );
