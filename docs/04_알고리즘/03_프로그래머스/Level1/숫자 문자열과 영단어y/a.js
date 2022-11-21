function solution(s) {
  var answer = 0;
  var str = new Map();
  str.set("zero", 0);
  str.set("one", 1);
  str.set("two", 2);
  str.set("three", 3);
  str.set("four", 4);
  str.set("five", 5);
  str.set("six", 6);
  str.set("seven", 7);
  str.set("eight", 8);
  str.set("nine", 9);

  var string = "";

  for (let i = 0; i < s.length; i++) {
    const e = s[i];
    if (e < 10) {
      answer = answer * 10 + parseInt(e);
    } else {
      string += e;
      console.log(string)
      console.log(str.get(string))
      if (str.get(string) || str.get(string)===0) {
        answer = answer * 10 + parseInt(str.get(string));
        string = "";
      }
    }
  }
  return answer;
}

// console.log(solution("one4seveneight"));
// console.log(solution("23four5six7"));
// console.log(solution("2three45sixseven"));
// console.log(solution("123"));
// console.log(solution("oneone"));
console.log(solution("onetwothreefourfivesixseveneightninezero0"));










//
function solution2(s) {
  let numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  var answer = s;

  for(let i=0; i< numbers.length; i++) {
      let arr = answer.split(numbers[i]);
      answer = arr.join(i);
  }

  return Number(answer);
}

function solution3(s) {
  s = s.replace(/zero/gi, 0)
  .replace(/one/gi, 1)
  .replace(/two/gi, 2)
  .replace(/three/gi, 3)
  .replace(/four/gi, 4)
  .replace(/five/gi, 5)
  .replace(/six/gi, 6)
  .replace(/seven/gi, 7)
  .replace(/eight/gi, 8)
  .replace(/nine/gi, 9)
  return parseInt(s);
}