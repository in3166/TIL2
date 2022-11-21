// 쇠 막대기 절단
// 위에 있는 쇠 막대기는 밑에 쇠막대기보다 짧다. 끝점은 겹치지 않는다. 레이저는 어떤 끝점과도 겹치지 않는다.
// 하나 자리는 못자름
function solution11(s) {
  let answer;

  const queue = [];

  for (let i = 0; i < s.length; i++) {
    console.log(s[i])
  }


  return answer;
}

console.log(solution11("()(((()())(())()))(())")); //17
//console.log(solution11('(((()(()()))(())()))(()())'));  //24


















function solution(s) {
  let answer;
  console.log(s);
  let stack = [];
  let stacknum = [];
  let laser = 0;
  let stick = 0;
  let chk = false;
  for (const x of s) {
    if (x === ")" && chk) {
      stack.pop();
      laser++;
      chk = false;
    } else if (x === ")" && !chk) {
      answer += laser + 1;
      stick--;
    } else {
      stack.push(x);
      stick++;
      chk = true;
    }
  }
  return answer;
}

//console.log(solution2("()(((()())(())()))(())")); //17
//console.log(solution2('(((()(()()))(())()))(()())'));  //24
// 멍청이

// idea: stack 들어간 개수를 새기 -> '세로'로 샌다!!
// 닫을 때 스택에 있는 개수를 가져오면 세로의 분해된 개수!!
function solution2(s) {
  let answer = 0;
  let stack = [];
  let isLaser = false;

  for (const x of s) {
    console.log(x)
    if (x === ")" && isLaser) {
      stack.pop();
      isLaser = false;
      console.log(stack.length)
      answer += stack.length;
    } else if (x === ")" && !isLaser){
      stack.pop();
      answer += 1;
    }else {
      stack.push("(");
      isLaser = true;
    }
  }
  return answer;
}

