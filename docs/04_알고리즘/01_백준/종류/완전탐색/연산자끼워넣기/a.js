const fs = require("fs");

const filePath = process.platform === "linux" ? "/dev/stdin" : "./in.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
let n = +input.shift();
input = input.map((a) => a.split(" ").map(Number));

function calculater(a, b, option) {
  switch (option) {
    case 0:
      return a + b;
      break;
    case 1:
      return a - b;
      break;
    case 2:
      return a * b;
      break;
    case 3:
      return a >= 0 ? Math.floor(a / b) : -Math.floor(-a / b);
      break;

    default:
      break;
  }
}

console.log(input);

let check = [];
let sum = input[0][0];
function DFS(v) {
  if (v === n) {
    // if (sum < min) min = sum;
    // else if (sum > max) max = sum;
    console.log("sum ", sum);
    check.push(sum);
  }

  for (let i = 0; i < 4; i++) {
    if (input[1][i] === 0) continue;
    input[1][i] -= 1;
    let tempSum = sum;
    console.log(sum, input[0][v], i);
    let result = calculater(sum, input[0][v], i);
    // console.log(result);
    sum = result;
    DFS(v + 1);
    sum = tempSum;
    input[1][i] += 1;
  }
}

DFS(1);
let min = Math.min(...check);
let max = Math.max(...check);
console.log(Math.max(...check) === 0 ? 0 : Math.max(...check));
console.log(Math.min(...check) === 0 ? 0 : Math.min(...check));
