// 정수 n을 1, 2, 3의 합으로 나타내는 방법의 수
function sol(n) {
  let answer = 0;
  let check = Array.from({ length: n + 1 }, () => 0);
  check[1] = 1;
  check[2] = 2;
  check[3] = 4;
  check[4] = 7;


  for (let i = 4; i <= n; i++) {
    check[i] = check[i - 1] + check[i - 2] + check[i - 3];
  }

  console.log(check);
  return check[n];
}

console.log(sol(4)); // 7
console.log(sol(7)); // 44
console.log(sol(10)); // 274

// n = (n-1) + (n-2) + (n-3)
// (n-1) 만드는 모든 경우에 1을 더함
// (n-2) 만드는 모든 경우에 2을 더함
// (n-3) 만드는 모든 경우에 3을 더함
