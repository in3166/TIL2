function solution(n) {
    return n.toString().split("", -1).reverse().map((val) => parseInt(val));
}

console.log(solution(12345));

// 다른 풀이
function solution(n) {
    // 문자풀이
    // return (n+"").split("").reverse().map(v => parseInt(v));

    // 숫자풀이
    var arr = [];

    do {
        arr.push(n % 10);
        n = Math.floor(n / 10);
    } while (n > 0);

    return arr;
}