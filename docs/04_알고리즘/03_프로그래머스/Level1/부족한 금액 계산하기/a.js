// 놀이기구 이용료 price
// n 번째 이용하면 이용료의 n배
// 놀이기구 count번 타면 현재 money에 얼마나 부족?

function solution(price, money, count) {
    var answer = 0;
    for (let i = 1; i <= count; i++) {
        answer += (i * price)
    }
    console.log(answer)
    return answer < money ? 0 : answer - money;
}

console.log(solution(1, 1, 1)) // 10

// 가우스 공식...
// 숫자의 개수 * {(첫번째 수 + 마지막 수) / 2}
function solution2(price, money, count) {
    const tmp = price * count * (count + 1) / 2 - money;
    return tmp > 0 ? tmp : 0;
}