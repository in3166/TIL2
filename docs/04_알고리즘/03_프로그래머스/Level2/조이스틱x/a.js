// 탐욕법 - 맨처음엔 A로 이루어져 있음 AAA, 커서는 name 각 글자에 커스를 의미
// A: 65, Z: 90, M: 78
// ▲ - 다음 알파벳
// ▼ - 이전 알파벳 (A에서 아래쪽으로 이동하면 Z로)
// ◀ - 커서를 왼쪽으로 이동 (첫 번째 위치에서 왼쪽으로 이동하면 마지막 문자에 커서)
// ▶ - 커서를 오른쪽으로 이동 (마지막 위치에서 오른쪽으로 이동하면 첫 번째 문자에 커서)

function solution(name) {
  var answer = 0;
  let cur = 0;
  let init = Array.from({ length: name.length }, () => 0);
  let tempCur = 0;

  function getCursorDistance(cur) {
    let plusCur = cur;
    let minusCur = cur;
    let pd = 0,
      md = 0;
    while (true) {
      if (pd === 0) plusCur++;
      if (md === 0) minusCur--;
      if (name[plusCur] !== "A" && init[plusCur] === 0) {
        pd = plusCur - cur;
      }
      if (name[minusCur] !== "A" && init[minusCur] === 0) {
        md = minusCur - cur;
      }
      if (plusCur === cur || minusCur === cur) break;
    }
    return Math.min(plusCur, minusCur);
  }

  return answer;
}

// console.log(solution("JEROEN")); // 56

console.log(solution("JAN")); //23
console.log(solution("JAZ")); //23
console.log(solution("AAAAAAAA")); //0
console.log(solution("AABAAAAAAAB")); //6
console.log(solution("ABBBBAAAAABAAA")); //15

function solution(name) {
  var answer = 0;
  const length = name.length;
  let upDownCount = 0;
  let leftRightCountList = [length - 1]; //한 방향으로 쭉 갔을 때
  
  for (let i = 0; i < length; i++) upDownCount += minUpOrDownCount(name[i]);

  for (let startOfA = 0; startOfA < name.length; startOfA++) {
    let endOfA = startOfA + 1;
    while (endOfA < length && name[endOfA] === "A") endOfA++;
    const [moveToStartOfA, moveToEndOfA] = [startOfA, length - endOfA];
    leftRightCountList.push(moveToStartOfA * 2 + moveToEndOfA); // 0 -> A.., 0 <- A.., ..A <- -1
    leftRightCountList.push(moveToEndOfA * 2 + moveToStartOfA); //시작부터 뒤로 가는 경우 ..A <- -1, ..A -> -1, 0 -> A..
  }
  answer = upDownCount + Math.min(...leftRightCountList);
  return answer;
}

function minUpOrDownCount(destination) {
  const Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const index = Alphabet.indexOf(destination);
  return Math.min(index, Alphabet.length - index);
}
