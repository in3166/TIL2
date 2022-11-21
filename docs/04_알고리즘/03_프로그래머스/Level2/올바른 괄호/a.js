function solution(s) {
  var answer = true;
  let chk = [];
  for (let i = s.length - 1; i >= 0; i--) {
    let pop = chk.pop();
    if (!pop) chk.push(s[i]);
    else if (s[i] + pop === "()") continue;
    else chk.push(pop, s[i]);
  }

  return chk.length === 0;
}

// 시간 초과
function solution2(s) {
  var answer = true;
  let chk = true;
  while (chk) {
    let a = s.includes("()");
    console.log(a);
    if (a) {
      s = s.replace(/\(\)/gi, "");
      console.log(s);
    } else {
      chk = false;
    }
  }

  return s === "";
}

console.log(solution("()()"));
console.log(solution("(())()"));
console.log(solution(")()("));
console.log(solution("(()("));
