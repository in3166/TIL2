function getSoon(num) {
  if (num === 6) {
    return 1;
  } else if (num === 5) {
    return 2;
  } else if (num === 4) {
    return 3;
  } else if (num === 3) {
    return 4;
  } else if (num === 2) {
    return 5;
  } else {
    return 6;
  }
}

function solution(lottos, win_nums) {
  var answer = [];

  var count = 0;
  var zero = 0;
  lottos.forEach((num) => {
    if (num !== 0) {
      if (win_nums.includes(num)) count++;
    } else {
      zero++;
    }
  });

  console.log(count);
  console.log(zero);
  var go = getSoon(count);
  var ha = getSoon(count + zero);
  answer.push(ha, go);
  return answer;
}

console.log(solution([44, 1, 0, 0, 31, 25], [31, 10, 45, 1, 6, 19]));
console.log(solution([0, 0, 0, 0, 0, 0], [38, 19, 20, 40, 15, 25]));
console.log(solution([45, 4, 35, 20, 3, 9], [20, 9, 3, 45, 4, 35]));

//
function solution2(lottos, win_nums) {
  const rank = [6, 6, 5, 4, 3, 2, 1];

  let minCount = lottos.filter((v) => win_nums.includes(v)).length;
  let zeroCount = lottos.filter((v) => !v).length;

  const maxCount = minCount + zeroCount;

  return [rank[maxCount], rank[minCount]];
}
