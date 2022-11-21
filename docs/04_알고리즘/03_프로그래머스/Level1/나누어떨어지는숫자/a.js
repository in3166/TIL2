function solution(arr, divisor) {
    var answer = [];
    arr.forEach(element => {
        element % divisor === 0 && answer.push(element)
    });
    return answer.length !== 0 ? answer.sort((a, b) => a - b) : [-1];
}

console.log(solution([2, 36, 1, 3], 1));

//
function solution(arr, divisor) {
    var answer = arr.filter(v => v % divisor == 0);
    return answer.length == 0 ? [-1] : answer.sort((a, b) => a - b);
}