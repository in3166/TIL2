// 자연수만 존재
// 모든 수를 1, 2, 4로 표현
// 1 => 1, 2=>2, 3=>4, 4 => 11, 5 => 12, 6 => 14

// 나머지가 0 이면 1, 그 외에는 인덱스
function solution(n) {
    var answer = '';
    var b = [4, 1, 2];
    var moc = n / 3;
    var na = n % 3;

    return answer;
}

console.log(solution(1)) // 1
console.log(solution(2)) // 2
console.log(solution(3)) // 4 
console.log(solution(4)) // 11