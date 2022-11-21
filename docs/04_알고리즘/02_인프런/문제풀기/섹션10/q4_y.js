// 동전 교환: 거스름돈 가장 적은 수의 동전 교한 (동전 종류 1 <= n <= 12)
// 냅색 알고리즘: 가방 문제 - DFS로 가능하지만 범위가 커지면 오래 걸림

function solution(m, coin) {
  let answer = 0;

  return answer;
}

let arr = [1, 2, 5];
console.log(solution(15, arr)); // 3
















function solution2(m, coin) {
  let answer = 0;
  let dy = Array.from({ length: m + 1 }, () => 1000);
  dy[0] = 0;
  dy[1] = 1;
  for (let i = 0; i < coin.length; i++) { // 동전의 종류: 각 동전의 종류를 하나씩은 쓴다고 가정: dy[j - coin[i]] + 1
      for (let j = coin[i]; j < m+1; j++) {
          if(dy[j] > dy[j-coin[i]]+1)
          dy[j] = dy[j-coin[i]]+1;
          
      }
      
  }
console.log(dy)
  return dy[m];
}

let arr2 = [5, 1, 2];
console.log(solution2(15, arr2)); // 3
// dy: 큰 숫자로 초기화, I금액을 거슬러주는데 사용된 최소 동전의 개수
