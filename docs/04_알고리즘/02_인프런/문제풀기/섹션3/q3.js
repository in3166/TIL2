// 숫자만 추출하여 자연수 208
function solution(str){
    let answer="";
    for (const iterator of str) {
        console.log(iterator)
        iterator.match(/[0-9]/i) && (answer += iterator);
        // isNaN 내장함수 사용 가능
    }
    return parseInt(answer);
}

let str="g0en2T0s8eSoft";
console.log(solution(str));