function solution(s, t){
    let answer=0;
    for (let i = 0; i < s.length; i++) {
        s[i] === t && answer++;
    }
    return answer;
}

let str="COMPUTERPROGRAMMING";
console.log(solution(str, 'R'));

// 내장함수 split wow

function solution2(s, t){
    let answer=s.split(t); // 끝에 구분자가 있어도 빈문자열이 생긴다.
    
    return answer.length-1;
}