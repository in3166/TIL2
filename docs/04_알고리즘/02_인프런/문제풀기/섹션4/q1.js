// 완전 탐색 (블루투포스)
// 자릿수의 합: 최대
function solution(n, arr) {
  let answer,
    max = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < arr.length; i++) {
    let temp = 0;
    let ta = arr[i];
    console.log("ta: ", ta);
    while (ta) {
      console.log(i);
      console.log(ta % 10);
      temp += ta % 10;
      ta = Math.floor(ta / 10);
      console.log("ta2: ", ta);
      if (temp > max) {
        console.log("temp: ", temp);
        max = temp;
        answer = arr[i];
      } else if (temp == max && arr[i] > answer) {
        max = temp;
        answer = arr[i];
      }
    }
  }
  return answer;
}

let arr = [128, 460, 603, 40, 521, 137, 123, 237, 1236];

console.log(solution(7, arr));
