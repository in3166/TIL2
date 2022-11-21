function solution(s) {
    var answer = true;

    if (!(s.length === 4 || s.length === 6)) answer = false;

    (s.split("")).forEach((e) => {
        if (e.charCodeAt(0) > 57) answer = false;
    })

    return answer;
}

console.log(solution("2234"));


// 정규식
function alpha_string46(s) {
    var regex = /^\d{6}$|^\d{4}$/;
    return regex.test(s);
}