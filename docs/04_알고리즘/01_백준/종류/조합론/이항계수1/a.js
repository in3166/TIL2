const fs = require("fs");

const filePath = process.platform === "linux" ? "/dev/stdin" : "./in.txt";
let input = fs.readFileSync(filePath).toString().trim().split(" ");
input = input.map(Number);
console.log(input);
