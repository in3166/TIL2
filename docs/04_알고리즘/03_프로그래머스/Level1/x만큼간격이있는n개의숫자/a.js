function solution(x, n) {
    var answer = [];
    let a = x;
    for (let i = 0; i < n; i++) {
        answer.push(x)
        x += a;
    }
    return answer;
}

console.log(solution(2, 5));

// 다른 풀이
function solution(x, n) {
    return Array(n).fill(x).map((v, i) => (i + 1) * v)
}

//

function solution(x, n) {
    return [...Array(n).keys()].map(v => (v + 1) * x);
}