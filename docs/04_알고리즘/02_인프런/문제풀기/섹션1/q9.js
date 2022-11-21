function solution(s){
    let answer="";
    for (let i = 0; i < s.length; i++) {
        console.log(s[i]);
        if(s[i] === 'A'){
           answer += '#';
        }else{
            answer += s[i];
        }
    }
    return answer;
}

let str="BANANA";
console.log(solution(str));

// string replace
function solution2(s){
    let answer=s;
    s = s.replace(/A/g, '#'); // global이 아니면 첫번째 문자만 바뀜
    // string은 참조가 되지 않고 값이 복사됨
    return s;
}