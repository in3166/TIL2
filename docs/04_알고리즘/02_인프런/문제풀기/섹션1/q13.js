// 대소문자 변환
function solution(s){  
    let answer="";
    for (const e of s) {
        if(e == e.toUpperCase()){
            answer += e.toLowerCase();
        }else{
            answer += e.toUpperCase();
        }
    }
    return answer;
}

console.log(solution("StuDY"));