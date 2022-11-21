// 동전 교환: 여러 단위의 동전들 거슴름돈을 가장 적은 수의 동전으로 교환
// DFS (Cut Edge Tech)
function solution(m, arr) {
  let answer = Number.MAX_SAFE_INTEGER;
  let n = arr.length;
  arr.sort((a, b) => b - a);
  function DFS(L, sum) {
    // 동전 개수, 금액
    if (L > answer) return; // 기본 답보다 크면 갈필요가 없음.
    if (sum === m && answer > L) {
      answer = L;
      console.log(L, sum);
      return;
    } else if (sum > m) {
      return;
    }

    for (let i = 0; i < n; i++) {
      sum += arr[i];
      DFS(L + 1, sum);
      sum -= arr[i];
      //DFS(L+1, sum+ARR[i]) // 나오면 자동으로 빼기간 된다...
    }
  }

  DFS(0, 0);
  return answer;
}

let arr = [1, 2, 5];
let arr2 = [1, 3, 4];
console.log(solution(15, arr));
console.log(solution(6, arr2));

