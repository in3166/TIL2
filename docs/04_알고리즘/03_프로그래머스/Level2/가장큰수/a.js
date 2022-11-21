// 조합해서 얻을 수 있는 최고 수 찾기 - 순열은 메모리 큼
function solution(numbers) {
  var answer = "";
  numbers.sort((a, b) => {
    let aa = a.toString();
    let bb = b.toString();
    return aa + bb < bb + aa ? 1 : -1;
  });

  console.log(Number(numbers.join("")));

  return parseInt(numbers.join("")).toString();
}

console.log(solution([6, 10, 2])); // "6210"
console.log(solution([3, 30, 34, 5, 9])); // "9534330"
console.log(solution([232, 23])); // "9534330"
console.log(solution([104, 1])); // "9534330"
console.log(solution([0, 0, 0, 0])); // "9534330"
