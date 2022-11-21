function solution(d, budget) {
    var answer = 0;
    d.sort((a, b) => a - b);
    for (let i = 0; i < d.length; i++) {
        budget -= d[i];
        if (budget >= 0) answer++;
        else break;
    }
    return answer;
}

console.log(solution([1, 100, 102, 3, 4, 5], 10))