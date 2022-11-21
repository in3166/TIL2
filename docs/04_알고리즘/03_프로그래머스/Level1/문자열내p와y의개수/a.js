function solution(s) {
    var answer = true;
    var p = 0;
    var y = 0;


    for (let index = 0; index < s.length; index++) {
        const element = s[index];
        console.log(element.toLowerCase())
        if (element.toLowerCase() == "p") p++;
        if (element.toLowerCase() == "y") y++;
    }
    console.log(p, y)
    return p === y ? true : false;
}

console.log(solution("Pyy"));

// 다른 풀이: split 사용
function numPY(s) {
    //함수를 완성하세요
    return s.toUpperCase().split("P").length === s.toUpperCase().split("Y").length;
}

// 다른 풀이: 정규 표현식 사용
function numPY(s) {
    return s.match(/p/ig).length == s.match(/y/ig).length;
}