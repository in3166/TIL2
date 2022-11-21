function solution(n) {
    var answer = 0;
    for (let i = 1; i <= n; i++) {
        if (n % i === 0) {
            console.log(i)
            answer += i;
        }
    }
    return answer;
}

console.log(solution(12));

function solution(n, a = 0, b = 0) {
    return n <= a / 2 ? b : solution(n, a + 1, b += n % a ? 0 : a);
}