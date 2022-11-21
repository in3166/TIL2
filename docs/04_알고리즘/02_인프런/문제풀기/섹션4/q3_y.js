// 완전 탐색 (블루투포스)
// 멘토링: M번의 수학 등수로 멘토와 멘티 정하기
// 멘토는 멘티보다 M벙의 수학 테스트에서 순위가 다 높아야한다.
// 멘토와 멘티가 짝이 될 수 있는 경우 몇가지? ,
function solution(test) {
  let answer = 0;

  let studentsNumber = test[0].length; // 학생 수
  let temp = [];
  for (let i = 0; i < test.length; i++) {
    for (let j = 0; j < test[0].length; j++) {
      for (let k = j; k < test[0].length; k++) {
        
      }
    }
    console.log(temp)
  }
  console.log(temp)
  return answer;
}

let arr = [
  [3, 4, 1, 2],
  [4, 3, 2, 1],
  [3, 1, 4, 2],
];
let arr2 = [
  [19, 15, 4, 17, 12, 18, 6, 3, 11, 14, 1, 8, 13, 9, 2, 20, 5, 16, 10, 7],
  [5, 20, 18, 17, 14, 11, 19, 3, 10, 16, 6, 8, 13, 9, 2, 12, 4, 7, 1, 15],
];
let arr3 = [
  [1, 2, 3, 4, 5],
  [5, 4, 3, 2, 1],
];

console.log(solution(arr));

// function solution(test) {
//   let answer = 0;
//   let zip = new Map();
//   for (let i = 0; i < test.length; i++) {
//     for (let j = 0; j < test[0].length - 1; j++) {
//       for (let a = j; a < test[0].length; a++) {
//         const element = test[i][j];
//         const element2 = test[i][a];
//         let str = String(element) + " " + String(element2);
//         console.log("str: ", str);
//         if (a > j) {
//           if (zip.has(str)) {
//             let val = zip.get(str);
//             // console.log("val: ", ++val);

//             zip.set(str, ++val);
//           } else {
//             zip.set(str, 0);
//           }
//         }
//       }
//     }
//   }
//   console.log("zip: ", zip);

//   //console.log(zip.values());
//   // console.log(zip.size);
//   let i = 0;
//   for (const a of zip) {
//     //console.log("i",++i)
//     //  console.log("a",a)
//     if (a[1] > 0) answer++;
//     else console.log("a", a[0], ++i);
//     // iterator === test.length-1 && answer++;
//   }
//   return answer;
// }

// let arr = [
//   [3, 4, 1, 2],
//   [4, 3, 2, 1],
//   [3, 1, 4, 2],
// ];
// let arr2 = [
//   [19, 15, 4, 17, 12, 18, 6, 3, 11, 14, 1, 8, 13, 9, 2, 20, 5, 16, 10, 7],
//   [5, 20, 18, 17, 14, 11, 19, 3, 10, 16, 6, 8, 13, 9, 2, 12, 4, 7, 1, 15],
// ];
// let arr3 = [
//   [1, 2, 3, 4, 5],
//   [5, 4, 3, 2, 1],
// ];
// //console.log(solution(arr));
// //console.log(solution(arr2));
// //console.log(solution(arr3));

function solution2(test) {
  let answer = 0;
  m = test.length;
  n = test[0].length;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      let cnt = 0; // 멘토, 멘티가 정해지면 모든 배열의 순위를 확인해서 
      for (let k = 0; k < m; k++) {
        let pi = pj = z = x = 0;
        for (let s = 0; s < n; s++) {
          if (test[k][s] === i) {
            pi = s;
            //z = test[k][s];
          }
          if (test[k][s] === j) {
            pj = s;
           // x = test[k][s];
          }
        }
        if (pi < pj) {
          cnt++;
        } else {
          (z = 0), (x = 0);
        }
      }
      if (cnt === m) {
        answer++;
        //console.log(z, x);
      }
    }
  }
  return answer;
}


// 3중
// 배열 안에서 특정 학생의 인덱스를 찾는 함수를 정의해줌
function findMyIndex(student, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === student) {
      return i;
    }
  }
}

function solution4(test) {
  const m = test.length;
  const n = test[0].length;
  
  let count = 0;
  const pairs = [];

  // 가능한 순서쌍을 pairs 배열에 모두 담아줌
  // [1, 1], [1, 2], ..., [4, 3], [4, 4]
  
  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < n + 1; j++) {
      pairs.push([i, j]);
    }
  }

  // pairs 배열을 돌며 멘토 - 멘티가 가능한 경우만 count
  for ([a, b] of pairs) {
    let isPossible = true;

    for (array of test) {
      if (findMyIndex(a, array) >= findMyIndex(b, array)) {
        isPossible = false;
        break;
      }
    }

    // 모든 test에 대한 검증이 끝난 이후에도 isPossible === true 라면 count
    if (isPossible) count++;
  }
  return count;
}