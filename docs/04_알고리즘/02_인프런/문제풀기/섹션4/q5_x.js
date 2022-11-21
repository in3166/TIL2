// 완전 탐색 (블루투포스)
// k번째 큰 수 (1-100 사이 자연수  N장의 카드, 3장 을뽑아 합한 값을 기록)
// 3중 루프로 함 해보기
function solution(n, k, arr) {
  let answer;
  


  
  return answer;
}


let arr2 = [13, 15, 34, 23, 45, 65, 33, 11, 26, 42];
console.log(solution(10, 3, arr2));














// 4차로 품
function solution3(n, k, arr) {
  let answer;
  let temp = [];

  for (let i = 0; i < arr.length-2; i++) {
    for (let j = i+1; j < arr.length-1; j++) {
      for (let k = j+1; k < arr.length; k++) {
        if(temp.indexOf(arr[i]+arr[j]+arr[k]) === -1 && arr[i] !== arr[j] !== arr[k]){

          temp.push(arr[i]+arr[j]+arr[k]);
          console.log(arr[i], arr[j], arr[k]);
        }
        
      }
    }
  }
  temp.sort((a, b)=> b-a);
  console.log(temp)
  console.log(temp[k-1])



  
  return answer;
}


console.log(solution3(10, 3, arr2));
//console.log(solution(9, 1, [5, 5, 5, 4, 4, 3, 3, 2, 1]));













function solution2(n, k, arr) {
  let answer;
  let chosen = new Set();

  // chosen.push(solve(chosen, 0, 0, card));
  for (let i = 0; i < n - 2; i++) {
    for (let j = i + 1; j < n - 1; j++) {
      for (let x = j + 1; x < n; x++) {
        const sum = arr[i] + arr[j] + arr[x];
        chosen.add(sum);
      }
    }
  }
  // console.log(chosen)
  chosen = Array.from(chosen).sort((a, b) => b - a);
  return chosen[k - 1];
}

let arr = [13, 15, 34, 23, 45, 65, 33, 11, 26, 42];
//console.log(solution(10, 3, arr));
//console.log(solution(9, 1, [5, 5, 5, 4, 4, 3, 3, 2, 1]));


function solve(chosen, cur, cnt, card) {
  if (cnt === 3) {
    console.log(chosen);
    let sum = 0;
    for (let i = 0; i < 3; i++) {
      sum += chosen[i];
    }
    return sum;
  }

  for (let i = cur; i < card.length; i++) {
    chosen[cnt] = card[i];
    solve(chosen, cur + 1, cnt + 1, card);
  }
}

