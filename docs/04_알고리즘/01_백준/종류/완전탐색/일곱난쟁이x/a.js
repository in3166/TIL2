const fs = require("fs");

const filePath = process.platform === "linux" ? "/dev/stdin" : "./in.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
input = input.map(Number);
// let sum = input.reduce((prev, cur) => prev + cur, 0);
// let arr;
// for (let i = 0; i < 8; i++) {
//   for (let j = i + 1; j < 9; j++) {
//     if (sum === input[i] + input[j] + 100) {
//       arr = input.filter((item) => item !== input[i] && item !== input[j]);
//       break;
//     }
//   }
//   if (!!arr) break;
// }
// arr.sort((a, b) => a - b);
// for (let i = 0; i < arr.length; i++) {
//   console.log(arr[i]);
// }

//// DFS

let temp = []; // // 7 난쟁이 목록
let find = false; //// 찾음 여부

let dfs = function (depth) {
  // 답을 찾았으면 바로 종료
  if (find) return;
  // 7 난쟁이를 다 선택했다면
  if (depth == 7) {
    // 키의 합이 100이면
    if (temp.reduce((prev, cur) => prev + cur, 0) === 100) {
      for (i of temp) {
        console.log(i);
      }
      find = true; // 찾음으로 변경
    }
    return;
  }
  // 7 난쟁이를 다 선택하지 않았다면
  // depth 이후 값의 범위에서 선택
  for (let i = depth; i < input.length; i++) {
    // 선택하지 않았던 수라면
    if (temp.indexOf(input[i]) === -1) {
      temp.push(input[i]);
      dfs(depth + 1);
      temp.pop();
    }
  }
};

dfs(0);
