const fs = require("fs");

const filePath = process.platform === "linux" ? "/dev/stdin" : "./in.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let t = input.shift();
input = input.map((a) => +a);
console.log(input);
let dp0 = "1 0";
let dp1 = "0 1";
let dp2 = "1 1";

for (let i = 0; i < t; i++) {
  let a = input[i];
  switch (a) {
    case 0:
      console.log(dp0);
      break;
    case 1:
      console.log(dp1);
      break;
    case 2:
      console.log(dp2);
      break;
    default:
      let dp = Array(a).fill("");
      for (let j = 3; j <= a; j++) {
        dp[0] = dp0;
        dp[1] = dp1;
        dp[2] = dp2;
        dpx = dp[j - 1].split(" ");
        dpy = dp[j - 2].split(" ");
        dp[j] =
          Number(Number(dpx[0]) + Number(dpy[0])) +
          " " +
          Number(Number(dpx[1]) + Number(dpy[1]));
      }
      console.log(dp);
      console.log(dp[a]);
      break;
  }
}
