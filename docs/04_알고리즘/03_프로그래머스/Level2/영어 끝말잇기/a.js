function solution(n, words) {
  var answer = [];
  var currentPerson = 1;
  var cr = 1;
  var firstString = words.shift();
  var lastChar = firstString[firstString.length - 1];
  var list = [firstString];

  console.log(firstString, list, lastChar);

  for (let i = 0; i < words.length; i++) {
    currentPerson++;
    if (currentPerson > n) {
      currentPerson = 1;
      cr += 1;
    }
    var currentString = words[i];
    console.log(currentString, lastChar);
    if (currentString[0] !== lastChar || list.includes(currentString)) {
      return [currentPerson, cr];
    }
    lastChar = currentString[currentString.length - 1];
    list.push(currentString);
  }

  return [0, 0];
}

console.log(
  solution(3, [
    "tank",
    "kick",
    "know",
    "wheel",
    "land",
    "dream",
    "mother",
    "robot",
    "tank",
  ])
); // [3,3]
console.log(
  solution(5, [
    "hello",
    "observe",
    "effect",
    "take",
    "either",
    "recognize",
    "encourage",
    "ensure",
    "establish",
    "hang",
    "gather",
    "refer",
    "reference",
    "estimate",
    "executive",
  ])
); // [0,0]
console.log(
  solution(2, ["hello", "one", "even", "never", "now", "world", "draw"])
); // [1,3]
console.log("abcdefg".slice(0, 2));
// wow
function solution2(n, words) {
  let answer = 0;
  words.reduce((prev, now, idx) => {
    console.log("------------------");
    console.log(idx);
    console.log(prev);
    console.log(now);
    console.log(answer);
    console.log(words);
    answer =
      answer ||
      (words.slice(0, idx).indexOf(now) !== -1 || prev !== now[0] // 이미 말한 단어거나 끝말잇기에 실패한 경우 idx를 answer에 저장
        ? idx
        : answer);
    console.log(words.slice(0, idx));
    return now[now.length - 1]; // 마지막 글자를 return해서 prev로 
  }, "");

  return answer ? [(answer % n) + 1, Math.floor(answer / n) + 1] : [0, 0];
}

console.log(
  solution2(2, ["hello", "one", "even", "never", "now", "world", "draw"])
); // [1,3]
