function solution(phone_number) {
    var answer = '';
    for (let index = 0; index < phone_number.length - 4; index++) {
        answer += '*';
    }
    return answer + phone_number.slice(phone_number.length - 4, phone_number.length);
}

console.log(solution("01033334444"));

// 다른 풀이1: 
function hide_numbers(s) {
    var result = "*".repeat(s.length - 4) + s.slice(-4);
    return result;
}

// 다른 풀이2: 정규식
function hide_numbers(s) {
    return s.replace(/\d(?=\d{4})/g, "*");
}