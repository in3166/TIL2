function solution(strings, n) {
    var answer = [];
    strings = strings.sort((a, b) => {
        if (a.charCodeAt(n) === b.charCodeAt(n)) {
            var len = a.length > b.length ? a.length : b.length;
            for (let index = 0; index < len; index++) {
                if (a.charCodeAt(index) !== b.charCodeAt(index)) {
                    console.log("if?")
                    return a.charCodeAt(index) - b.charCodeAt(index)
                }
                // 이거 없어도 가능??
                /*else if (isNaN(a.charCodeAt(index))) {
                    return 1;
                } else if (isNaN(b.charCodeAt(index))) {
                    return 1;
                }*/
            }
        }
        return a.charCodeAt(n) - b.charCodeAt(n)
    })
    return strings;
}

console.log(solution(["abce", "abcd", "cdx"], 2))

// 다른 풀이


function solution(strings, n) {
    // strings 배열
    // n 번째 문자열 비교
    return strings.sort((s1, s2) => s1[n] === s2[n] ? s1.localeCompare(s2) : s1[n].localeCompare(s2[n]));
}