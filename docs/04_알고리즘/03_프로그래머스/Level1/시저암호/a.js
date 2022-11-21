function solution(s, n) {
    var answer = '';
    //65 90 97 122
    for (let i = 0; i < s.length; i++) {
        if (s.charCodeAt(i) === 32) {
            answer += s.charAt(i);
            continue;
        }
        if (s.charCodeAt(i) < 91) {
            if (s.charCodeAt(i) + n > 90) {
                answer += String.fromCharCode(s.charCodeAt(i) + n - 26);
                continue;
            }
            answer += String.fromCharCode(s.charCodeAt(i) + n);
        } else {
            if (s.charCodeAt(i) + n > 122) {
                answer += String.fromCharCode(s.charCodeAt(i) + n - 26);
                continue;
            }
            answer += String.fromCharCode(s.charCodeAt(i) + n);
        }
    }
    return answer;
}

console.log(solution("a B z", 4));

// 다른풀이
function solution(s, n) {
    var upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lower = "abcdefghijklmnopqrstuvwxyz";
    var answer = '';

    for (var i = 0; i < s.length; i++) {
        var text = s[i];
        if (text == ' ') {
            answer += ' ';
            continue;
        }
        var textArr = upper.includes(text) ? upper : lower;
        var index = textArr.indexOf(text) + n;
        if (index >= textArr.length) index -= textArr.length;
        answer += textArr[index];
    }
    return answer;
}

// 다른 풀이 2: 2진법?
function caesar(s, n) {
    var result = s.replace(/[a-z]/ig, c => [c = c.charCodeAt(0), String.fromCharCode((c & 96) + (c % 32 + n - 1) % 26 + 1)][1]);

    // 함수를 완성하세요.
    return result;
}