// 최대점수 구하기(냅색 알고리즘): n개의 문제, 얻는 점수와 시간 주어짐, 제한시간m 안에 n개의 문제중 최대 점수
function solution(m, arr) {
  let answer = 0;




  return answer;
}















let arr = [
  [10, 5],
  [25, 12],
  [15, 8],
  [6, 3],
  [7, 4],
];
//console.log(solution(20, arr)); //41






// DFS로는 OK => 어떻게 DYNAMIC이지???
function solution2(m, arr2) {
  let answer = 0;
  let dy = Array.from({ length: m + 1 }, () => 0);
  let ck = Array.from({ length: arr2.length }, () => 0);

  let time = 0;
  let temp = 0;


  function DFS(L) {
    if(L >= arr2.length) return;
    if(time <= m){
      answer = Math.max(answer, temp);
    }

    ck[L] = 1;
    time += arr2[L][1];
    temp += arr2[L][0];
    DFS(L+1);
    
    time -= arr2[L][1];
    temp -= arr2[L][0];
    ck[L] = 0;
    DFS(L+1);
  }

  DFS(0);

  return answer;
}
// 점수, 시간
let arr2 = [
  [10, 5],
  [25, 12],
  [15, 8],
  [6, 3],
  [7, 4],
];
console.log(solution2(20, arr2)); //41

// Answer ee
// 20분 동안 풀 수 있는 문제
// 20분부터(뒤에서 부터) 문제하나씩 추가하면서 가장 높은 점수를 입력

function solution3(m, arr) {
  let answer = 0;
  let dy = Array.from({ length: m + 1 }, () => 0); // 20분로 초기화 되어있음
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i][0];
    for (let j = m; j >= arr[i][1]; j--) {
      if(j-arr[i][1]>=0)
      dy[j] = Math.max(dy[j], dy[j-arr[i][1]]+element);
    }
  }
  console.log(dy)
  return answer;
}
// 점수, 시간
let arr3 = [
  [10, 5],
  [25, 12],
  [15, 8],
  [6, 3],
  [7, 4],
];
console.log(solution3(20, arr3)); //41
