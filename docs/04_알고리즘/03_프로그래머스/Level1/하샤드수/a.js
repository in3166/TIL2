function solution(x) {
    var answer = true;
    var ori = x;
    var sum = 0;
    do {
        sum += x % 10;
        x = Math.floor(x / 10);
    } while (x / 10 >= 1);
    sum += x
    console.log(sum)
    if (ori % sum !== 0) return false;
    return answer;
}

console.log(solution(13));


// 다른 풀이
function Harshad(n) {
    return !(n % (n + "").split("").reduce((a, b) => +b + +a));
}

// 다른 풀이2
function Harshad(n) {
    return !(n % (n + '').split('').reduce(function (i, sum) { return +sum + +i; }));
}

// 다른 풀이3: 속도는 느리지만
function solution(x) {
    return x % eval([...x.toString()].join("+")) ? false : true;
}
