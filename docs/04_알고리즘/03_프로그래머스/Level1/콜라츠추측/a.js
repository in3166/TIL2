function solution(nu1) {
    var answer = 0;
    var num =nu1;
    if(num===1) return answer;
    do {
        answer++;
        console.log(answer)
        if(!(num%2)) num /= 2;
        else{
            num = num*3+1;
        }
        if(num===1) return answer;
    } while (answer <500);
    return -1;
}

console.log(solution(1));

// 다른 풀이: 재귀 함수
function collatz(num,count = 0) {
    return num == 1 ? (count >= 500 ? -1 : count) : collatz(num % 2 == 0 ? num / 2 : num * 3 + 1,++count);
}

//
const solution = (num) => collatzGuessCount(num, 0);

const collatzGuessCount = (num, acc) => 
  (num === 1) ? ((acc > 500) ? -1 : acc) : collatzGuessCount(processCollatz(num), acc + 1);

const processCollatz = (num) => (num % 2 === 0) ? (num / 2) : (num * 3 + 1);

