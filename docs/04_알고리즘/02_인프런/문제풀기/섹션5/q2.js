// 공통 원소 구하기: 오름차순
function solution(arr1, arr2) {
  let answer = [];
  for (const i of arr1) {
    for (const j of arr2) {
      i == j && answer.push(i);
    }
  }
  return answer.sort();
}

// 투 포인터 알고리즘
function sol(arr1, arr2) {
  let answer = [];
  let n = arr1.length;
  let m = arr2.length;
  let p1 = p2 = 0;

  arr1 = arr1.sort((a, b) => a-b); // sort는 그냥 문자열로 변환 후 정렬한다. - 사전 순
  arr2 = arr2.sort((a, b) => a-b);

  console.log(arr1)
  console.log(arr2)
  while (p1 < n && p2 < m) {
    if (arr1[p1] == arr2[p2]) {
      answer.push(arr1[p1++]);
      p2++;
    }
    else if (arr1[p1] < arr2[p2]) p1++;
    else if(arr1[p1] > arr2[p2]) p2++;
  }
  return answer;
}

let a = [1, 3, 9, 5, 2];
let b = [3, 2, 5, 7, 8];
console.log(sol(a, b));
