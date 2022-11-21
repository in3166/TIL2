function solution(n) {
    var answer = 0;
    answer = Math.sqrt(n);
    return Number.isInteger(answer) ? (++answer) ** 2 : -1;
}

console.log(solution(121));