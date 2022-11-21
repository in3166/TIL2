function solution(s){  
    let answer="";
    let sset = new Set;
    for (const e of s) {
        if(sset.has(e)){
            continue
        }else{
            sset.add(e)
            answer += e;
        }
    }
    return answer;
}
console.log(solution("ksekkset"));

for (let i = 0; i < s.length; i++) {
    console.log(s[i], i, s.indexOf(s[i])); 
    /*
    k 0 0
    s 1 1
    e 2 2
    k 3 0 - 인덱스와 값이 다름
    k 4 0
    */
    
}