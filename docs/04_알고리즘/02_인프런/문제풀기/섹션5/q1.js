// 두 배열 합치기: 오름차순으로 정렬된 두 배열이 주어지면 두 배열을 오름차순으로 합친다
function solution(arr1, arr2) {
  let answer = [];
  answer = [...arr1, ...arr2];
  return answer.sort(); // O(nlongn)
}

let a = [1, 3, 5];
let b = [2, 3, 6, 7, 9];
console.log(sol(a, b));

// 투 포인터 알고리즘 p1, p2
function sol(arr1, arr2) {
  let answer = [];
  let p1 = p2 = 0;
  let n=arr1.length;
  let m = arr2.length;
  while (p1 < n && p2 < m) {
    // O( N + M )
    if (arr1[p1] <= arr2[p2]) answer.push(arr1[p1++]);
    else answer.push(arr2[p2++]);
  }
  while (p1 < n) {answer.push(arr1[p1++]);}
  while (p2 < m) {answer.push(arr2[p2++]);}
  return answer;
}
