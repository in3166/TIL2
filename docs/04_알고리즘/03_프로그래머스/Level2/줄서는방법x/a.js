// n은 최대 20이고 k는 최대 20! = 2432902008176640000 이다.
// 모든 순열을 구하면 시간 복잡도 x => k번째 순열만 구할 수 있는 방법을 알아야 한다.
function solution(n, k) {
  var answer = [];



  
  return answer;
}









// hint: facorial, 규칙성 찾기
function solution2(n, k) {
  var answer = [];
  let chk = Array.from({ length: n }, () => 0);
  let sortedArr = [];

  for (let i = 1; i < n + 1; i++) {
    sortedArr.push(i);
  }
  sortedArr.sort();

  let temp = [];

  function DFS(L) {
    if (answer.length >= k) {
      return;
    }
    if (L >= n) {
      answer.push(temp.slice());
      return;
    }

    for (let i = 0; i < chk.length; i++) {
      if (chk[i] === 0) {
        chk[i] = 1;
        temp.push(sortedArr[i]);
        DFS(L + 1);
        temp.pop();
        chk[i] = 0;
      }
    }
  }

  DFS(0);
  return answer[k - 1];
}

console.log(solution(3, 5)); // [3, 1, 2]
