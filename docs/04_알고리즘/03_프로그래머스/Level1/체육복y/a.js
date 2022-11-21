// 체육복 - 탐욕법
// 앞번호는 뒷번호에 체육복을 빌릴 수 있다.
// 전체 학생수 n, 도난당한 학생 번호 lost, 여벌의 체육복 학생 reserve
// 체육 수업을 들을 수 있는 학생의 최댓값
// reserve가 lost에 포함되면 빌려줄 수 없다.
function solution(n, lost, reserve) {
  var answer = 0;
  answer = n - lost.length;
  let chk = Array.from({ length: reserve.length }, () => 0);
  let chkLost = Array.from({ length: lost.length }, () => 0);
  reserve.sort((a, b) => a - b);
  lost.sort((a, b) => a - b);
  console.log(lost, reserve);
  // 둘 다 포함된거 잡기
  reserve.forEach((e, i) => {
    let index = lost.indexOf(e);
    if (index >= 0) {
      answer++;
      lost.splice(index, 1);
      chk[i] = 1;
    }
  });

  lost.forEach((e, i) => {
    let index = reserve.indexOf(e - 1);
    let index2 = reserve.indexOf(e + 1);
    console.log(e, index, index2);
    if (chk[index] !== 1 && index >= 0) {
      answer++;
      chk[index] = 1;
    } else if (chk[index2] !== 1 && index2 >= 0) {
      answer++;
      chk[index2] = 1;
    }
  });

  return answer;
}
// 정답
// 5, 4, 2, 4, 4, 2
// console.log(solution(5, [2, 4], [1, 3, 5]));
// console.log(solution(5, [2, 4], [3]));
// console.log(solution(3, [3], [1]));
// console.log(solution(5, [1, 2, 3], [2, 3, 4]));
// console.log(solution(5, [2, 3, 4], [1, 2, 3]));
// console.log(solution(3, [1, 2], [2, 3]));
// console.log(solution( 30,
//   [1, 2, 7, 9, 10, 11, 12, 14, 15, 16, 18, 20, 21, 24, 25, 27],
//   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 20, 22, 23, 24, 25, 26, 27, 28])); //30
//   console.log(solution(3, [1, 2], [2, 3]));

function solution3(n, lost, reserve) {
  const realLost = lost.filter((l) => !reserve.includes(l));
  let realReserve = reserve.filter((r) => !lost.includes(r));

  return (
    n -
    realLost.filter((a) => {
      console.log('a' ,a)
      const b = realReserve.find((r) => Math.abs(r - a) <= 1);
      console.log('b', b)
      if (!b) return true;
      realReserve = realReserve.filter((r) => r !== b);
      console.log(realReserve)
    }).length
  );
}

console.log(solution2(5, [1, 2, 3, 4], [3, 2, 5]))

function solution2(n, lost, reserve) {
  const students = {};
  let answer = 0;
  for(let i = 1; i <= n; i++){
      students[i] = 1;
  }
  lost.forEach(number => students[number] -= 1);
  reserve.forEach(number => students[number] += 1);

  for(let i = 1; i <= n; i++){
      if(students[i] === 2 && students[i-1] === 0){
              students[i-1]++;
              students[i]--;
      } else if(students[i] === 2 && students[i+1] === 0){
              students[i+1]++;
              students[i]--;
      }
  }
  for(let key in students){
      if(students[key] >= 1){
          answer++;
      }
  }
  return answer;
}