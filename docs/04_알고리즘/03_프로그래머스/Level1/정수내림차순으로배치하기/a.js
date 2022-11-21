function solution(n) {
    var answer = "";
    var arr = []
    do {
        arr.push(n % 10);
        n = Math.floor(n / 10);
    } while (n > 0);
    arr = arr.sort().reverse();
    arr.forEach(element => {
        answer += element;
    });
    return parseInt(answer);
}

console.log(solution(118372));

// 다른풀이

function solution(n) {
    const newN = n + "";
    const newArr = newN
        .split("")
        .sort()
        .reverse()
        .join("");

    return +newArr;
}