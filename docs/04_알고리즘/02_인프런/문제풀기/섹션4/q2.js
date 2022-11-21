// 완전 탐색 (블루투포스)
// 뒤집은 소수: 수를 뒤집고 소수이면 출력
// 효율??
function solution(arr) {
  let answer = [];
  for (let i = 0; i < arr.length; i++) {
    let el = String(arr[i]);
    el = el.split("").reverse().join("");
    el = parseInt(el);
    let chk = true;
    for (let j = 2; j < el / 2; j++) {
      console.log(`${el}%${j}=${el % j}`);
      if (el == 1 || el % j == 0) {
        chk = false;
        break;
      }
    }
    if (chk && el != 1) answer.push(el);
  }
  return answer;
}

let arr = [32, 55, 62, 20, 250, 370, 200, 30, 100, 9731];
console.log(solution(arr));

// 숫자로 풀기
function solution2(arr) {
  let answer = [];
  for (const x of arr) {
    let res = 0;
    while (x) {
      let t = x % 10;
      res = res * 10 + t;
      x = parseInt(x / 10);
    }
    if (isPrime(res)) {
      answer.push(res);
    }
  }
  return answer;
}

function isPrime(n) {
  if (n == 1) return false;
  for (let i = 2; i < n/2; i++) {
    if(n%i ===0) return false;
  }
  return true;
}
