function solution(s) {
  return s
    .split("")
    .map((e, i) => {
      if (i === 0 || s[i - 1] === " ") {
        chk = false;
        return e.toLocaleUpperCase();
      } else if (s[i - 1] !== " ") return e.toLocaleLowerCase();
    })
    .join("");
}

console.log(solution("3people unFollowed me")); //"3people Unfollowed Me"
console.log(solution("for the last week")); //"For The Last Week"

function solution(s) {
  return s
    .split(" ")
    .map((v) => v.charAt(0).toUpperCase() + v.substring(1).toLowerCase())
    .join(" ");
}
