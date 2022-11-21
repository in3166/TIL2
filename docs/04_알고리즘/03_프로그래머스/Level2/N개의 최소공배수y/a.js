function solution(arr) {
  var answer = 0;
  while (true) {
    

  }
  
  return answer;

}


// 런타임 에러
function solution2(arr) {
  var answer = 0;
  var min = Math.min(...arr);
  let chk = [];
  function DFS(L) {
    if (L <= 1) {
      answer = arr.reduce((a, b) => a * b);
      return;
    }
    let temp = [];
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      if (element % L === 0) {
        temp.push(element / L);
      }
    }
    if (temp.length !== arr.length) {
      DFS(min - 1);
    } else {
      temp.push(L);
      console.log(temp);
      answer = temp.reduce((a, b) => a * b);
      return;
    }
  }
  DFS(min);
  return answer;
}

console.log(solution([2, 6, 8, 14])); // 168
console.log(solution([1, 2, 3])); // 6
console.log(solution([3, 6, 12])); // 6
console.log(solution([2, 3, 4])); // 6
console.log(solution([14, 2, 7])); // 6

// 최소공배수는 모든 값의 곱 / 최대공약수
// 최대공약수는 a, b => a % b가 0이 나오는 수
