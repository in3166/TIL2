// 3, N은 이진수 자리수? K는 1의 개수
function solution(N, K) {
  let answer = 0;
  let check = Array.from({ length: N }, () => 0);

  function getBinary(L) {
    if (L >= N) {
      console.log(check);
      return;
    }

    for (let i = L; i < N; i++) {
      if (check[i] === 0) {
        check[i] = 1;
        getBinary(L + 1);
        check[i] = 0;
      }
    }
  }

  getBinary(0);

  return answer;
}

// console.log(solution(3, 2)); // 2

// console.log(solution(4, 2)); // 4
// console.log(solution(6, 2)); // 2

//
function solution3(n, m) {
  let answer = 0;
  let all = [];

  let temp = Array.from({ length: m }, () => 0);

  function DFS(L, s) {
    if (L === m) {
      all.push(temp.slice());
      return;
    }
    for (let i = s; i < n; i++) {
      temp[L] = i + 1;
      DFS(L + 1, i + 1);
    }
  }

  DFS(0, 0);
  console.log(all);
  all.forEach((e, i) => {
    let check = Array.from({ length: n }, () => 0);
    e.forEach((e) => {
      check[e - 1] = 1;
    });
    let c = parseInt(check.join(""), 2);
    console.log(c, c % 3);
    if (c % 3 === 0) answer++;
  });
  return answer;
}

console.log(solution3(3, 2));
console.log(solution3(4, 2));
console.log(solution3(5, 2));

// 1
function pop(index, array, n) {
  let origin = index;
  let i = index + 1;
  if (i >= n) i = 0;
  let check = false;
  while (i !== origin && !check) {
    if (array[i].length >= 1) {
      check = i;
      break;
    }
    i++;
    if (i >= n) i = 0;
  }
  return check;
}

function solution(n, queries) {
  var answer = [];
  let ak = [];
  let root;
  for (let i = 0; i < n; i++) {
    answer.push([]);
  }

  queries.forEach((e, i) => {
    if (i === 0) {
      root = e[1];
    } else if (e[1] !== -1) {
      answer[e[0] - 1].push(e[1]);
    } else {
      // pop
      if (answer[e[0] - 1].length >= 1) {
        ak.push(answer[e[0] - 1].pop());
      } else if (answer[e[0] - 1].length === 0) {
        let index = pop(e[0] - 1, answer, n);
        if (index !== false) {
          ak.push(root);
          root = answer[index].shift();
          answer[index].pop();
        } else {
          if (root) ak.push(root);
        }
      }
    }
  });
  return ak;
}

console.log(
  solution(3, [
    [1, 4],
    [2, 2],
    [1, 3],
    [1, 6],
    [3, -1],
    [2, -1],
  ])
);
console.log(
  solution(4, [
    [1, 3],
    [1, 2],
    [3, 6],
    [3, -1],
    [4, 5],
    [2, -1],
    [3, -1],
    [1, -1],
  ])
);

console.log(
  solution(5, [
    [1, -1],
    [2, -1],
    [3, -1],
    [4, -1],
    [5, -1],
  ])
);
