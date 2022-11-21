function solution(s){  
    let answer="", max=Number.MIN_SAFE_INTEGER;
    let min = 0;
    for (const e of s) {
        if(min < e.length ){
            min = e.length;
            answer =e
        }
    }
    return answer;
}
let str=["teacher", "time", "student", "beautiful", "good"];
console.log(solution(str));