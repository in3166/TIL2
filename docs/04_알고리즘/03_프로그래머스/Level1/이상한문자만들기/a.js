function solution(s) {
    var answer = '';
    answer.toLocaleUpperCase
    var answer1 = s.split(" ", -1);
    answer1.forEach((element, index) => {
        for (let i = 0; i < element.length; i++) {
            if ((i + 1) % 2 === 0) {
                answer += element[i].toLowerCase();
            } else {
                answer += element[i].toUpperCase();
            }
        }
        if (index === answer1.length) return false;
        answer += " ";
    });
    return answer;
}

console.log(solution("try hello world"));


// 다른 풀이: 정규식
function toWeirdCase(s) {
    //(\w)(\w) 연속된 두 문자   
    return s.toUpperCase().replace(/(\w)(\w)/g, function (a) { return a[0].toUpperCase() + a[1].toLowerCase(); })

}

// 와우
function toWeirdCase(s) {
    return s.split(' ').map(i => i.split('').map((j, key) => key % 2 === 0 ? j.toUpperCase() : j).join('')).join(' ')
}

// 와우 2
function toWeirdCase(s) {
    var result = "";

    for (var word of s.split(" ")) {
        for (var i in word) {
            result += word[i][parseInt(i) % 2 == 0 ? "toUpperCase" : "toLowerCase"]();
        }
        result += " ";
    };

    return result.slice(0, -1);
}