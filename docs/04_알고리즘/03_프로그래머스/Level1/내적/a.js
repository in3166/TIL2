function solution(a, b) {
    var answer = 0;
    for (let i = 0; i < a.length; i++) {
        const element = a[i];
        const element2 = b[i];
        answer += a[i] * b[i];

    }
    return answer;
}

console.log(solution([1, 2, 3, 4], [-3, -1, 0, 2]));

// 다른풀이: reduce
function solution(a, b) {
    return a.reduce((acc, _, i) => acc += a[i] * b[i], 0);
}