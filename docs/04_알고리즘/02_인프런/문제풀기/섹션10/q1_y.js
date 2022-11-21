// 계단오르기: 1칸, 2칸 씩 오를 수 있다, 방법의 수
function solution(n) {
  let answer = 0;
  let dy = Array.from({ length: n + 1 }, () => 0);
  dy[1] = 1;
  dy[2] = 2;

  return answer;
}

// console.log(solution1(7)); //21
















// 1차 시도: 완전 탐색?
function solution(n) {
  let answer = 0;
  let dy = Array.from({ length: n + 1 }, () => 0);
  dy[1] = 1;
  dy[2] = 2;

  let sum = 0;

  function DYN(L) {
    sum += L;
    if (sum > n) {
      return;
    }

    if (sum === n) {
      answer++;
      return;
    }

    DYN(1);
    sum -= 1;
    DYN(2);
    sum -= 2;
  }
  DYN(0);

  return answer;
}

//console.log(solution1(7)); //21

// 동적 계획법은 큰 문제를 작은 문제로 나누어 푸는 방식
// 분할 정복은 쪼개진 작은 문제가 중복되지 않고 동적 계획법은 중복된다.
// 부분 문제를 한 번 계산해 두고 저장해 뒀다 다른 문제에 사용

// n=1 이면 가는 방법 1가지, n=2는 2가지,
// n=3 이면 1번 계단에서 오거나, 2번 계단에서 온다. 1가지 + 2가지 = 3가지
// n=4 이면 2번계단에서 오는 2가지 + 3번에서 오는 3가지 = 5가지

function solution2(n) {
  let answer = 0;
  let dy = Array.from({ length: n + 1 }, () => 0);
  dy[1] = 1;
  dy[2] = 2;

  //for (let u = 3; u < dy.length; u++) {
  //  dy[u] = dy[u-1]+dy[u-2];
  // }
  // return dy[n];

  function DYN(L) {
    console.log('L: ',L)
    if (L === 1) {
      return 1;
    } else if (L === 2) {
      return 2;
    } else if (dy[L] !== 0) {
      return dy[L];
    } else {
      console.log(`L(${L}): DYN(${L}-1): ${DYN(L-1)} / DYN(${L}-2): ${DYN(L-2)}`)
      dy[L] = DYN(L - 1) + DYN(L - 2);
      console.log('dy',L,': ', dy[L])
      return dy[L];
    }
  }
  DYN(4);
  console.log(dy)
  return dy[4];
}

console.log(solution2(7)); //21

function solution3(n) {
  let answer = 0;
  let dy = Array.from({ length: n + 1 }, () => 0);
  dy[1] = 1;
  dy[2] = 2;

  let sum = 0;

  function DYN(L) {
    sum += L;
    if (sum > n) {
      return;
    }

    if (sum === n) {
      answer++;
      return;
    }

    DYN(1);
    sum -= 1;
    DYN(2);
    sum -= 2;
  }
  DYN(0);

  return answer;
}

//console.log(solution3(7)); //21
