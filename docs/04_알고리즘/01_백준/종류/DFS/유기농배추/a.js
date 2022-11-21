const fs = require("fs");

const filePath = process.platform === "linux" ? "/dev/stdin" : "./in.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let t = +input.shift();
input = input.map((a) => a.split(" "));

console.log("input: ", input);
let index = [];
for (let i = 0; i < input.length; i++) {
  input[i] = input[i].map((a) => +a);
  if (input[i].length === 3) index.push(i);
}

function divideArray(data) {
  let index = [];
  let array = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].length === 3) index.push(i);
  }
  console.log(index);
  for (let i = 0; i < index.length; i++) {
    let end = index[i + 1] || undefined;
    console.log("end: ", end);
    console.log("data: ", data);
    array.push(data.slice(index[i], end));
  }
  return array;
}

let diviedArray = divideArray(input);
console.log("diviedArray:", diviedArray);

let dx = [-1, 0, 0, 1];
let dy = [0, -1, 1, 0];

for (let i = 0; i < diviedArray.length; i++) {
  let temp = diviedArray[i];
  let info = temp.shift();
  let ground = Array.from(Array(info[0]), () => Array(info[1]).fill(0));
  let count = 0;
  console.log(temp);
  for (let j = 0; j < temp.length; j++) {
    ground[temp[j][0]][temp[j][1]] = 1;
  }

  console.log(ground);

  for (let j = 0; j < ground.length; j++) {
    for (let k = 0; k < ground[j].length; k++) {
      let queue = [];
      if (ground[j][k] === 1) {
        ground[j][k] = 0;
        count += 1;
        queue.push([j, k]);
        while (queue.length) {
          let cur = queue.shift();
          for (let k = 0; k < 4; k++) {
            let nx = cur[0] + dx[k];
            let ny = cur[1] + dy[k];
            if (
              nx < 0 ||
              ny < 0 ||
              nx >= ground.length ||
              ny >= ground[j].length
            )
              continue;
            if (ground[nx][ny] === 1) {
              ground[nx][ny] = 0;
              queue.push([nx, ny]);
            }
          }
        }
      }
    }
  }
  console.log(count);
}
