function solution(n) {
    var answer = '';
    for (let i = 1; i <= n; i++) {
        answer += (i % 2 === 0) ? '박' : '수';
    }
    return answer;
}

//console.log(solution(122));

// 다른 풀이1: substring
//String.substring(start,end) //문자열  start위치 부터 end전까지 문자열 발췌
function waterMelon(n) {
    var result = "수박수박수박수박수박수박수박수박수박수박수박수박수박수박수박수박수박수박수박수박수박수박수박수박수박수박수박수박수박수박수박수박"
    //함수를 완성하세요
    return result.substring(0, n);
}
//console.log(waterMelon(122))

// 다른 풀이2: repeat
//str.repeat(count); str을 count만큼 반복
const waterMelon2 = n => {
    return '수박'.repeat(n / 2) + (n % 2 === 1 ? '수' : '');
}

console.log('수박'.repeat(12 / 2))