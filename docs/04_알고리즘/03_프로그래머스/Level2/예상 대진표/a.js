// 게임 찾가자 수, 참가자 a,b -> 언제 만날까
// 1-2 => 1, 3-4 => 2 ...

function solution(n, a, b) {
  var answer = 0;
  if (a > b) {
    let temp = a;
    a = b;
    b = temp;
  }
  while (true) {
    answer += 1;
    if (b % 2 === 0 && a + 1 === b) {
      console.log(a, b);
      return answer;
    }
    a = Math.ceil(a / 2);
    b = Math.ceil(b / 2);
    console.log(n);
  }

  return answer;
}

console.log(solution(8, 4, 7)); //3

//
function solution(n, a, b) {
  let answer = 0;
  while (a !== b) {
    a = Math.ceil(a / 2);
    b = Math.ceil(b / 2);
    answer++;
  }

  return answer;
}
