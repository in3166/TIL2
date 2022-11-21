function solution2(brown, yellow) {
  var answer = [];
  var temp = [];

  for (let i = 1; i <= Math.sqrt(yellow); i++) {
    if (yellow % i === 0) {
      temp.push(i);
    }
  }

  console.log(temp);

  for (let i = 0; i < temp.length; i++) {
    const ce = temp[i] + 2;
    const ga = yellow / temp[i] + 2;
    const tempBrown = ce * 2 + ga * 2 - 4;
    if (brown === tempBrown) {
      console.log("가로 세로: ", ga, ce);
      console.log("브라운 개숫 ", tempBrown);
      return [ga, ce];
    }
  }
  return answer;
}



// for 문 하나 쓰기

function solution(brown, yellow) {
  var answer = [];
  for (var i = 3; i <= (brown + yellow) / i; i++) {
    var x = Math.floor((brown + yellow) / i);
    if ((x - 2) * (i - 2) === yellow) {
      break;
    }
  }

  return [x, i];
}
console.log(solution(10, 2)); // [4, 3]
console.log(solution(8, 1)); // [3, 3]
console.log(solution(24, 24)); // [8, 6]
