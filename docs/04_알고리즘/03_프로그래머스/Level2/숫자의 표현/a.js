// 슬라이딩 윈도우 => 연속된 자연수로 표현..
function solution(n) {
  var answer = 0;
  let lp = 1,
    rp = 2;
  let sum = lp + rp;
  if (n === 1 || n === 2) return answer;
  while (rp <= n) {
    console.log(lp, rp, sum);
    if (sum === n) {
      answer++;
      sum += ++rp;
    }
    if (sum < n) sum += ++rp;
    if (sum > n) sum -= lp++;
  }
  return answer;
}

console.log(solution(15)); // 4
