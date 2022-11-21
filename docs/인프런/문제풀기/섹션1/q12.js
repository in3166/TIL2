// 대문자로 통일
function solution(s){         
    let answer="";

    for (const e of s) {
        answer += e.toUpperCase();
    }
    return answer;

}

let str="ItisTimeToStudy";
console.log(solution(str));