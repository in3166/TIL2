function solution(n) {
    var answer = 0;
    var arr = [];
    while (n !== 0) {
        arr.push(n % 3);
        n = Math.floor(n / 3);
    }
    arr = arr.reverse();
    for (let index = 0; index < arr.length; index++) {

        answer += (arr[index] * (3 ** index)
        );
    }
    return answer;
}

console.log(solution(125));

//풀이1 separate operation
const solution2 = (n) => {
    return parseInt([...n.toString(3)].reverse().join(""), 3);
}

//풀이2 
function solution3(n) {
    const answer = [];
    while (n !== 0) {
        answer.unshift(n % 3);
        n = Math.floor(n / 3);
    }
    return answer.reduce((acc, v, i) => acc + (v * Math.pow(3, i)), 0);
}
