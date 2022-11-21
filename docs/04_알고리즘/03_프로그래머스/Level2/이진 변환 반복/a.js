// 0을 제거, 남은 1의 길이를 2진으로 변화 반복
// 결과: 이진 변화 횟수, 제거된 0 개수

function solution(s) {
  var answer = [];
  var chageCount = 0;
  let countZero = 0;

  function countOneF(pa) {
    if (pa <= 1) {
      return;
    }
    let countOne = 0;
    chageCount += 1;
    console.log(pa);
    for (let i = 0; i < pa.length; i++) {
      if (pa[i] === "1") {
        countOne += 1;
      } else {
        countZero += 1;
      }
    }

    console.log(countOne, countOne.toString(2));
    countOne = countOne.toString(2);

    if (countOne > 1) {
      countOneF(countOne);
    }
  }

  countOneF(s);
  console.log("!, ", chageCount, countZero);
  return [chageCount, countZero];
}

console.log(solution("110")); // [3,8]
console.log(solution("1")); // [3,8]
console.log(solution("110010101001")); // [3,8]
console.log(solution("01110")); // [3, 3]
console.log(solution("1111111")); // [4, 1]./

// 정규식과 루프 하나를 통한 풀이

function solution2(s) {
  var answer = [0, 0];
  while (s.length > 1) {
    answer[0]++;
    answer[1] += (s.match(/0/g) || []).length;
    s = s.replace(/0/g, "").length.toString(2);
  }
  return answer;
}
