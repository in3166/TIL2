function solution(s) {
    var answer = '';

    answer = (s.split("")).sort().reverse();

    return answer.join('');
}

console.log(solution("Zbcdefg"));

//
function solution(s) {
    return s
        .split("")
        .sort()
        .reverse()
        .join("");
}