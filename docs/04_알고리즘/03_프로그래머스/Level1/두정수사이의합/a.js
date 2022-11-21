function solution(a, b) {
    var answer = 0;
    if (a > b) {
        var temp = a;
        a = b;
        b = temp;
    }
    for (let index = a; index <= b; index++) {
        answer += index;

    }
    return answer;
}

console.log(solution(5, 3));

// 다른 풀이
function adder(a, b) {
    var result = 0
    //함수를 완성하세요


    return (a + b) * (Math.abs(b - a) + 1) / 2;
}