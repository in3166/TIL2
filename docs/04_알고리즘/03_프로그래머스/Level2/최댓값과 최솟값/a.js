function solution(s) {
  var answer = "";
  let a = s.split(" ").sort((a, b) => a - b);

  return `${a[0]} ${a[a.length - 1]}`;
}

console.log(solution("1 2 3 4")); //"1 4"
console.log(solution("-1 -2 -3 -4")); //"-4 -1"
console.log(solution("-1 -1")); //"-1 -1"
