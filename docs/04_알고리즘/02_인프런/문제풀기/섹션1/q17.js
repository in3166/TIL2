function solution(s){  
    let answer = [];

    let sset = new Set;
    for (const e of s) {
        if(sset.has(e)){
            continue
        }else{
            sset.add(e)
            answer.push(e)
        }
    }
    
    return answer;
}
let str=["good", "time", "good", "time", "student"];
console.log(solution(str));

// filter로 시도
answer = s.filter((v, i)=>{
    if(s.indexOf(v)===i) return vl
})