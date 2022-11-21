// 2진수의 1의 갯수가 같다.

// 효율성 x
function solution2(n) {
  var answer = 0;
  let one = n.toString(2).replaceAll("0", "").length;

  while (n <= 1000000) {
    console.log(n);
    n++;
    let a = n.toString(2).replaceAll("0", "").length;
    if (one === a) break;
  }

  return n;
}

function solution(n) {
  var answer = 0;
  let one = n.toString(2).split("");

  for (let i = 0; i < one.length; i++) {
    const element = one[i];
    if (element === "1") answer++;
  }

  while (n <= 1000000) {
    console.log(n);
    n++;
    let a = n.toString(2);
    let count = 0;

    for (let i = 0; i < a.length; i++) {
      const element = a[i];
      if (element === "1") count++;
    }

    if (answer === count) return n;
  }
}

//

2;
3;
4;
function solution(n, a = n + 1) {
  return n.toString(2).match(/1/g).length == a.toString(2).match(/1/g).length
    ? a
    : solution(n, a + 1);
}

console.log(solution(78)); // 83
console.log(solution(15)); // 23
console.log("1010101".replace(/0/gi, ""));
console.log(10 & 5)