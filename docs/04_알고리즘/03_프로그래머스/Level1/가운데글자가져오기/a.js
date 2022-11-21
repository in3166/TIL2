function solution(s) {
    var answer = '';
    var na = Math.floor(s.length / 2);
    console.log(na)
    if (s.length % 2 === 0) {
        answer = (s[na - 1]);
        answer += (s[na]);
    } else {
        answer = s[na];
    }
    return answer;
}

console.log(solution("abcdef"));

// 다른 풀이

function solution2(s) {
    return s.substr(Math.ceil(s.length / 2) - 1, s.length % 2 === 0 ? 2 : 1);
}

//
function solution3(s) {
    const mid = Math.floor(s.length / 2);
    return s.length % 2 === 1 ? s[mid] : s[mid - 1] + s[mid];
}

var e = "12";
e = e.concat("dsdfa");
console.log("e: ", e, "av".concat("cd"))