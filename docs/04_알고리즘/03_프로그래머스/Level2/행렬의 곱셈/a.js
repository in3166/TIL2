function solution(arr1, arr2) {
  var answer = [];
  let te = [];
  for (let i = 0; i < arr2[0].length; i++) {
    let temp = [];
    for (let j = 0; j < arr2.length; j++) {
      temp.push(arr2[j][i]);
    }
    te.push(temp);
  }
  console.log(te);
  for (let i = 0; i < arr1.length; i++) {
    let temp = [];
    for (let z = 0; z < te.length; z++) {
      let sum = 0;
      for (let j = 0; j < arr1[0].length; j++) {
        sum += arr1[i][j] * te[z][j];
      }
      temp.push(sum);
    }
    answer.push(temp);
  }
  return answer;
}

console.log(
  solution(
    [
      [1, 2, 3],
      [4, 5, 6],
    ],
    [
      [1, 4],
      [2, 5],
      [3, 6],
    ]
  )
);
console.log(
  solution(
    [
      [3, 2],
      [1, 4],
      [4, 1],
    ],
    [
      [3, 3],
      [3, 3],
    ]
  )
); //[[15, 15], [15, 15], [15, 15]]
console.log(
  solution(
    [
      [2, 3, 2],
      [4, 2, 4],
      [3, 1, 4],
    ],
    [
      [5, 4, 3],
      [2, 4, 1],
      [3, 1, 1],
    ]
  )
); //[[22, 22, 11], [36, 28, 18], [29, 20, 14]]

// gjf...

function solution(arr1, arr2) {
  return arr1.map((row) =>
    arr2[0].map((x, y) => row.reduce((a, b, c) => a + b * arr2[c][y], 0))
  );
}
