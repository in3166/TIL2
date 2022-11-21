// 연속 부분수열2: m 이하가 되는 연속부분수열의 합 몇 번인가
function solution(m, arr){
    let answer=0;
    // 3중 loop shit => two pointer 다시!
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if(j+i < arr.length){
          let k =0
          let sum = 0;
          while (1) {
            sum += arr[j+k];
            if(k>=i) break;         
            k++;   
          }
          if(sum <=m)answer++;
          sum=0;
        }
      }
    }




    
    return answer;
}

let a1=[1, 3, 1, 2, 3];
console.log(solution(5, a1));























// function solution6(m, arr){
//     let answer=0, sum=arr[0], lt=0;
//     let p1=0, p2=0;
//     while (1) {
//         p2 = p1 + lt;
//         if(lt === arr.length) break;
//         if(p1 >= arr.length-1-lt) {
//             // lt++; p1=0; p2 = p1 + lt; sum=0; 
//             // for (let i = 0; i < lt; i++) {
//             //     sum += arr[i];
//             // }
//         }
//         else if(sum <= m){
//             answer++;
//             sum += (arr[++p2]-arr[p1++]);
//         }else if(sum > m){
//             sum += (arr[++p2]-arr[p1++]);
//         }
//     }
//     return answer;
// }

// let a=[1, 3, 1, 2, 3];
// console.log(solution(5, a));


// let a = [10, 5, 2, 6];

// //console.log(solution(100, a));


// // 반복문 하나로
function solution2(m, arr) {
  let answer = 0;
  let li = 0;
  let ri = 0;
  let sum = arr[ri];

  while (ri < arr.length) {
    if (sum <= m) {
      answer += ri - li + 1; // ri-li+1: 연속부분수열 갯수를 구할수 있음  [1] -> 1 => [1, 3] -> 3 / 13 => [1, 3, 1*] -> 1*  / 31 / 131   => [(1) (3) 1 2] -> 2 / 12

      ri++;

      sum += arr[ri];
    } else {
      sum -= arr[li];

      li++;
    }
  }

  return answer;
}

// 다른 풀이
function solution3(m, arr){
  let answer=0, lt = 0, rt = 0;                
  let n = arr.length;
  let sum = 0;
  while(lt < n) {
    sum += arr[rt]; 
    if(isNaN(sum) || sum > m || rt >= n) {
      sum = 0;
      lt++;
      rt = lt; // 앞에서 부터 차례대로
    } else if (sum <= m) {
      answer++;
      rt++;
    } 
  } 
  return answer;
}