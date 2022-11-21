// 알파벳 연달아 2개 제거
// 모두 성공적 제거 => 1 아니면 0

// 이중 루프
// 시간 초과
function solution3(s) {
  var answer = 0;
  let chk = true;
  let temp = s.split("");
  while (chk && temp.length > 0) {
    console.log("1");
    let kk = false;
    for (let i = 0; i < temp.length; i++) {
      console.log(i, temp[i], temp[i + 1]);
      if (temp[i] === temp[i + 1]) {
        temp.splice(i, 2);
        console.log(temp);
        kk = true;
        break;
      }
    }
    if (!kk) chk = false;
    console.log("2");
  }

  if (temp.length === 0) answer = 1;

  return answer;
}

// reduce
// 시간초과 조금 나아졌지만..;
function solution4(s) {
  let temp = s.split("");

  temp = temp.reduce((prev, cur) => {
    let lastPrev = prev.pop();
    if (!lastPrev) return [cur];
    if (lastPrev === cur) return prev;
    else return [...prev, lastPrev, cur];
  }, []);
  console.log(temp);

  return temp.length === 0 ? 1 : 0;
}


// ! stack
function solution(s) {
  var answer = 0;
  let temp = [s[0]];
  for (let i = 1; i < s.length; i++) {
    console.log(temp);
    let pop = temp.pop();
    if (pop) {
      console.log(temp, pop, s[i], i);
      if (pop !== s[i]) {
        temp.push(pop, s[i]);
      }
    } else if (i !== 1 && !pop) {
      temp.push(s[i]);
    }

    // 완전 간단하게 아래로 
    // if( val === res[res.length -1]){
    //     res.pop() 
    // } else { res.push(val)}
  }

  if (temp.length === 0) answer = 1;
  return answer;
}

console.log(solution("baabaa")); // 1
console.log(solution("cdcd")); // 0
