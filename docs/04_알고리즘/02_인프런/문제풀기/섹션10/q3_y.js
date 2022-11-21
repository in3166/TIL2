// 최대 부분 증가 수열 (LIS): N개의 자연수로 이루어진 수열, 가장 길게 증가하는(작은 수에서 큰 수로) 원소들의 집합을 찾는 프로그램 작성
// 배열에서 수들을 뽑아 수열을 만들 수 있는데 길이가 가장 긴거 (배열 위치 변경 x)
function solution(arr) {
  let answer = 0;

  return answer;
}

let arr = [5, 3, 7, 8, 6, 2, 9, 4];
// console.log(solution(arr)); // 4


















// 등차 수열이 아님!
function solution2(arr) {
  let answer = 0;
  let dy = Array.from({ length: arr.length }, () => 0); // 해당 인덱스의 값이 부분 증가 수열의 마지막 항일 때 길이
  dy[0] = 1;
  dy[1] = 1;

  function DYN(L) {
    console.log("L", L);
    if (L === 0 || L === 1) {
      DYN(L + 1);
    } else {
      if (L === arr.length) return;

      let max = 0;
      for (let i = 0; i < L + 1; i++) {
        if (arr[i] < arr[L] && max < dy[i]) max = dy[i];
      }
      dy[L] = max + 1;
      DYN(L + 1);
    }
  }
  DYN(0);
  console.log(dy);
  console.log(Math.max(...dy));
  return answer;
}

let arr2 = [5, 3, 7, 8, 6, 2, 9, 4];
console.log(solution2(arr2)); // 4

// answer
function solution3(arr) {
  let answer = 0;
  let dy = Array.from({ length: arr.length }, () => 0); // 해당 인덱스의 값이 부분 증가 수열의 마지막 항일 때 길이
  dy[0] = 1;

  for (let i = 0; i < arr.length; i++) {
    let max = 0;
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] > arr[i] && dy[j] > max) {
        max = dy[j];
      }
    }
    dy[i] = max + 1;
    answer = Math.max(answer, dy[i]);
  }
  return answer;
}

let arr3 = [5, 3, 7, 8, 6, 2, 9, 4];
console.log(solution3(arr3)); // 4
